import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post(
        'http://localhost:8000/users/logout/',
        {},
        { withCredentials: true }
      )
      .then((response) => {
        console.log('로그아웃 성공:', response);
        navigate('/login');
      })
      .catch((error) => {
        console.error('로그아웃 실패:', error);
      });
  };

  return (
    <button className='bg-white' onClick={handleLogout}>
      <p className='text-[10px] font-normal text-caption underline'>로그아웃</p>
    </button>
  );
};

export default Logout;
