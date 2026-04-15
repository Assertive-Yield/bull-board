import React from 'react';
import { AppQueue } from '@ay-bull-board/api/typings/app';
import cn from 'clsx';
import s from '../Menu.module.css';
import { QueueItem } from './QueueItem';
import { QueueRelationships } from '../QueueHelpers';

type OtherQueueGroupProps = {
  queues: AppQueue[];
  hasFailed: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  currentQueueName: string | null;
  queueRelationships: QueueRelationships;
  selectedStatuses: Record<string, string>;
  allQueues: AppQueue[] | undefined;
  navigateToQueue: (queueName: string) => void;
};

export const OtherQueueGroup: React.FC<OtherQueueGroupProps> = ({
  queues,
  hasFailed,
  isExpanded,
  onToggle,
  currentQueueName,
  queueRelationships,
  selectedStatuses,
  allQueues,
  navigateToQueue
}) => {
  return (
    <div className={s.queueGroup}>
      <div 
        className={cn(s.groupHeader, { 
          [s.expanded]: isExpanded,
          [s.failed]: hasFailed
        })}
        onClick={onToggle}
      >
        <span className={s.groupName}>Other Queues</span>
        <div>
          <span className={s.groupBadge}>{queues.length}</span>
          <span className={s.expandIcon}>›</span>
        </div>
      </div>
      <ul className={cn(s.groupItems, { [s.expanded]: isExpanded })}>
        {queues.map(queue => (
          <QueueItem
            key={queue.name}
            queue={queue}
            currentQueueName={currentQueueName}
            queueRelationships={queueRelationships}
            selectedStatuses={selectedStatuses}
            queues={allQueues}
            navigateToQueue={navigateToQueue}
          />
        ))}
      </ul>
    </div>
  );
}; 