import changePassword from './changePassword';
import deleteUser from './deleteUser';
import getJob from './getJob';
import getPartner from './getPartner';
import getPartnerCreateToday from './getPartnerCreateToday';
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
  getJob: getJob,
  getPostRequest: getPostRequest,
  getPartnerCreateToday: getPartnerCreateToday,
  deleteUser: deleteUser,
};
