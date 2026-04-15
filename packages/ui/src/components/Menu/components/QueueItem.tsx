import React from 'react';
import { AppQueue } from '@ay-bull-board/api/typings/app';
import { NavLink } from 'react-router-dom';
import cn from 'clsx';
import s from '../Menu.module.css';
import { 
  isSchedulerQueue,
  getActiveQueueTypes,
  getQueueStatusInfo,
  getDisplayName,
  QueueRelationships
} from '../QueueHelpers';
import { STATUS_LIST } from '../../../constants/status-list';
import { QueueSwitcher } from './QueueSwitcher';

type QueueItemProps = {
  queue: AppQueue;
  currentQueueName: string | null;
  queueRelationships: QueueRelationships;
  selectedStatuses: Record<string, string>;
  queues: AppQueue[] | undefined;
  navigateToQueue: (queueName: string) => void;
};

export const QueueItem: React.FC<QueueItemProps> = ({
  queue,
  currentQueueName,
  queueRelationships,
  selectedStatuses,
  queues,
  navigateToQueue
}) => {
  const { name } = queue;
  const isScheduler = isSchedulerQueue(name);
  const workerQueue = isScheduler ? queueRelationships.schedulerToWorker[name] : null;
  const schedulerQueue = !isScheduler ? queueRelationships.workerToScheduler[name] : null;
  
  // Determine if this has a worker/scheduler counterpart
  const hasWorker = isScheduler && !!workerQueue;
  const hasScheduler = !isScheduler && !!schedulerQueue;
  
  // Get active state information for this queue
  const activeQueueInfo = getActiveQueueTypes(
    name, 
    currentQueueName, 
    queueRelationships
  );
  
  // Ensure boolean values for active state props
  const isWorkerActive = !!activeQueueInfo.isWorkerActive;
  const isSchedulerActive = !!activeQueueInfo.isSchedulerActive;
  const isActive = !!activeQueueInfo.isActive;

  // Get status information using helper function
  const statusInfo = getQueueStatusInfo(
    queue,
    isScheduler,
    workerQueue,
    schedulerQueue,
    queues
  );

  // Extract status info
  const {
    isWorkerQueuePaused,
    isSchedulerQueuePaused,
    hasWorkerQueueFailed,
    hasSchedulerQueueFailed,
    isPaused
  } = statusInfo;

  // Check failed states for the current queue
  const hasCurrentQueueFailed = queue.counts.failed > 0;
  
  // Get the formatted display name
  const displayName = getDisplayName(name);
  
  const navigateToQueueWithoutDefault = (e: React.MouseEvent, queueName: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigateToQueue(queueName);
  };
  
  // When clicking on the queue name, navigate to worker if available
  const handleQueueClick = (e: React.MouseEvent) => {
    if (isScheduler && workerQueue) {
      e.preventDefault();
      navigateToQueue(workerQueue);
    }
    // If it's a worker or a standalone scheduler, use the default navigation
  };

  const handleWorkerClick = (e: React.MouseEvent) => {
    if (isScheduler && workerQueue) {
      navigateToQueueWithoutDefault(e, workerQueue);
    }
  };

  const handleSchedulerClick = (e: React.MouseEvent) => {
    if (!isScheduler && schedulerQueue) {
      navigateToQueueWithoutDefault(e, schedulerQueue);
    }
  };

  return (
    <li className={s.navLi}>
      <NavLink
        to={`/queue/${encodeURIComponent(name)}${
          !selectedStatuses[name] || selectedStatuses[name] === STATUS_LIST[0]
            ? ''
            : `?status=${selectedStatuses[name]}`
        }`}
        activeClassName={s.active}
        title={name}
        className={cn({
          [s.failed]: hasCurrentQueueFailed,
          [s.schedulerQueue]: isScheduler && !hasWorker,
          [s.active]: isActive // Apply active class for the related queue too
        })}
        onClick={handleQueueClick}
      >
        {/* Only show the scheduler badge if it's not part of a pair */}
        {isScheduler && !hasWorker && <span className={s.schedulerBadge}>Scheduler</span>}
        
        <span className={s.queueLabel}>
          {displayName}
        </span>
        
        {/* Show queue switcher - always show the current mode, show the other mode only if available */}
        <div className={s.queueSwitcherContainer}>
          <QueueSwitcher
            isWorkerActive={isWorkerActive}
            isSchedulerActive={isSchedulerActive}
            isWorkerQueuePaused={isWorkerQueuePaused}
            isSchedulerQueuePaused={isSchedulerQueuePaused}
            hasWorkerQueueFailed={hasWorkerQueueFailed}
            hasSchedulerQueueFailed={hasSchedulerQueueFailed}
            hasWorker={hasWorker}
            hasScheduler={hasScheduler}
            isScheduler={isScheduler}
            onWorkerClick={handleWorkerClick}
            onSchedulerClick={handleSchedulerClick}
          />
          {isPaused && <span className={s.isPaused}>Paused</span>}
        </div>
      </NavLink>
    </li>
  );
}; 