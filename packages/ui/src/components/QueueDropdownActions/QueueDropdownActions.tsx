import { AppQueue } from '@ay-bull-board/api/typings/app';
import { Item, Portal, Root, Trigger } from '@radix-ui/react-dropdown-menu';
import React from 'react';
import { Store } from '../../hooks/useStore';
import { DropdownContent } from '../DropdownContent/DropdownContent';
import { EllipsisVerticalIcon } from '../Icons/EllipsisVertical';
import { PauseIcon } from '../Icons/Pause';
import { PlayIcon } from '../Icons/Play';
import { TrashIcon } from '../Icons/Trash';
import { Button } from '../JobCard/Button/Button';
import s from './QueueDropdownActions.module.css';

export const QueueDropdownActions = ({
  queue,
  actions,
}: {
  queue: AppQueue;
  actions: Store['actions'];
}) => (
  <Root>
    <Trigger asChild>
      <Button className={s.trigger}>
        <EllipsisVerticalIcon />
      </Button>
    </Trigger>

    <Portal>
      <DropdownContent align="end">
        <Item
          onSelect={
            queue.isPaused ? actions.resumeQueue(queue.name) : actions.pauseQueue(queue.name)
          }
        >
          {queue.isPaused ? (
            <>
              <PlayIcon />
              Resume
            </>
          ) : (
            <>
              <PauseIcon />
              Pause
            </>
          )}
        </Item>
        <Item onSelect={actions.emptyQueue(queue.name)}>
          <TrashIcon />
          Empty
        </Item>
      </DropdownContent>
    </Portal>
  </Root>
);
