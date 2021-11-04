import bodyParser from 'body-parser';
import { Application } from 'express';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import { swaggerMiddleware } from '../api/v1/middlewares/swaggerStats';
import { isProduction } from './constant';

const applyMiddleWare = (app: Application) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(swaggerMiddleware);

  if (!isProduction) {
    app.use(morgan('dev'));
  }

  if (isProduction) {
    var accessLogStream = fs.createWriteStream(
      path.join(__dirname, './api/v1/access.log'),
      {
        flags: 'a',
      }
    );

    app.use(morgan('common', { stream: accessLogStream }));
  }
};

export default applyMiddleWare;
