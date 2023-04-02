import { QueueStats } from '@ay-bull-board/api/dist/typings/app';
import {
  AppJob,
  JobCleanStatus,
  JobRetryStatus,
  RedisStats,
  Status,
} from '@ay-bull-board/api/typings/app';
import { GetQueuesResponse } from '@ay-bull-board/api/typings/responses';
import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

export class Api {
  private axios: AxiosInstance;

  constructor({ basePath }: { basePath: string } = { basePath: '' }) {
    this.axios = Axios.create({ baseURL: `${basePath}api` });
    this.axios.interceptors.response.use(this.handleResponse, this.handleError);
  }

  public getQueues({
    activeQueue,
    status,
    page,
    jobsPerPage,
    search,
  }: {
    activeQueue?: string;
    status?: Status;
    page: string;
    jobsPerPage: number;
    search?: string;
  }): Promise<GetQueuesResponse> {
    return this.axios.get(`/queues`, {
      params: { activeQueue, status, page, jobsPerPage, search },
    });
  }

  public getQueueStats(queueName: string): Promise<QueueStats> {
    return this.axios.get(`/queues/${encodeURIComponent(queueName)}/stats`);
  }

  public retryAll(queueName: string, status: JobRetryStatus): Promise<void> {
    return this.axios.put(
      `/queues/${encodeURIComponent(queueName)}/retry/${encodeURIComponent(status)}`
    );
  }

  public cleanAll(queueName: string, status: JobCleanStatus): Promise<void> {
    return this.axios.put(
      `/queues/${encodeURIComponent(queueName)}/clean/${encodeURIComponent(status)}`
    );
  }

  public purgeQueue(queueName: string): Promise<void> {
    return this.axios.put(`/queues/${encodeURIComponent(queueName)}/purge`);
  }

  public cleanJob(queueName: string, jobId: AppJob['id']): Promise<void> {
    return this.axios.put(
      `/queues/${encodeURIComponent(queueName)}/${encodeURIComponent(`${jobId}`)}/clean`
    );
  }

  public retryJob(queueName: string, jobId: AppJob['id'], status: JobRetryStatus): Promise<void> {
    return this.axios.put(
      `/queues/${encodeURIComponent(queueName)}/${encodeURIComponent(
        `${jobId}`
      )}/retry/${encodeURIComponent(status)}`
    );
  }

  public promoteJob(queueName: string, jobId: AppJob['id']): Promise<void> {
    return this.axios.put(
      `/queues/${encodeURIComponent(queueName)}/${encodeURIComponent(`${jobId}`)}/promote`
    );
  }

  public getJobLogs(queueName: string, jobId: AppJob['id']): Promise<string[]> {
    return this.axios.get(
      `/queues/${encodeURIComponent(queueName)}/${encodeURIComponent(`${jobId}`)}/logs`
    );
  }

  public pauseQueue(queueName: string) {
    return this.axios.put(`/queues/${encodeURIComponent(queueName)}/pause`);
  }

  public resumeQueue(queueName: string) {
    return this.axios.put(`/queues/${encodeURIComponent(queueName)}/resume`);
  }

  public emptyQueue(queueName: string) {
    return this.axios.put(`/queues/${encodeURIComponent(queueName)}/empty`);
  }

  private handleResponse(response: AxiosResponse): any {
    return response.data;
  }

  private async handleError(error: { response: AxiosResponse }): Promise<any> {
    if (error.response.data?.error) {
      toast.error(error.response.data?.error, { autoClose: 5000 });
    }

    return Promise.resolve(error.response.data);
  }

  public getStats(): Promise<RedisStats> {
    return this.axios.get(`/redis/stats`);
  }
}
