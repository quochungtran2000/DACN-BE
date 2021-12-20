import createPost from './createPost';
import deletePost from './deletePost';
import updatePost from './updatePost';
import getPost from './getPost';
import getPosts from './getPosts';
import getCountPostLastSevenDays from './getCountPostLastSevenDays';

export const PostController = {
  getCountPostLastSevenDays: getCountPostLastSevenDays,
  createPost: createPost,
  updatePost: updatePost,
  deletePost: deletePost,
  getPosts: getPosts,
  getPost: getPost,
};
