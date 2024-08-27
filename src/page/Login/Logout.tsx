import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        'https://api.dogandbaby.co.kr/users/logout/',
        {},
        { withCredentials: true }
      );
      console.log('로그아웃 성공:', response);
      logout();
      navigate('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <button className='bg-white' onClick={handleLogout}>
      <p className='text-[10px] text-caption underline'>로그아웃</p>
    </button>
  );
};

export default Logout;
