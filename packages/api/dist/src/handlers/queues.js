"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queuesHandler = void 0;
const redis_info_1 = require("redis-info");
const statuses_1 = require("../constants/statuses");
const metrics = [
    'redis_version',
    'used_memory',
    'mem_fragmentation_ratio',
    'connected_clients',
    'blocked_clients',
];
const getStats = async (queue) => {
    const redisInfoRaw = await queue.getRedisInfo();
    const redisInfo = (0, redis_info_1.parse)(redisInfoRaw);
    const validMetrics = metrics.reduce((acc, metric) => {
        if (redisInfo[metric]) {
            acc[metric] = redisInfo[metric];
        }
        return acc;
    }, {});
    validMetrics.total_system_memory = redisInfo.total_system_memory || redisInfo.maxmemory;
    return validMetrics;
};
const formatJob = (job, queue) => {
    const jobProps = job.toJSON();
    const stacktrace = jobProps.stacktrace ? jobProps.stacktrace.filter(Boolean) : [];
    return {
        id: jobProps.id,
        timestamp: jobProps.timestamp,
        processedOn: jobProps.processedOn,
        finishedOn: jobProps.finishedOn,
        progress: jobProps.progress,
        attempts: jobProps.attemptsMade,
        delay: job.opts.delay,
        failedReason: jobProps.failedReason,
        stacktrace,
        opts: jobProps.opts,
        data: queue.format('data', jobProps.data),
        name: queue.format('name', jobProps, jobProps.name),
        returnValue: queue.format('returnValue', jobProps.returnvalue),
        isFailed: !!jobProps.failedReason || (Array.isArray(stacktrace) && stacktrace.length > 0),
    };
};
const allStatuses = [
    statuses_1.STATUSES.active,
    statuses_1.STATUSES.completed,
    statuses_1.STATUSES.delayed,
    statuses_1.STATUSES.failed,
    statuses_1.STATUSES.paused,
    statuses_1.STATUSES.waiting,
];
const JOB_PER_PAGE = 10;
function getPagination(statuses, counts, currentPage) {
    const isLatestStatus = statuses.length > 1;
    const total = isLatestStatus
        ? statuses.reduce((total, status) => total + Math.min(counts[status], JOB_PER_PAGE), 0)
        : counts[statuses[0]];
    const start = isLatestStatus ? 0 : (currentPage - 1) * JOB_PER_PAGE;
    const pageCount = isLatestStatus ? 1 : Math.ceil(total / JOB_PER_PAGE);
    return {
        pageCount,
        range: { start, end: start + JOB_PER_PAGE - 1 },
    };
}
function getQueuesStats(jobs) {
    if (jobs.length === 0) {
        return {};
    }
    const waitTimes = jobs
        .reduce((acc, job) => {
        if (job.processedOn && job.timestamp) {
            acc.push(job.processedOn - job.timestamp);
        }
        return acc;
    }, [])
        .sort((a, b) => a - b);
    const processingTimes = jobs
        .reduce((acc, job) => {
        if (job.finishedOn && job.processedOn) {
            acc.push(job.finishedOn - job.processedOn);
        }
        return acc;
    }, [])
        .sort((a, b) => a - b);
    return {
        waitTime: {
            p95: waitTimes[Math.floor(waitTimes.length * 0.95)],
            p50: waitTimes[Math.floor(waitTimes.length * 0.5)],
            p05: waitTimes[Math.floor(waitTimes.length * 0.05)],
            avg: waitTimes.reduce((a, b) => a + b) / waitTimes.length,
        },
        processingTime: {
            p95: processingTimes[Math.floor(processingTimes.length * 0.95)],
            p50: processingTimes[Math.floor(processingTimes.length * 0.5)],
            p05: processingTimes[Math.floor(processingTimes.length * 0.05)],
            avg: processingTimes.reduce((a, b) => a + b) / processingTimes.length,
        },
    };
}
async function getAppQueues(pairs, query) {
    return Promise.all(pairs.map(async ([queueName, queue]) => {
        const isActiveQueue = decodeURIComponent(query.activeQueue) === queueName;
        const status = !isActiveQueue || query.status === 'latest' ? allStatuses : [query.status];
        const currentPage = +query.page || 1;
        const counts = await queue.getJobCounts(...allStatuses);
        const isPaused = await queue.isPaused();
        const pagination = getPagination(status, counts, currentPage);
        const jobs = isActiveQueue
            ? await queue.getJobs(status, pagination.range.start, pagination.range.end)
            : [];
        const jobsJson = jobs.filter(Boolean).map((job) => formatJob(job, queue));
        const metrics = {
            completed: await queue.getMetrics('completed'),
            failed: await queue.getMetrics('failed'),
        };
        const stats = getQueuesStats(jobsJson);
        const workers = await queue.getWorkers();
        return {
            name: queueName,
            counts: counts,
            metrics: metrics,
            stats,
            jobs: jobsJson,
            pagination,
            readOnlyMode: queue.readOnlyMode,
            allowRetries: queue.allowRetries,
            isPaused,
            workerCount: workers.length,
        };
    }));
}
async function queuesHandler({ queues: bullBoardQueues, query = {}, }) {
    const pairs = [...bullBoardQueues.entries()];
    const queues = pairs.length > 0 ? await getAppQueues(pairs, query) : [];
    const stats = pairs.length > 0 ? await getStats(pairs[0][1]) : {};
    return {
        body: {
            stats,
            queues,
        },
    };
}
exports.queuesHandler = queuesHandler;
//# sourceMappingURL=queues.js.map