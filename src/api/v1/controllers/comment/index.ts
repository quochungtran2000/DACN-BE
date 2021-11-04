import createComment from './createComment';
import deleteComment from './deleteComment';
import updateComment from './updateComment';
import getComment from './getComment';
import getComments from './getComments';

export const CommentController = {
  createComment: createComment,
  updateComment: updateComment,
  deleteComment: deleteComment,
  getComment: getComment,
  getComments: getComments,
};
