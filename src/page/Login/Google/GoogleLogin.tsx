const GoogleLogin = () => {
  // 구글 로그인 화면으로 이동시키기
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
		response_type=code
		&scope=email
		&client_id=${import.meta.env.VITE_REACT_APP_GOOGLE_AUTH_CLIENT_ID}
		&redirect_uri=${import.meta.env.VITE_REACT_APP_GOOGLE_AUTH_REDIRECT_URI}`;
};

export default GoogleLogin;
