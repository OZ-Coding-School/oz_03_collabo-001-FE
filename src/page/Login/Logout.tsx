import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import { toast } from 'react-toastify';

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

      sessionStorage.removeItem('bookmarks');

      navigate('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      toast.error('로그아웃 실패', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  return (
    <button className='bg-white' onClick={handleLogout}>
      <p className='text-[10px] text-caption underline'>로그아웃</p>
    </button>
  );
};

export default Logout;
