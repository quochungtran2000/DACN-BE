import { FB_API, PAGE_ACCESS_TOKEN } from '../../../../../config/constant';
import { IUserProfile } from '../webhook.interface';
import axiosClient from './axiosClient';

const messageApi = {
  getAccountInfo: (sender_psid: string): Promise<IUserProfile> => {
    const url = `${FB_API}/${sender_psid}?fields=first_name,last_name,name,profile_pic&access_token=${PAGE_ACCESS_TOKEN} `;
    return axiosClient.get(url);
  },
};

export default messageApi;
