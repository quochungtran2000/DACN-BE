import { Application, Router } from 'express';
import { isProduction } from '../../../config/constant';
import { AuthController, UserController, ping } from '../controllers';
const router = Router();

export const initialRouterVersion1 = (app: Application) => {
  router.get('/', (req, res) => {
    res.send(
      `Welcome to doan chuyen nganh api ${isProduction ? 'production' : 'dev'}`
    );
  });

  //user route
  router.post('/register', AuthController.register);
  router.post('/login', AuthController.login);
  router.get('/me', UserController.me);
  router.get('/ping', ping);

  //  Auth Router

  router.post('/auth/login', ping);
  router.post('/auth/register', ping);
  router.post('/auth/me', ping);

  // User router

  router.get('/user', ping);
  router.get('/user/:id', ping);
  router.put('/user/:id', ping);
  router.put('/user/:id/change-password', ping);
  router.delete('/user/:id', ping);

  //  Location Router

  router.get('/location/city', ping);
  router.get('/location/:cityId/district', ping);
  router.get('/location/:cityId/:districtId/ward', ping);

  // Post Router

  router.get('/post', ping);
  router.get('/post/:id', ping);
  router.put('/post/:id', ping);
  router.delete('/post/:id', ping);

  // Post Comment Router

  router.get('/post/:id/comment', ping);
  router.post('/post/:id/comment', ping);
  router.get('/post/:id/comment/:commentId', ping);
  router.put('/post/:id/comment/:commentId', ping);
  router.delete('/post/:id/comment/:commentId', ping);

  // Like Action Router

  router.post('/post/:id/like', ping);

  // Carrer Router

  router.get('/career', ping);
  router.get('/career/:id', ping);
  router.post('/career', ping);
  router.put('/career/:id', ping);
  router.delete('/career/:id', ping);

  // Post Request Router

  router.get('/post-request', ping);
  router.get('/post-request/:id', ping);
  router.post('/post-request', ping);
  router.put('/post-request/:id', ping);
  router.delete('/post-request/:id', ping);

  return app.use(`/api/v1`, router);
};
