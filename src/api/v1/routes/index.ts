import { Application, Router } from 'express';
import { redirectToDashboard } from '../controllers';
import { test } from '../controllers/user';
const router = Router();

export const initialRouterVersion1 = (app: Application) => {
  router.get('/dashboard', redirectToDashboard);

  router.get('/', (req, res) => {
    res.send('hello');
  });

  router.get('/user', test);

  return app.use(`/api/v1`, router);
};
