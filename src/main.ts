import express, { Application } from 'express';
import { swaggerMiddleware } from './api/v1/middlewares/swaggerStats';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';
import { initialRouter } from './api/v1/routes';
import { createConnection } from 'typeorm';
import { dbConfig } from './config/dbConfig';
import morgan from 'morgan';
import { isProduction } from './config/constant';
const app: Application = express();

const PORT = 1234;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(swaggerMiddleware);

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a',
});

if (!isProduction) {
  app.use(morgan('dev'));
}

if (isProduction) {
  app.use(morgan('common', { stream: accessLogStream }));
}

initialRouter(app);

createConnection(dbConfig)
  .then((db) => {
    app.listen(PORT, () =>
      console.log(`App listenning on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.log('Unable to connect to db', err);
  });
