// import bodyParser from 'body-parser';
import Express, { Application } from 'express';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import { swaggerMiddleware } from '../api/v1/middlewares/swaggerStats';
import { isProduction } from './constant';

const applyMiddleWare = (app: Application) => {
  app.use(Express.urlencoded({ extended: false }));
  app.use(Express.json());
  app.use(swaggerMiddleware);

  if (!isProduction) {
    app.use(morgan('dev'));
  }

  if (isProduction) {
    var accessLogStream = fs.createWriteStream(
      path.join(__dirname, 'access.log'),
      {
        flags: 'a',
      }
    );

    app.use(morgan('common', { stream: accessLogStream }));
  }
};

export default applyMiddleWare;
