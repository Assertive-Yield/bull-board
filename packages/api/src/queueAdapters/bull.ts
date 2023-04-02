import { Job, Queue } from 'bull';
import { JobCleanStatus, JobCounts, JobStatus, QueueAdapterOptions } from '../../typings/app';
import { BaseAdapter } from './base';

export class BullAdapter extends BaseAdapter {
  constructor(public queue: Queue, options: Partial<QueueAdapterOptions> = {}) {
    super({ ...options, allowCompletedRetries: false });
  }

  public getRedisInfo(): Promise<string> {
    return this.queue.client.info();
  }

  public getName(): string {
    return `${this.prefix}${this.queue.name}`;
  }

  public getMetrics(): Promise<undefined> {
    // not implemented/supported
    return Promise.resolve(undefined);
  }

  public getWorkers(): Promise<Array<any>> {
    return this.queue.getWorkers();
  }

  public clean(jobStatus: JobCleanStatus, graceTimeMs: number): Promise<any> {
    return this.queue.clean(graceTimeMs, jobStatus as any);
  }

  public purge(): Promise<any> {
    return this.queue.obliterate({ force: true });
  }

  public getJob(id: string): Promise<Job | undefined | null> {
    return this.queue.getJob(id).then((job) => {
      if (typeof job?.attemptsMade === 'number') {
        job.attemptsMade++;
      }
      return job;
    });
  }

  public getJobs(jobStatuses: JobStatus[], start?: number, end?: number): Promise<Job[]> {
    return this.queue.getJobs(jobStatuses, start, end).then((jobs) =>
      jobs.map((job) => {
        if (typeof job?.attemptsMade === 'number') {
          job.attemptsMade++; // increase to align it with bullMQ behavior
        }

        return job;
      })
    );
  }

  // NOT IMPLEMENTED
  public async getJobsSearch(
    jobStatuses: JobStatus[],
    start?: number,
    end?: number,
    search?: string
  ): Promise<Job[]> {
    if (!search) return this.getJobs(jobStatuses, start, end);

    return this.queue.getJobs(jobStatuses, 0, -1).then((jobs) =>
      jobs
        .filter((job) => job.name.includes(search))
        .slice(start, end)
        .map((job) => {
          if (typeof job?.attemptsMade === 'number') {
            job.attemptsMade++; // increase to align it with bullMQ behavior
          }
          return job;
        })
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getJobCounts(..._jobStatuses: JobStatus[]): Promise<JobCounts> {
    return this.queue.getJobCounts() as unknown as Promise<JobCounts>;
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
    return this.queue.empty();
  }
}
