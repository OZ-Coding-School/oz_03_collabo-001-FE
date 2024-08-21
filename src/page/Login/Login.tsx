/* eslint-disable tailwindcss/classnames-order */
import Kakao from '../../assets/Icon/SocialLogin/Kakao.svg';
import Naver from '../../assets/Icon/SocialLogin/Naver.svg';
import Google from '../../assets/Icon/SocialLogin/Google.svg';
import Main_Logo from '../../assets/Icon/Main/OR_Main_TextLogo.svg';
import handleGoogleLogin from './Google/GoogleLogin';
import handleKakaoLogin from './Kakao/KakaoLogin';
import handleNaverLogin from './Naver/NaverLogin';
// import NaverRedirect from './Naver/NaverRedirect';

const Login = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-start gap-[18px] bg-white'>
      <div className='mt-[18px] flex h-20 w-[100%] items-center px-3 text-left'>
        {'<'}
      </div>
      <div className='mb-[48px] mt-10'>
        <img src={Main_Logo} alt='메인 로고' className='h-[65px]' />
        <p className='text-center text-base font-medium'>
          내 아이와 반려견이 함께하는 라이프
        </p>
      </div>
      <button onClick={handleKakaoLogin}>
        <img src={Kakao} alt='카카오 로그인' />
      </button>
      <button onClick={handleNaverLogin}>
        <img src={Naver} alt='네이버 로그인' />
      </button>
      <button onClick={handleGoogleLogin} aria-label='구글 로그인'>
        <img src={Google} alt='구글 로그인' />
      </button>
    </div>
  );
};

export default Login;
