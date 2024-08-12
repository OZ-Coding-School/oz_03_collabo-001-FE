import axios from 'axios';

const GoogleRedirect = () => {
  const params = new URLSearchParams(location.search);
  const authorizationCode = params.get('code');

  if (authorizationCode) {
    console.log('인가 코드 있음!');
    const tokenEndpoint = 'https://accounts.google.com/o/oauth2/token';
    const data = {
      code: authorizationCode,
      client_id: import.meta.env.VITE_REACT_APP_GOOGLE_AUTH_CLIENT_ID,
      client_secret: import.meta.env.VITE_REACT_APP_GOOGLE_AUTH_REDIRECT_URI,
      redirect_uri: 'http://localhost:5173',
      grant_type: 'authorization_code',
    };

    axios
      .post(tokenEndpoint, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

export default GoogleRedirect;
