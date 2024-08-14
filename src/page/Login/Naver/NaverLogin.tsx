const NaverLogin = () => {
  // 구글 로그인 화면으로 이동시키기
  window.location.href = `https://nid.naver.com/oauth2.0/authorize?
		response_type=code
		&state=babydog
		&client_id=${import.meta.env.VITE_REACT_APP_NAVER_CLIENT_ID}
		&redirect_uri=${import.meta.env.VITE_REACT_APP_NAVER_REDIRECT_URI}`;
};

export default NaverLogin;
