const GoogleLogin = () => {
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
		response_type=code
		&scope=email
		&client_id=${import.meta.env.VITE_REACT_APP_GOOGLE_AUTH_CLIENT_ID}
		&redirect_uri=${import.meta.env.VITE_REACT_APP_REDIRECT_URI}
		&state=google`;
};

export default GoogleLogin;
