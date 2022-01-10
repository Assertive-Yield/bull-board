import React, { useState } from 'react';

import { AppQueue } from '@bull-board-ay/api/typings/app';
import { NavLink } from 'react-router-dom';
import { STATUS_LIST } from '../../constants/status-list';
import { SearchIcon } from '../Icons/Search';
import { Store } from '../../hooks/useStore';
import s from './Menu.module.css';
import cn from 'clsx';

export const Menu = ({
  queues,
  selectedStatuses,
}: {
  queues: AppQueue[] | undefined;
  selectedStatuses: Store['selectedStatuses'];
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <aside className={s.aside}>
      <div className={s.secondary}>QUEUES</div>

      {(queues?.length || 0) > 5 && (
        <div className={s.searchWrapper}>
          <SearchIcon />
          <input
            className={s.search}
            type="search"
            id="search-queues"
            placeholder="Filter queues"
            value={searchTerm}
            onChange={({ currentTarget }) => setSearchTerm(currentTarget.value)}
          />
        </div>
      )}
      <nav>
        {!!queues && (
          <ul className={s.menu}>
            {queues
              .filter(({ name }) => name.includes(searchTerm))
              .map(({ name: queueName, isPaused, counts }) => (
                <li key={queueName}>
                  <NavLink
                    to={`/queue/${encodeURIComponent(queueName)}${
                      !selectedStatuses[queueName] || selectedStatuses[queueName] === STATUS_LIST[0]
                        ? ''
                        : `?status=${selectedStatuses[queueName]}`
                    }`}
                    activeClassName={s.active}
                    title={queueName}
                  >
                    <div className={s.name}>
                      {queueName} {isPaused && <span className={s.isPaused}>[ Paused ]</span>}
                    </div>
                    <div className={s.stat}>
                      <div className={s.statItem} title="Waiting">
                        <span className={s.statIcon}>⚪</span>
                        {counts.waiting + (counts['waiting-children'] ?? 0)}
                      </div>
                      <div className={s.statItem} title="Failed">
                        <span className={s.statIcon}>🔴</span>
                        {counts.failed}
                      </div>
                    </div>
                  </NavLink>
                </li>
              ))}
          </ul>
        )}
      </nav>
      <div className={cn(s.appVersion, s.secondary)}>{process.env.APP_VERSION}</div>
    </aside>
  );
};
