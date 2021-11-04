import createPostRequest from './createPostRequest';
import deletePostRequest from './deletePostRequest';
import updatePostRequest from './updatePostRequest';
import getPostRequest from './getPostRequest';
import getPostRequests from './getPostRequests';

export const PostRequestController = {
  createPostRequest: createPostRequest,
  upadtePostRequest: updatePostRequest,
  deletePostRequest: deletePostRequest,
  getPostRequests: getPostRequests,
  getPostRequest: getPostRequest,
};
