import axios from 'axios';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// 액세스 토큰을 서버에서 검증하는 API 호출
export const Api = {
  // 토큰 검증 API 호출
  userTokenVerify: async () => {
    try {
      const response = await axios.post(
        'https://api.dogandbaby.co.kr/users/token/verify/',
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error('토큰 검증 오류 : ', error);
      throw error;
    }
  },

  // 토큰 갱신 API 호출
  userTokenRefresh: async () => {
    try {
      const response = await axios.post(
        'https://api.dogandbaby.co.kr/users/token/refresh/',
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error('토큰 갱신 오류 :', error);
      throw error;
    }
  },
};

const useVerify = () => {
  const nav = useNavigate();

  const checkLoginStatus = useCallback(async () => {
    try {
      await Api.userTokenVerify();
    } catch (error) {
      console.log('토큰 검증 실패. 재시도..');
      try {
        await Api.userTokenRefresh();
        await Api.userTokenVerify();
      } catch (error) {
        console.error('토큰 검증 및 갱신 실패 :', error);
        nav('/login', { replace: true });
      }
    }
  }, [nav]);

  return {
    checkLoginStatus,
  };
};

export default useVerify;
