import { Application, Router } from 'express';
import { redirectToDashboard } from '../controller';
import { test } from '../controller/user';
const router = Router();

export const initialRouter = (app: Application) => {
  router.get('/dashboard', redirectToDashboard);

  router.get('/ping');

  router.get('/user', test);

  return app.use(`/api/v1`, router);
};
