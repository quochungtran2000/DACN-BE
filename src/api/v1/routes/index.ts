import { Application, Router } from 'express';
import { redirectToDashboard } from '../controllers';
const router = Router();

export const initialRouterVersion1 = (app: Application) => {
  router.get('/dashboard', redirectToDashboard);

  router.get('/', (req, res) => {
    res.send('Welcome to doanchuyen nganh api');
  });

  return app.use(`/api/v1`, router);
};
