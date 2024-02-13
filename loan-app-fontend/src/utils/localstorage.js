import {Api} from '../utils/api';
import {config} from '../utils/config';

export const token_key = config.secret_key;

export const setToken = token => {
  window.localStorage.setItem(token_key, token);
};

export const getToken = () => {
  let token = window.localStorage.getItem(token_key);
  if (!!token) return token;
  return false;
};

export const isLogin = () => {
  if (!!getToken()) {
    return true;
  }
  return false;
};

export const logout = async () => {
  const {data} = await Api.DeleteRequest(`/api/users/logout`);
  const user = JSON.parse(data);
  if(user?.data === true) {
    window.localStorage.clear();
  }
};