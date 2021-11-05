import { Application, Router } from 'express';
import { isProduction } from '../../../config/constant';
import {
  AuthController,
  CareerContronller,
  CommentController,
  LocationController,
  ping,
  PostController,
  PostRequestController,
  UserController,
} from '../controllers';
import webhookConntroller from '../controllers/webhook';
import { roleHr } from '../middlewares/roleHr.middleware';
const router = Router();

export const initialRouterVersion1 = (app: Application) => {
  router.get('/', (req, res) => {
    res.send(
      `<h3 style="text-align:center;margin-top:2rem;">API ĐỒ ÁN CHUYÊN NGÀNH MÔI TRƯỜNG <b>${
        isProduction ? 'PRODUCTION' : 'DEV'
      }</b></h3>
      <div style="text-align:center;"><a style="text-decoration: none;" href="/api/v1/dashboard">DashBoard</a></div>
      <hr/>
      <h3>Messenger Facebook Router</h3>
      <ul>
        <li><b style="margin-right:1rem;color:green">GET</b><b>/webhook</b> - <span>Facebook developer messenger flatform get webhook endpoint</span></li>
        <li><b style="margin-right:1rem;color:blue">POST</b><b>/webhook</b> - <span>Facebook developer messenger flatform listerner webhook endpoint</span></li>
      </ul>
      <hr/>
      <h3>Auth Router</h3>
      <ul>
        <li><b style="margin-right:1rem;color:blue">POST</b><b>/auth/login</b> - <span>Đăng nhập</span></li>
        <li><b style="margin-right:1rem;color:blue">POST</b><b>/auth/register</b> - <span>Đăng ký tài khoản</span></li>
        <li><b style="margin-right:1rem;color:blue">POST</b><b>/auth/forgot-password</b> - <span>Quên mật khẩu</span></li>
      </ul>
      <hr/>
      <h3>User Router</h3>
      <ul>
        <li><b style="margin-right:1rem;color:green">GET</b><b>/user</b> - <span>Lấy danh sách user</span></li>
        <li><b style="margin-right:1rem;color:green">GET</b><b>/user/:id</b> - <span>Cập nhật thông tin cá nhân</span></li>
        <li><b style="margin-right:1rem;color:orange">PUT</b><b>/user/:id</b> - <span>Cập nhật user</span></li>
        <li><b style="margin-right:1rem;color:orange">PUT</b><b>/user/:id/change-password</b> - <span>Đổi mật khẩu</span></li>
        <li><b style="margin-right:1rem;color:green">GET</b><b>/user/:userId/post</b> - <span>Lấy danh sách bài đăng của 1 user</span></li>
        <li><b style="margin-right:1rem;color:green">GET</b><b>/user/:userId/post-request</b> - <span>Lấy danh sách yêu cầu bài đăng của 1 user</span></li>
      </ul>
      <hr/>
      <h3>Location Router</h3>
      <ul>
        <li><b style="margin-right:1rem;color:green">GET</b><b>/location/city</b> - <span>Lấy danh sách thành phố</span></li>
        <li><b style="margin-right:1rem;color:green">GET</b><b>/location/:cityId/district</b> - <span>Lấy quận huyện của 1 thành phố</span></li>
        <li><b style="margin-right:1rem;color:green">GET</b><b>/location/:cityId/:districtId/ward</b> - <span>Lấy phường xã của 1 quận huyện</span></li>
      </ul>
      <hr/>      
      <h3>Post Router</h3>
      <ul>
        <li><b style="margin-right:1rem;color:green">GET</b><b>/post</b> - <span>Lấy danh sách bài đăng</span></li>
        <li><b style="margin-right:1rem;color:green">GET</b><b>/post/:id</b> - <span>Lấy danh chi tiết bài đăng</span></li>
        <li><b style="margin-right:1rem;color:blue">POST</b><b>/post/:id</b> - <span>Tạo bài đăng</span></li>
        <li><b style="margin-right:1rem;color:orange">PUT</b><b>/post/:id</b> - <span>Cập nhật bài đăng</span></li>
        <li><b style="margin-right:1rem;color:red">DELETE</b><b>/post/:id</b> - <span>Xóa bài đăng</span></li>
      </ul>
      <hr/>   
      <h3>Comment Router</h3>
      <ul>
        <li><b style="margin-right:1rem;color:green">GET</b><b>/post/:id/comment</b> - <span>Lấy danh bình luận của 1 bài đăng</span></li>
        <li><b style="margin-right:1rem;color:blue">POST</b><b>/post/:id/comment</b> - <span>Bình luận 1 bài đăng</span></li>
        <li><b style="margin-right:1rem;color:green">GET</b><b>/post/:id/comment/:commentId</b> - <span>Lấy chi tiết bình luận</span></li>
        <li><b style="margin-right:1rem;color:orange">PUT</b><b>/post/:id/comment/:commentId</b> - <span>Cập nhật bình luận</span></li>
        <li><b style="margin-right:1rem;color:red">DELETE</b><b>/post/:id/comment/:commentId</b> - <span>Xóa bình luận</span></li>
      </ul>
      <hr/>    
      <h3>Career Router</h3>
      <ul>
        <li><b style="margin-right:1rem;color:green">GET</b><b>/career</b> - <span>Lấy danh sách bài tuyển dụng</span></li>
        <li><b style="margin-right:1rem;color:blue">POST</b><b>/career</b> - <span>Tạo tuyển dụng</span></li>
        <li><b style="margin-right:1rem;color:green">GET</b><b>/career/:id</b> - <span>Lấy chi tiết bài tuyển dụng</span></li>
        <li><b style="margin-right:1rem;color:orange">PUT</b><b>/career/:id</b> - <span>Sửa tuyển dụng</span></li>
        <li><b style="margin-right:1rem;color:red">DELETE</b><b>/career/:id</b> - <span>Xóa bài tuyển dụng</span></li>
      </ul>
      <hr/>
      <h3>Post Request Router</h3>
      <ul>
        <li><b style="margin-right:1rem;color:green">GET</b><b>/post-request</b> - <span>Lấy danh sách yêu cầu bài đăng</span></li>
        <li><b style="margin-right:1rem;color:blue">POST</b><b>/post-request</b> - <span>Yêu cầu bài đăng</span></li>
        <li><b style="margin-right:1rem;color:green">GET</b><b>/post-request/:id</b> - <span>Lấy chi tiết yêu cầu bài đăng</span></li>
        <li><b style="margin-right:1rem;color:orange">PUT</b><b>/post-request/:id</b> - <span>Sửa yêu cầu bài đăng</span></li>
        <li><b style="margin-right:1rem;color:red">DELETE</b><b>/post-request/:id</b> - <span>Xóa yêu cầu bài đăng</span></li>
      </ul>
      `
    );
  });

  router.get('/ping', ping);

  //  Auth Router

  router.post('/auth/login', AuthController.login);
  router.post('/auth/register', AuthController.register);
  router.get('/auth/me', AuthController.me);
  router.post('/auth/forgot-password', AuthController.forgotPassword);

  // User router

  router.get('/user', UserController.getPartners);
  router.get('/user/:id', UserController.getPartner);
  router.put('/user/:id', UserController.updatePartner);
  router.put('/user/:id/change-password', UserController.changePassword);
  router.get('/user/:id/post', UserController.getPost);
  router.get('/user/:id/post-request', UserController.getPostRequest);
  // router.delete('/user/:id', UserController.);

  //  Location Router

  router.get('/location/city', LocationController.getCities);
  router.get('/location/:cityId/district', LocationController.getDistricts);
  router.get('/location/:cityId/:districtId/ward', LocationController.getWards);

  // Post Router

  router.get('/post', PostController.getPosts);
  router.get('/post/:id', PostController.getPost);
  router.post('/post/', PostController.createPost);
  router.put('/post/:id', PostController.updatePost);
  router.delete('/post/:id', PostController.deletePost);

  // Post Comment Router

  router.get('/post/:id/comment', CommentController.getComments);
  router.post('/post/:id/comment', CommentController.createComment);
  router.get('/post/:id/comment/:commentId', CommentController.getComment);
  router.put('/post/:id/comment/:commentId', CommentController.updateComment);
  router.delete(
    '/post/:id/comment/:commentId',
    CommentController.deleteComment
  );

  // Like Action Router

  router.post('/post/:id/like', ping);

  // Carrer Router

  router.get('/career', CareerContronller.getCareers);
  router.get('/career/:id', CareerContronller.getCareer);
  router.post('/career', CareerContronller.createCareer);
  router.put('/career/:id', CareerContronller.updateCareer);
  router.delete('/career/:id', CareerContronller.deleteCareer);

  // Post Request Router

  router.get('/post-request', PostRequestController.getPostRequests);
  router.get('/post-request/:id', PostRequestController.getPostRequest);
  router.post('/post-request', roleHr, PostRequestController.createPostRequest);
  router.put('/post-request/:id', PostRequestController.upadtePostRequest);
  router.delete('/post-request/:id', PostRequestController.deletePostRequest);

  // Webhook

  router.post('/message-profile', webhookConntroller.messageProfile);
  router.get('/webhook', webhookConntroller.getWebhook);
  router.post('/webhook', webhookConntroller.postWebhook);

  return app.use(`/api/v1`, router);
};
