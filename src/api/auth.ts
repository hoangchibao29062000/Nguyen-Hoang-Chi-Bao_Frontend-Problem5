import { UserInfo } from 'models';
import { LoginFormInputs } from './../models/auth';
import { DataResponse } from './../models/common';
import axiosCallAPI from './axiosClient';

const authApi = {
  async signIn(body: LoginFormInputs): Promise<DataResponse<UserInfo>> {
    const url = '/auth/login';
    return axiosCallAPI.post(url, body);
  },
};

export default authApi;
