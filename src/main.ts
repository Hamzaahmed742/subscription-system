import 'dotenv/config';
import 'reflect-metadata';

import { Logger } from '@nestjs/common';
import exitHook from 'async-exit-hook';

import { AppDispatcher } from './dispatcher';

const logger = new Logger('MainApp', true);

const dispatcher = new AppDispatcher();

dispatcher
  .dispatch()
  .then(() => logger.log('Everything up running'))
  .catch((e) => {
    logger.error(e.message, e.stack);
    process.exit(1);
  });

exitHook((callback) => {
  void dispatcher.shutdown().then(() => {
    logger.log('Graceful shutdown the server');
    callback();
  });
});
