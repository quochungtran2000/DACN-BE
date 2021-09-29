import express, { Application } from 'express';
import { swaggerMiddleware } from './middleware/swaggerStats';
import bodyParser from 'body-parser';
// import { errorHandler, notFoundError } from './middleware/errorHandler';
import { initialRouter } from './route';
import { createConnection } from 'typeorm';
import { dbConfig } from './utils/dbConfig';
const app: Application = express();

const PORT = 1234;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(swaggerMiddleware);

initialRouter(app);
// app.use(notFoundError);
// app.use(errorHandler);

createConnection(dbConfig)
  .then((db) => {
    app.listen(PORT, () =>
      console.log(`App listenning on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.log('Unable to connect to db', err);
  });
