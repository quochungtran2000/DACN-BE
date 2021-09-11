import express, { Application, NextFunction } from 'express';
import { swaggerMiddleware } from './middleware/swaggerStats';
import bodyParser from 'body-parser';
import { errorHandler, notFoundError } from './middleware/errorHandler';
import routeMap from './route';
import { createConnection } from 'typeorm';
import { dbConfig } from './utils/dbConfig';
const app: Application = express();

const PORT = 1234;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(swaggerMiddleware);

app.use('/api/v1', routeMap);
app.get('/', (req, res) => {
  res.redirect('/api/v1');
});
app.use(notFoundError);
app.use(errorHandler);

createConnection(dbConfig)
  .then((db) => {
    app.listen(PORT, () =>
      console.log(`App listenning on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.log('Unable to connect to db', err);
  });
