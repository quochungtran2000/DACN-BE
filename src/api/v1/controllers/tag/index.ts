import { createTag } from './createTag';
import { deleteTag } from './deleteTag';
import { getTag } from './getTag';
import { getTags } from './getTags';
import { updateTag } from './updateTag';

export const tagController = {
  getTags: getTags,
  getTag: getTag,
  createTag: createTag,
  updateTag: updateTag,
  deleteTag: deleteTag,
};
