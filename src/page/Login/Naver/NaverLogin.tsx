const NaverLogin = () => {
  window.location.href = `https://nid.naver.com/oauth2.0/authorize?
		response_type=code
		&client_id=${import.meta.env.VITE_REACT_APP_NAVER_CLIENT_ID}
		&redirect_uri=${import.meta.env.VITE_REACT_APP_REDIRECT_URI}
		&state=naver`;
};

export default NaverLogin;
