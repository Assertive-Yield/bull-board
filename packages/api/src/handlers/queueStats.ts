import { BaseAdapter } from '../queueAdapters/base';
import { BullBoardRequest, ControllerHandlerReturnType, QueueStats } from '../../typings/app';
import { queueProvider } from '../providers/queue';
import { STATUSES } from '../constants/statuses';
import { Job } from 'bullmq';

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

async function queueStats(
  _req: BullBoardRequest,
  queue: BaseAdapter
): Promise<ControllerHandlerReturnType> {
  const stats = await getQueuesStats(queue);

  return {
    status: 200,
    body: stats,
  };
}

export const queueStatsHandler = queueProvider(queueStats);
