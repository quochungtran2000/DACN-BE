import createPost from './createPost';
import deletePost from './deletePost';
import updatePost from './updatePost';
import getPost from './getPost';
import getPosts from './getPosts';

export const PostController = {
  createPost: createPost,
  updatePost: updatePost,
  deletePost: deletePost,
  getPosts: getPosts,
  getPost: getPost,
};
