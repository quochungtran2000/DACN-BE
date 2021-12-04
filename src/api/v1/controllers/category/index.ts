import { createCategory } from './createCategory';
import deleteCategory from './deleteCategory';
import getCategories from './getCategories';
import { getCategory } from './getCategory';
import { updateCategory } from './updateCategory';

export const categoryController = {
  getCategory: getCategory,
  getCategories: getCategories,
  createCategory: createCategory,
  updateCategory: updateCategory,
  deleteCategory: deleteCategory,
};
