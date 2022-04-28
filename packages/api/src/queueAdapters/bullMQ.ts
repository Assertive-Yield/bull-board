import { Job, Metrics, Queue } from 'bullmq';
import { JobCleanStatus, JobCounts, JobStatus, QueueAdapterOptions } from '../../typings/app';
import { BaseAdapter } from './base';

export class BullMQAdapter extends BaseAdapter {
  private readonly LIMIT = 1000;

  constructor(private queue: Queue, options: Partial<QueueAdapterOptions> = {}) {
    super(options);
  }

  public async getRedisInfo(): Promise<string> {
    const client = await this.queue.client;
    return client.info();
  }

  public getName(): string {
    return `${this.prefix}${this.queue.name}`;
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

  public getJob(id: string): Promise<Job | undefined> {
    return this.queue.getJob(id);
  }

  public getJobs(jobStatuses: JobStatus[], start?: number, end?: number): Promise<Job[]> {
    return this.queue.getJobs(jobStatuses, start, end);
  }

  public async getJobsSearch(
    jobStatuses: JobStatus[],
    start?: number,
    end?: number,
    search?: string
  ): Promise<Job[]> {
    if (!search) {
      return this.getJobs(jobStatuses, start, end);
    }
    const jobIds = await this.queue.getRanges(jobStatuses, 0, -1);
    return Promise.all(
      jobIds
        .filter((jobId) => !jobId.includes(search))
        .slice(start, end)
        .map((jobId) => this.getJob(jobId) as Promise<Job>)
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
}
