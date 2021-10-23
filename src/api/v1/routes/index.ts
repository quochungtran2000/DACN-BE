import { Application, Router } from 'express';
import { redirectToDashboard } from '../controllers';
import { test } from '../controllers/user';
const router = Router();

export const initialRouter = (app: Application) => {
  router.get('/dashboard', redirectToDashboard);

  router.get('/ping');

  router.get('/user', test);

  return app.use(`/api/v1`, router);
};
