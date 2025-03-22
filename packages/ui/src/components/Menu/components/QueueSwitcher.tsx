import React from 'react';
import cn from 'clsx';
import s from '../Menu.module.css';

type QueueSwitcherProps = {
  isWorkerActive: boolean;
  isSchedulerActive: boolean;
  isWorkerQueuePaused: boolean;
  isSchedulerQueuePaused: boolean;
  hasWorkerQueueFailed: boolean;
  hasSchedulerQueueFailed: boolean;
  hasWorker: boolean;
  hasScheduler: boolean;
  isScheduler: boolean;
  onWorkerClick: (e: React.MouseEvent) => void;
  onSchedulerClick: (e: React.MouseEvent) => void;
};

export const QueueSwitcher: React.FC<QueueSwitcherProps> = ({
  isWorkerActive,
  isSchedulerActive,
  isWorkerQueuePaused,
  isSchedulerQueuePaused,
  hasWorkerQueueFailed,
  hasSchedulerQueueFailed,
  hasWorker,
  hasScheduler,
  isScheduler,
  onWorkerClick,
  onSchedulerClick
}) => {
  return (
    <div className={s.queueSwitcher}>
      {/* Always show Worker button if this is a Worker or if this Scheduler has a Worker */}
      {(!isScheduler || hasWorker) && (
        <div 
          className={cn(s.queueSwitcherOption, { 
            [s.active]: isWorkerActive,
            [s.paused]: isWorkerQueuePaused,
            [s.failed]: hasWorkerQueueFailed
          })}
          onClick={onWorkerClick}
        >
          Worker
        </div>
      )}
      
      {/* Always show Scheduler button if this is a Scheduler or if this Worker has a Scheduler */}
      {(isScheduler || hasScheduler) && (
        <div 
          className={cn(s.queueSwitcherOption, { 
            [s.active]: isSchedulerActive,
            [s.paused]: isSchedulerQueuePaused,
            [s.failed]: hasSchedulerQueueFailed
          })}
          onClick={onSchedulerClick}
        >
          Scheduler
        </div>
      )}
    </div>
  );
}; 