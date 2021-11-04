import { Application, Router } from 'express';
import { isProduction } from '../../../config/constant';
import { redirectToDashboard } from '../controllers';
const router = Router();

export const initialRouterVersion1 = (app: Application) => {
  router.get('/dashboard', redirectToDashboard);

  router.get('/', (req, res) => {
    res.send(
      `Welcome to doan chuyen nganh api ${isProduction ? 'production' : 'dev'}`
    );
  });

  return app.use(`/api/v1`, router);
};
