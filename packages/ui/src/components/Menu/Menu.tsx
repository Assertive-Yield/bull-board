import { AppQueue } from '@ay-bull-board/api/typings/app';
import React, { useState, useMemo, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import cn from 'clsx';
import { Store } from '../../hooks/useStore';
import { 
  processQueues, 
  extractCurrentQueueNameFromPath
} from './QueueHelpers';
import { SearchBar } from './components/SearchBar';
import { QueueGroup } from './components/QueueGroup';
import { OtherQueueGroup } from './components/OtherQueueGroup';
import s from './Menu.module.css';

export const Menu = ({
  queues,
  selectedStatuses,
}: {
  queues: AppQueue[] | undefined;
  selectedStatuses: Store['selectedStatuses'];
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [otherQueuesExpanded, setOtherQueuesExpanded] = useState(false);
  const history = useHistory();
  const location = useLocation();

  // Get the current active queue name from the URL
  const currentQueueName = useMemo(() => 
    extractCurrentQueueNameFromPath(location.pathname), 
    [location.pathname]
  );

  // Process queues to identify scheduler and worker relationships
  const { queueGroups, ungroupedQueues, hasUngroupedFailed, queueRelationships } = useMemo(() => 
    processQueues(queues, searchTerm),
    [queues, searchTerm]
  );

  // Toggle a group's expanded state
  const toggleGroup = useCallback((groupName: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  }, []);

  // Toggle the other queues expanded state
  const toggleOtherQueues = useCallback(() => {
    setOtherQueuesExpanded(prev => !prev);
  }, []);

  // Navigate to queue
  const navigateToQueue = useCallback((queueName: string) => {
    history.push(`/queue/${encodeURIComponent(queueName)}`);
  }, [history]);

  return (
    <aside className={s.aside}>
      <div className={s.secondary}>QUEUES</div>

      {(queues?.length || 0) > 5 && (
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
        />
      )}
      <nav>
        {!!queues && (
          <ul className={s.menu}>
            {/* Queue Groups */}
            {queueGroups.map(group => (
              <QueueGroup
                key={group.name}
                name={group.name}
                queues={group.queues}
                hasFailed={group.hasFailed}
                isExpanded={!!expandedGroups[group.name]}
                onToggle={() => toggleGroup(group.name)}
                currentQueueName={currentQueueName}
                queueRelationships={queueRelationships}
                selectedStatuses={selectedStatuses}
                allQueues={queues}
                navigateToQueue={navigateToQueue}
              />
            ))}

            {/* Ungrouped Queues */}
            {ungroupedQueues.length > 0 && (
              <OtherQueueGroup
                queues={ungroupedQueues}
                hasFailed={hasUngroupedFailed}
                isExpanded={otherQueuesExpanded}
                onToggle={toggleOtherQueues}
                currentQueueName={currentQueueName}
                queueRelationships={queueRelationships}
                selectedStatuses={selectedStatuses}
                allQueues={queues}
                navigateToQueue={navigateToQueue}
              />
            )}
          </ul>
        )}
      </nav>
      <div className={cn(s.appVersion, s.secondary)}>{process.env.APP_VERSION}</div>
    </aside>
  );
};
