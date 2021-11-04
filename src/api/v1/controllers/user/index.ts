import changePassword from './changePassword';
import getPartner from './getPartner';
import getPartners from './getPartners';
import getPost from './getPost';
import getPostRequest from './getPostRequest';
import updatePartner from './updatePartner';

export const UserController = {
  getPartners: getPartners,
  getPartner: getPartner,
  changePassword: changePassword,
  updatePartner: updatePartner,
  getPost: getPost,
  getPostRequest: getPostRequest,
};
