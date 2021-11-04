import { Application, Router } from 'express';
import { isProduction } from '../../../config/constant';
import {
  AuthController,
  redirectToDashboard,
  UserController,
} from '../controllers';
const router = Router();

export const initialRouterVersion1 = (app: Application) => {
  router.get('/dashboard', redirectToDashboard);

  router.get('/', (req, res) => {
    res.send(
      `Welcome to doan chuyen nganh api ${isProduction ? 'production' : 'dev'}`
    );
  });

  //user route
  router.post('/register', AuthController.register);
  router.post('/login', AuthController.login);
  router.get('/me', UserController.me);

  return app.use(`/api/v1`, router);
};
