import { AppQueue } from '@ay-bull-board/api/typings/app';
import React from 'react';
import s from './QueueTitle.module.css';

interface QueueTitleProps {
  queue: Pick<AppQueue, 'name' | 'description'> | null;
}
export const QueueTitle = ({ queue }: QueueTitleProps) => (
  <div className={s.queueTitle}>
    {!!queue && (
      <>
        <h1 className={s.name}>{queue.name}</h1>
        {!!queue.description && <p className={s.description}>{queue.description}</p>}
      </>
    )}
  </div>
);
