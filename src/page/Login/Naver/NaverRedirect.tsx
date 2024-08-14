import axios from 'axios';

const NaverRedirect = () => {
  const params = new URLSearchParams(location.search);
  const authorizationCode = params.get('code');

  if (authorizationCode) {
    console.log('인가 코드 있음!');
    const tokenEndpoint = 'https://nid.naver.com/oauth2.0/token';
    const data = {
      code: authorizationCode,
      client_id: import.meta.env.VITE_REACT_APP_NAVER_CLIENT_ID,
      client_secret: import.meta.env.VITE_REACT_APP_NAVER_CLIENT_SECRET_ID,
      redirect_uri: import.meta.env.VITE_REACT_APP_NAVER_REDIRECT_URI,
      grant_type: 'authorization_code',
    };

    axios
      .post(tokenEndpoint, data)
      .then((response) => {
        console.log(response);
        if (response) {
          const accessToken = response.data.access_token;

          axios
            .get('https://openapi.naver.com/v1/nid/me', {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then((response) => {
              console.log(response);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

export default NaverRedirect;
