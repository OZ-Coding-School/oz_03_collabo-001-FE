const KakaoLogin = () => {
  window.location.href = `https://kauth.kakao.com/oauth/authorize?
		response_type=code
		&client_id=${import.meta.env.VITE_REACT_APP_KAKAO_JS_KEY}
		&redirect_uri=${import.meta.env.VITE_REACT_APP_REDIRECT_URI}
		&state=kakao`;
};

export default KakaoLogin;
