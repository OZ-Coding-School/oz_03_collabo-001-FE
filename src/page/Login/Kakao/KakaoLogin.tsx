const KakaoLogin = () => {
  // 구글 로그인 화면으로 이동시키기
  window.location.href = `https://kauth.kakao.com/oauth/authorize?
		response_type=code
		&client_id=${import.meta.env.VITE_REACT_APP_KAKAO_API_KEY}
		&redirect_uri=${import.meta.env.VITE_REACT_APP_KAKAO_REDIRECT_URI}`;
};

export default KakaoLogin;
