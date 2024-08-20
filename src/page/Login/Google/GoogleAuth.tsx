/* eslint-disable tailwindcss/classnames-order */
import axios from 'axios';
import { useEffect } from 'react';
import Kakao from '../../../assets/Icon/SocialLogin/Kakao.svg';
import Naver from '../../../assets/Icon/SocialLogin/Naver.svg';
import Google from '../../../assets/Icon/SocialLogin/Google.svg';
import Main_Logo from '../../../assets/Icon/Main/OR_Main_TextLogo.svg';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const GoogleAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search); // window.location 사용
    const code = params.get('code');

    if (!code) {
      navigate('/login', { replace: true });
      return;
    } else {
      console.log('인가 코드 확인');
      axios
        .post(
          'http://localhost:8000/users/google/login/callback/',
          { code },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.status === 200) {
            console.log('구글 로그인 성공', response);
            navigate('/');
          }
        })
        .catch((error) => {
          console.error('구글 로그인 실패:', error);

          toast.error('로그인 실패', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          navigate('/login', {
            state: { message: '구글 로그인 실패.' },
          });
        });
    }
  }, [navigate]);

  return (
    <div className='bg-white flex h-[calc(100vh-106px)] flex-col items-center justify-start gap-[18px] pt-[116px]'>
      <div className='mb-[48px] mt-10'>
        <img src={Main_Logo} alt='메인 로고' className='h-[65px]' />
        <p className='text-center text-base font-medium'>
          내 아이와 반려견이 함께하는 라이프
        </p>
      </div>
      <img src={Kakao} alt='카카오 로그인' />
      <img src={Naver} alt='네이버 로그인' />
      <img src={Google} alt='구글 로그인' />
    </div>
  );
};

export default GoogleAuth;
