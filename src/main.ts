import applyMiddleWare from './config/applyMiddleWare';
import { initialRouterVersion1 } from './api/v1/routes';
import express, { Application } from 'express';
import { dbConfig } from './config/dbConfig';
import { createConnection } from 'typeorm';

const app: Application = express();

const PORT = 1234;

applyMiddleWare(app);
initialRouterVersion1(app);

createConnection(dbConfig)
  .then((db) => {
    app.listen(PORT, () =>
      console.log(`App listenning on http://localhost:${PORT}/api/v1`)
    );
  })
  .catch((err) => {
    console.log('Unable to connect to db', err);
  });
