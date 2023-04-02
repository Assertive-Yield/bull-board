import {
  AppJob,
  AppQueue,
  BullBoardRequest,
  ControllerHandlerReturnType,
  JobCounts,
  JobStatus,
  MetricsObj,
  Pagination,
  QueueJob,
  QueueStats,
  Status,
} from '../../typings/app';
import { STATUSES } from '../constants/statuses';
import { BaseAdapter } from '../queueAdapters/base';
import { Job } from 'bullmq';

const formatJob = (job: QueueJob, queue: BaseAdapter): AppJob => {
  const jobProps = job.toJSON();

  const stacktrace = jobProps.stacktrace ? jobProps.stacktrace.filter(Boolean) : [];

  return {
    id: jobProps.id,
    timestamp: jobProps.timestamp,
    processedOn: jobProps.processedOn,
    finishedOn: jobProps.finishedOn,
    progress: jobProps.progress,
    attempts: jobProps.attemptsMade,
    delay: jobProps.delay,
    failedReason: jobProps.failedReason,
    stacktrace,
    opts: jobProps.opts,
    data: queue.format('data', jobProps.data),
    name: queue.format('name', jobProps, jobProps.name || ''),
    returnValue: queue.format('returnValue', jobProps.returnvalue),
    isFailed: !!jobProps.failedReason || (Array.isArray(stacktrace) && stacktrace.length > 0),
  };
};

const allStatuses: JobStatus[] = [
  STATUSES.active,
  STATUSES.completed,
  STATUSES.delayed,
  STATUSES.failed,
  STATUSES.paused,
  STATUSES.waiting,
];

function getPagination(
  statuses: JobStatus[],
  counts: JobCounts,
  currentPage: number,
  jobsPerPage: number
): Pagination {
  const isLatestStatus = statuses.length > 1;
  const total = isLatestStatus
    ? statuses.reduce((total, status) => total + Math.min(counts[status], jobsPerPage), 0)
    : counts[statuses[0]];

  const start = isLatestStatus ? 0 : (currentPage - 1) * jobsPerPage;
  const pageCount = isLatestStatus ? 1 : Math.ceil(total / jobsPerPage);

  return {
    pageCount,
    range: { start, end: start + jobsPerPage - 1 },
  };
}

async function getQueuesStats(queue: BaseAdapter): Promise<QueueStats | Record<string, never>> {
  const jobs = (await queue.getJobs([STATUSES.completed], 0, 999)) as Job[];

  if (jobs.length === 0) {
    return {};
  }

  const waitTimes = jobs
    .reduce((acc, job) => {
      if (job && job.processedOn && job.timestamp) {
        acc.push(job.processedOn - job.timestamp);
      }

      return acc;
    }, [] as number[])
    .sort((a, b) => a - b);

  const processingTimes = jobs
    .reduce((acc, job) => {
      if (job && job.finishedOn && job.processedOn) {
        acc.push(job.finishedOn - job.processedOn);
      }

      return acc;
    }, [] as number[])
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

async function getAppQueues(
  pairs: [string, BaseAdapter][],
  query: Record<string, any>
): Promise<AppQueue[]> {
  return Promise.all(
    pairs.map(async ([queueName, queue]) => {
      const isActiveQueue = decodeURIComponent(query.activeQueue) === queueName;
      const jobsPerPage = +query.jobsPerPage || 10;

      const status =
        !isActiveQueue || query.status === 'latest' ? allStatuses : [query.status as JobStatus];
      const currentPage = +query.page || 1;
      const search = query.search || '';

      const counts = await queue.getJobCounts(...allStatuses);
      const isPaused = await queue.isPaused();

      const pagination = getPagination(status, counts, currentPage, jobsPerPage);
      const jobs = isActiveQueue
        ? await queue.getJobsSearch(status, pagination.range.start, pagination.range.end, search)
        : [];
      const jobsJson = jobs.filter(Boolean).map((job) => formatJob(job, queue));

      const metrics = {
        completed: await queue.getMetrics('completed'),
        failed: await queue.getMetrics('failed'),
      };

      const stats = await getQueuesStats(queue);

      // will fail in test since client is not mocked in ioredis-mock
      let workers = [];
      try {
        workers = await queue.getWorkers();
      } catch (e) {}

      const description = queue.getDescription() || undefined;

      return {
        name: queueName,
        description,
        counts: counts as Record<Status, number>,
        metrics: metrics as MetricsObj,
        stats,
        jobs: jobsJson,
        pagination,
        readOnlyMode: queue.readOnlyMode,
        allowRetries: queue.allowRetries,
        allowCompletedRetries: queue.allowCompletedRetries,
        isPaused,
        workerCount: Array.isArray(workers) ? workers.length : 0,
      };
    })
  );
}

export async function queuesHandler({
  queues: bullBoardQueues,
  query = {},
}: BullBoardRequest): Promise<ControllerHandlerReturnType> {
  const pairs = [...bullBoardQueues.entries()];

  const queues = pairs.length > 0 ? await getAppQueues(pairs, query) : [];

  return {
    body: {
      queues,
    },
  };
}
