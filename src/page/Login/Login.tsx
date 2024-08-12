import Kakao from '../../assets/Icon/SocialLogin/Kakao.svg';
import Naver from '../../assets/Icon/SocialLogin/Naver.svg';
import Google from '../../assets/Icon/SocialLogin/Google.svg';
import Main_Logo from '../../assets/Icon/Main/OR_Main_TextLogo.svg';
import GoogleLogin from './Google/GoogleLogin';
import GoogleRedirect from './Google/GoogleRedirect';
import { useEffect } from 'react';
import KakaoLogin from './Kakao/KakaoLogin';

const Login = () => {
  useEffect(() => {
    GoogleRedirect();
  });

  return (
    <div className='flex flex-col items-center justify-center gap-[18px]'>
      <div className='mt-[18px] flex h-20 w-[100%] items-center px-3 text-left'>
        {'<'}
      </div>
      <div className='mb-[48px] mt-10'>
        <img src={Main_Logo} alt='메인 로고' className='h-[65px]' />
        <p className='text-center text-base font-medium'>
          내 아이와 반려견이 함께하는 라이프
        </p>
      </div>
      <button onClick={KakaoLogin}>
        <img src={Kakao} alt='카카오 로그인' />
      </button>
      <button>
        <img src={Naver} alt='네이버 로그인' />
      </button>
      <button onClick={GoogleLogin} aria-label='구글 로그인'>
        <img src={Google} alt='구글 로그인' />
      </button>
    </div>
  );
};

export default Login;
