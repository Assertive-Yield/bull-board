/* eslint-disable no-console */
import { Queue as QueueMQ } from 'bullmq';
import express from 'express';
import { BullMQAdapter } from '@ay-bull-board/api/src/queueAdapters/bullMQ';
import { createBullBoard } from '@ay-bull-board/api/src';
import { ExpressAdapter } from '@ay-bull-board/express/src';
import { BaseAdapter } from '@ay-bull-board/api/src/queueAdapters/base';

import queueNames from './queueNames.json';
const queues: BaseAdapter[] | BullMQAdapter[] = [];

const redisOptions = {
  port: 6379,
  host: 'localhost',
  password: '',
};

const createQueueMQ = (name: string) => new QueueMQ(name, { connection: redisOptions });

const run = async () => {
  const app = express();

  queueNames.map((queueName) => {
    queues.push(new BullMQAdapter(createQueueMQ(queueName)));
  });

  const serverAdapter: any = new ExpressAdapter();
  serverAdapter.setBasePath('/ui');

  createBullBoard({
    queues: queues,
    serverAdapter,
  });

  app.use('/ui', serverAdapter.getRouter());

  app.listen(3000, () => {
    console.log('Running on 3000...');
    console.log('For the UI, open http://localhost:3000/ui');
  });
};

run().catch((e) => console.error(e));
