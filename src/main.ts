import dotenv from 'dotenv';
dotenv.config();
import applyMiddleWare from './config/applyMiddleWare';
import { initialRouterVersion1 } from './api/v1/routes';
import express, { Application } from 'express';
import { dbConfig } from './config/dbConfig';
import { createConnection } from 'typeorm';
import { PORT } from './config/constant';

const app: Application = express();

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
