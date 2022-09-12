import { BaseAdapter } from '../queueAdapters/base';
import { BullBoardRequest, ControllerHandlerReturnType } from '../../typings/app';
import { queueProvider } from '../providers/queue';

async function purgeQueue(
  _req: BullBoardRequest,
  queue: BaseAdapter
): Promise<ControllerHandlerReturnType> {
  await queue.purge();

  return {
    status: 200,
    body: {},
  };
}

export const purgeQueueHandler = queueProvider(purgeQueue);
