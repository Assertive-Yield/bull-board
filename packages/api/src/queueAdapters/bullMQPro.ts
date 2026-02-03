import { JobPro, QueuePro } from '@taskforcesh/bullmq-pro';
import {
  JobCleanStatus,
  JobCounts,
  JobStatus,
  QueueAdapterOptions,
  QueueJob,
} from '../../typings/app';
import { BaseAdapter } from './base';
import { Metrics } from 'bullmq';

export class BullMQProAdapter extends BaseAdapter {
  private readonly LIMIT = 1000;

  constructor(private queue: QueuePro, options: Partial<QueueAdapterOptions> = {}) {
    super(options);
  }

  public async getRedisInfo(): Promise<string> {
    const client = await this.queue.client;
    return client.info();
  }

  public getName(): string {
    const prefix = this.queue?.opts?.prefix;
    const name = prefix ? `${prefix}:${this.queue.name}` : this.queue.name;

    return `${this.prefix}${name}`;
  }

  public getMetrics(type: 'completed' | 'failed'): Promise<Metrics | undefined> {
    return this.queue.getMetrics(type);
  }

  public getWorkers(): Promise<Array<any>> {
    return this.queue.getWorkers();
  }

  public clean(jobStatus: JobCleanStatus, graceTimeMs: number): Promise<void> {
    return this.queue.clean(graceTimeMs, this.LIMIT, jobStatus).then(() => undefined);
  }

  public purge(): Promise<void> {
    return this.queue.obliterate({ force: true }).then(() => undefined);
  }

  public convertJobProAndQueueJob = (j: JobPro): QueueJob => {
    // Prefer a plain object representation if available
    const jobObj = typeof j.toJSON === 'function' ? j.toJSON() : (j as any);

    const mapped: QueueJob = {
      id: String(jobObj.id),
      name: jobObj.name,
      data: jobObj.data,
      opts: jobObj.opts,
      progress: jobObj.progress,
      attemptsMade: jobObj.attemptsMade ?? jobObj.attempts ?? 0,
      failedReason: jobObj.failedReason,
      stacktrace: jobObj.stacktrace ?? jobObj.stackTrace,
      returnvalue: jobObj.returnvalue ?? jobObj.returnValue,
      timestamp: jobObj.timestamp,
      processedOn: jobObj.processedOn,
      finishedOn: jobObj.finishedOn,
      delay: jobObj.delay,
    } as unknown as QueueJob;

    return mapped;
  };

  public getJob(id: string): Promise<QueueJob | undefined> {
    return this.queue
      .getJob(id)
      .then((job) => (job ? this.convertJobProAndQueueJob(job) : undefined));
  }

  public getJobs(jobStatuses: JobStatus[], start?: number, end?: number): Promise<QueueJob[]> {
    return this.queue
      .getJobs(jobStatuses, start, end)
      .then((jobs) =>
        jobs
          .map((j) => (j ? this.convertJobProAndQueueJob(j) : undefined))
          .filter((f): f is QueueJob => f !== undefined)
      );
  }

  public async getJobsSearch(
    jobStatuses: JobStatus[],
    start?: number,
    end?: number,
    search?: string
  ): Promise<QueueJob[]> {
    if (!search) {
      return this.getJobs(jobStatuses, start, end);
    }
    const jobIds = await this.queue.getRanges(jobStatuses, 0, -1);
    return Promise.all(
      jobIds
        .filter((jobId) => jobId.includes(search))
        .slice(start, end)
        .map((jobId) => this.getJob(jobId) as Promise<QueueJob>)
    );
  }

  public getJobCounts(...jobStatuses: JobStatus[]): Promise<JobCounts> {
    return this.queue.getJobCounts(...jobStatuses) as unknown as Promise<JobCounts>;
  }

  public getJobLogs(id: string): Promise<string[]> {
    return this.queue.getJobLogs(id).then(({ logs }) => logs);
  }

  public isPaused(): Promise<boolean> {
    return this.queue.isPaused();
  }

  public pause(): Promise<void> {
    return this.queue.pause();
  }

  public resume(): Promise<void> {
    return this.queue.resume();
  }

  public empty(): Promise<void> {
    return this.queue.drain();
  }
}
