# <img alt="@ay-bull-board" src="https://raw.githubusercontent.com/felixmosh/bull-board/master/packages/ui/src/static/images/logo.svg" width="35px" /> @ay-bull-board

Bull Dashboard is a UI built on top of [Bull](https://github.com/OptimalBits/bull) or [BullMQ](https://github.com/taskforcesh/bullmq) to help you visualize your queues and their jobs.
With this library you get a beautiful UI for visualizing what's happening with each job in your queues, their status and some actions that will enable you to get the job done.

<p align="center">
  <a href="https://www.npmjs.com/org/bull-board">
    <img alt="npm downloads" src="https://img.shields.io/npm/dw/bull-board">
  </a>
  <a href="https://github.com/vcapretz/bull-board/blob/master/LICENSE">
    <img alt="licence" src="https://img.shields.io/github/license/felixmosh/bull-board">
  </a>
  <img alt="open issues" src="https://img.shields.io/github/issues/felixmosh/bull-board"/>
<p>

![UI](https://raw.githubusercontent.com/felixmosh/bull-board/master/screenshots/shot.png)
![Fails](https://raw.githubusercontent.com/felixmosh/bull-board/master/screenshots/fails.png)

## Notes

As this library provides only the visualization for your queues, keep in mind that:

- You must have either [Bull](https://github.com/OptimalBits/bull) or [BullMQ](https://github.com/taskforcesh/bullmq) installed in your projects;
- Aside the options to retry and clean jobs, this library is not responsible for processing the jobs, reporting progress or any other thing. This must be done in your application with your own logic;
- If you want to understand the possibilities you have with the queues please refer to [Bull's docs](https://optimalbits.github.io/bull/) or [BullMQ's docs](https://docs.bullmq.io/);
- This library doesn't hijack Bull's way of working.

If you want to learn more about queues ([Bull](https://github.com/OptimalBits/bull) or [BullMQ](https://github.com/taskforcesh/bullmq)) and [Redis](https://redis.io/).

## Starting

To add it to your project start by installing a server framework specific adapter to your dependencies list:

```sh
yarn add @ay-bull-board/express
# or
yarn add @ay-bull-board/fastify
# or
yarn add @ay-bull-board/hapi
# or
yarn add @ay-bull-board/koa
```

Or

```sh
npm i @ay-bull-board/express
# or
npm i @ay-bull-board/fastify
# or
npm i @ay-bull-board/hapi
# or
npm i @ay-bull-board/koa
```

## Hello World

```js
const express = require('express');
const Queue = require('bull');
const QueueMQ = require('bullmq');
const { createBullBoard } = require('@ay-bull-board/api');
const { BullAdapter } = require('@ay-bull-board/api/bullAdapter');
const { BullMQAdapter } = require('@ay-bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@ay-bull-board/express');

const someQueue = new Queue('someQueueName');
const someOtherQueue = new Queue('someOtherQueueName');
const queueMQ = new QueueMQ('queueMQName');

const serverAdapter = new ExpressAdapter();

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullAdapter(someQueue), new BullAdapter(someOtherQueue), new BullMQAdapter(queueMQ)],
  serverAdapter: serverAdapter,
});

const app = express();

serverAdapter.setBasePath('/admin/queues');
app.use('/admin/queues', serverAdapter.getRouter());

// other configurations of your server
```

That's it! Now you can access the `/admin/queues` route, and you will be able to monitor everything that is happening in your queues 😁

For more advanced usages check the `examples` folder, currently it contains:

1. [Basic authentication example](https://github.com/felixmosh/bull-board/tree/master/examples/with-express-auth)
2. [Multiple instance of the board](https://github.com/felixmosh/bull-board/tree/master/examples/with-multiple-instances)
3. [With Fastify server](https://github.com/felixmosh/bull-board/tree/master/examples/with-fastify)
4. [With Hapi.js server](https://github.com/felixmosh/bull-board/tree/master/examples/with-hapi)
5. [With Koa.js server](https://github.com/felixmosh/bull-board/tree/master/examples/with-koa)

### Queue options

1. `readOnlyMode` (default: `false`)
   Makes the UI as read only, hides all queue & job related actions

```js
const Queue = require('bull');
const QueueMQ = require('bullmq');
const { createBullBoard } = require('@ay-bull-board/api');
const { BullMQAdapter } = require('@ay-bull-board/api/bullMQAdapter');
const { BullAdapter } = require('@ay-bull-board/api/bullAdapter');

const someQueue = new Queue();
const someOtherQueue = new Queue();
const queueMQ = new QueueMQ();

const { setQueues, replaceQueues } = createBullBoard({
  queues: [
    new BullAdapter(someQueue, { readOnlyMode: true }), // only this queue will be in read only mode
    new BullAdapter(someOtherQueue),
    new BullMQAdapter(queueMQ, { readOnlyMode: true }),
  ],
});
```

2. `allowRetries` (default: `true`)
   When set to `false` the UI removes the job retry buttons for a queue. This option will be ignored if `readOnlyMode` is `true`.

```js
const QueueMQ = require('bullmq')
const { createBullBoard } = require('@ay-bull-board/api')
const { BullMQAdapter } = require('@ay-bull-board/api/bullMQAdapter')
const { BullAdapter } = require('@ay-bull-board/api/bullAdapter')

const someQueue = new Queue()
const someOtherQueue = new Queue()
const queueMQ = new QueueMQ()

const { setQueues, replaceQueues } = createBullBoard({
  queues: [
    new BullAdapter(someQueue),
    new BullAdapter(someOtherQueue, , { allowRetries: false }), // No retry buttons
    new BullMQAdapter(queueMQ, { allowRetries: true, readOnlyMode: true }), // allowRetries will be ignored in this case in lieu of readOnlyMode
  ]
})
```

### Hosting router on a sub path

If you host your express service on a different path than root (/) ie. https://<server_name>/<sub_path>/, then you can add the following code to provide the configuration to the bull-board router. In this example the sub path will be `my-base-path`.

```js
const Queue = require('bull');
const { createBullBoard } = require('@ay-bull-board/api');
const { BullAdapter } = require('@ay-bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@ay-bull-board/express');

const someQueue = new Queue('someQueueName');

const serverAdapter = new ExpressAdapter();

createBullBoard({
  queues: [new BullAdapter(someQueue)],
  serverAdapter,
});

// ... express server configuration

const basePath = 'my-base-path';
serverAdapter.setBasePath(basePath);

app.use('/queues', serverAdapter.getRouter());
```

You will then find the bull-board UI at the following address `https://<server_name>/my-base-path/queues`.

## Contributing

First, thank you for being interested in helping out, your time is always appreciated in every way. 💯

Remember to read the [Code of Conduct](https://github.com/felixmosh/bull-board/blob/master/CODE_OF_CONDUCT.md) so you also help maintaining a good Open source community around this project!

Here are some tips:

- Check the [issues page](https://github.com/felixmosh/bull-board/issues) for already opened issues (or maybe even closed ones) that might already address your question/bug/feature request.
- When opening a bug report provide as much information as you can, some things might be useful for helping debugging and understading the problem
  - Node, Redis, Bull, BullMQ, bull-board versions
  - Sample code that reproduces the problem
  - Some of your environment details
  - Framework you're using (Express, Koa, Hapi, etc).
- Feature requests are welcomed! Provide some details on why it would be helpful for you and others, explain how you're using bull-board and if possible even some screenshots if you are willing to mock something!

## Developing

If you want to help us to solve the issues, be it a bug, a feature or a question, you might need to fork and clone this project.

To fork a project means you're going to have your own version of it under your own GitHub profile, you do it by clicking the "Fork" button on the top of any project's page on GitHub.

Cloning a project means downloading it to your local machine, you do it in the command line:

```sh
git clone git@github.com:YOUR_GITHUB_USERNAME/bull-board.git
```

That will create a `bull-board` folder inside the directory you executed the command, so you need to navigate inside it:

```sh
cd bull-board
```

_This project requires that you have [yarn](https://yarnpkg.com/lang/en/) installed_

Also make sure you are running Redis for this project (bull-board's example connects to Redis' default port `6379`).

Now, to try it out locally you can run:

```sh
yarn && yarn start:dev
```

### Acknowledgements ❤️

- [Juan](https://github.com/joaomilho) for building the first version of this library

# License

This project is licensed under the [MIT License](https://github.com/felixmosh/bull-board/blob/master/LICENSE), so it means it's completely free to use and copy, but if you do fork this project with nice additions that we could have here, remember to send a PR 👍
