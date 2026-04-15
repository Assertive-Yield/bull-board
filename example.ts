import * as Bull from 'bull';
import Queue3 from 'bull';
import { Queue as QueueMQ, QueueScheduler, Worker } from 'bullmq';
import express from 'express';
import { BullMQAdapter } from '@ay-bull-board/api/src/queueAdapters/bullMQ';
import { BullAdapter } from '@ay-bull-board/api/src/queueAdapters/bull';
import { createBullBoard } from '@ay-bull-board/api/src';
import { ExpressAdapter } from '@ay-bull-board/express/src';

const redisOptions = {
  port: 6379,
  host: 'localhost',
  password: '',
};

const sleep = (t: number) => new Promise((resolve) => setTimeout(resolve, t * 1000));

const createQueue3 = (name: string) => new Queue3(name, { redis: redisOptions });
const createQueueMQ = (name: string) => new QueueMQ(name, { connection: redisOptions });

function setupBullProcessor(bullQueue: Bull.Queue) {
  bullQueue.process(async (job) => {
    for (let i = 0; i <= 100; i++) {
      await sleep(Math.random());
      await job.progress(i);
      await job.log(`Processing job at interval ${i}`);
      if (Math.random() * 200 < 1) throw new Error(`Random error ${i}`);
    }

    return { jobId: `This is the return value of job (${job.id})` };
  });
}

async function setupBullMQProcessor(queueName: string) {
  const queueScheduler = new QueueScheduler(queueName, {
    connection: redisOptions,
  });
  await queueScheduler.waitUntilReady();

  new Worker(
    queueName,
    async (job) => {
      for (let i = 0; i <= 100; i++) {
        await sleep(Math.random());
        await job.updateProgress(i);
        await job.log(`Processing job at interval ${i}`);

        if (Math.random() * 200 < 1) throw new Error(`Random error ${i}`);
      }

      return { jobId: `This is the return value of job (${job.id})` };
    },
    { connection: redisOptions }
  );
}

const run = async () => {
  const app = express();

  const exampleBull = createQueue3('ExampleBull');
  const exampleBullMq = createQueueMQ('ExampleBullMQ');
  const exampleBullMq2 = createQueueMQ('ExampleBullMQ2');
  const exampleBullMq3 = createQueueMQ('ExampleBullMQ3');
  const exampleBullMq4 = createQueueMQ('ExampleBullMQ4');
  const exampleBullMq5 = createQueueMQ('ExampleBullMQ5');
  const exampleBullMq6 = createQueueMQ('ExampleBullMQ6');
  const exampleBullMq7 = createQueueMQ('ExampleBullMQ7');
  const exampleBullMq8 = createQueueMQ('ExampleBullMQ8');
  const exampleBullMq9 = createQueueMQ('ExampleBullMQ9');

  await setupBullProcessor(exampleBull); // needed only for example proposes
  await setupBullMQProcessor(exampleBullMq.name); // needed only for example proposes
  await setupBullMQProcessor(exampleBullMq2.name); // needed only for example proposes
  await setupBullMQProcessor(exampleBullMq3.name); // needed only for example proposes
  await setupBullMQProcessor(exampleBullMq4.name); // needed only for example proposes
  await setupBullMQProcessor(exampleBullMq5.name); // needed only for example proposes
  await setupBullMQProcessor(exampleBullMq6.name); // needed only for example proposes
  await setupBullMQProcessor(exampleBullMq7.name); // needed only for example proposes
  await setupBullMQProcessor(exampleBullMq8.name); // needed only for example proposes
  await setupBullMQProcessor(exampleBullMq9.name); // needed only for example proposes

  app.use('/add', (req, res) => {
    const opts = req.query.opts || ({} as any);

    if (opts.delay) {
      opts.delay = +opts.delay * 1000; // delay must be a number
    }

    exampleBull.add({ title: req.query.title }, opts);
    exampleBullMq.add('Add', { title: req.query.title }, opts);

    res.json({
      ok: true,
    });
  });

  const serverAdapter: any = new ExpressAdapter();
  serverAdapter.setBasePath('/ui');

  createBullBoard({
    queues: [
      new BullMQAdapter(exampleBullMq),
      new BullMQAdapter(exampleBullMq2),
      new BullMQAdapter(exampleBullMq3),
      new BullMQAdapter(exampleBullMq4),
      new BullMQAdapter(exampleBullMq5),
      new BullMQAdapter(exampleBullMq6),
      new BullMQAdapter(exampleBullMq7),
      new BullMQAdapter(exampleBullMq8),
      new BullMQAdapter(exampleBullMq9),
      new BullAdapter(exampleBull),
    ],
    serverAdapter,
  });

  app.use('/ui', serverAdapter.getRouter());

  app.listen(3000, () => {
    console.log('Running on 3000...');
    console.log('For the UI, open http://localhost:3000/ui');
    console.log('Make sure Redis is running on port 6379 by default');
    console.log('To populate the queue, run:');
    console.log('  curl http://localhost:3000/add?title=Example');
    console.log('To populate the queue with custom options (opts), run:');
    console.log('  curl http://localhost:3000/add?title=Test&opts[delay]=10');
  });
};

run().catch((e) => console.error(e));
