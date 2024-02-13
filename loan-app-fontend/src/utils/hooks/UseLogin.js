import {useCallback, useEffect, useState} from 'react';
import {Api} from '../api';
import {logout} from '../localstorage';

function useLogin() {
  const [loginInfo, setLoginInfo] = useState({
    loading: true,
    isLogin: false,
  });
  const checkLogin = useCallback(async () => {
    const {statusCode, data} = await Api.getRequest(`/api/users/current`);
    const dataUser = JSON.parse(data);
    if (statusCode === 401 || statusCode === 500) {
      setLoginInfo({loading: false, isLogin: false});
    } else {
      setLoginInfo({loading: false, isLogin: true});
    }
  }, []);
  useEffect(() => {
    checkLogin();
  }, [checkLogin]);
  return {loginInfo};
}

export default useLogin;
