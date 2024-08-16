import axios from 'axios';

const GoogleRedirect = () => {
  const params = new URLSearchParams(location.search);
  const authorizationCode = params.get('code');

  if (authorizationCode) {
    console.log('인가 코드 있음!');
    axios
      .post(
        'http://localhost:8000/accounts/google/login/callback/',
        { authorizationCode }, // authorizationCode를 객체로 감싸서 전송
        {
          withCredentials: true, // 쿠키 포함
          headers: {
            'Content-Type': 'application/json', // Content-Type 헤더 설정
          },
        }
      )
      .then((response) => {
        console.log('구글 로그인 성공');
        console.log(response.data); // 서버 응답 데이터 확인
      })
      .catch((error) => {
        console.error('구글 로그인 실패:', error);
        // 에러 처리 로직 추가
      });
    // const tokenEndpoint = 'https://oauth2.googleapis.com/token';
    // const data = {
    //   code: authorizationCode,
    //   client_id: import.meta.env.VITE_REACT_APP_GOOGLE_AUTH_CLIENT_ID,
    //   client_secret: import.meta.env
    //     .VITE_REACT_APP_GOOGLE_AUTH_CLIENT_SECRET_ID,
    //   redirect_uri: import.meta.env.VITE_REACT_APP_GOOGLE_AUTH_REDIRECT_URI,
    //   grant_type: 'authorization_code',
    // };

    // axios
    //   .post(tokenEndpoint, data)
    //   .then((response) => {
    //     console.log(response);
    //     if (response) {
    //       const accessToken = response.data.access_token;

    //       axios
    //         .get('https://www.googleapis.com/oauth2/v3/userinfo', {
    //           headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //           },
    //         })
    //         .then((response) => {
    //           console.log(response);
    //         });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
};

export default GoogleRedirect;
