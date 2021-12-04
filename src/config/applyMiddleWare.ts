// import bodyParser from 'body-parser';
import Express, { Application } from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import fs from 'fs';
import { swaggerMiddleware } from '../api/v1/middlewares/swaggerStats';
import { isProduction } from './constant';
import auth from '../api/v1/middlewares/auth.middleware';

const applyMiddleWare = (app: Application) => {
  app.use(Express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(Express.json());
  app.use(swaggerMiddleware);
  app.use(auth);
  app.use((req, res, next) => {
    const ip = req.ip;
    const date = new Date().toLocaleString();
    const method = req.method;
    const path = req?.path?.replace('/api/v1', '');
    const query = req?.query || {};
    const params = req?.params || {};
    const body = req?.body || {};

    const log = {
      params,
      query,
      body,
    };
    console.log(`${date} -> ${ip} [${method}] ${path} ${JSON.stringify(log)} `);

    next();
  });

  // if (!isProduction) {
  //   app.use(morgan('dev'));
  // }

  if (isProduction) {
    var accessLogStream = fs.createWriteStream(
      path.join(process.cwd(), './access.log'),
      {
        flags: 'a',
      }
    );

    app.use(morgan('common', { stream: accessLogStream }));
  }
};

export default applyMiddleWare;
