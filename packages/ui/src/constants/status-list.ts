import { KeyOf } from '@bull-board-ay/api/typings/utils';
import { STATUSES } from '@bull-board-ay/api/src/constants/statuses';

export const STATUS_LIST: Readonly<KeyOf<typeof STATUSES>> = [
  STATUSES.latest as any,
  STATUSES.active,
  STATUSES.waiting,
  STATUSES.completed,
  STATUSES.failed,
  STATUSES.delayed,
  STATUSES.paused,
  STATUSES['waiting-children'],
] as const;
