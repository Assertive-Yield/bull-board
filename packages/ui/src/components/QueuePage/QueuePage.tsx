import React from 'react';
import { Store } from '../../hooks/useStore';
import { JobCard } from '../JobCard/JobCard';
import { QueueActions } from '../QueueActions/QueueActions';
import { StatusMenu } from '../StatusMenu/StatusMenu';
import s from './QueuePage.module.css';
import { AppQueue, JobRetryStatus } from '@ay-bull-board/api/typings/app';
import { Pagination } from '../Pagination/Pagination';
import { QueueSearch } from '../QueueSearch/QueueSearch';

export const QueuePage = ({
  selectedStatus,
  actions,
  queue,
}: {
  queue: AppQueue | null;
  actions: Store['actions'];
  selectedStatus: Store['selectedStatuses'];
}) => {
  if (!queue) {
    return <section>Queue Not found</section>;
  }

  const status = selectedStatus[queue.name];

  return (
    <>
      <div className={s.stickyHeader}>
        <StatusMenu queue={queue} actions={actions} />
        <div className={s.actionContainer}>
          <div className={s.flex}>
            <QueueSearch />
            {queue.jobs.length > 0 && !queue.readOnlyMode && (
              <QueueActions
                queue={queue}
                actions={actions}
                status={selectedStatus[queue.name]}
                allowRetries={
                  (selectedStatus[queue.name] == 'failed' || queue.allowCompletedRetries) &&
                  queue.allowRetries
                }
              />
            )}
          </div>
          <Pagination pageCount={queue.pagination.pageCount} />
        </div>
      </div>
      {queue.jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          status={status}
          actions={{
            cleanJob: actions.cleanJob(queue?.name)(job),
            promoteJob: actions.promoteJob(queue?.name)(job),
            retryJob: actions.retryJob(queue?.name, status as JobRetryStatus)(job),
            getJobLogs: actions.getJobLogs(queue?.name)(job),
          }}
          readOnlyMode={queue?.readOnlyMode}
          allowRetries={(job.isFailed || queue.allowCompletedRetries) && queue?.allowRetries}
        />
      ))}
    </>
  );
};
