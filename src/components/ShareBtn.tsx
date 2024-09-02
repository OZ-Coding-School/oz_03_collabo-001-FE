import { toast } from 'react-toastify';
import share from '../assets/share.svg';

const ShareBtn: React.FC = () => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '애개플레이스',
          text: '공유할 텍스트',
          url: window.location.href,
        });
      } catch (error) {
        console.log('공유 실패 :', error);
        toast.error('링크 공유에 실패했습니다.', {
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
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('링크 복사에 성공했습니다.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } catch (error) {
        console.error('링크 복사 실패:', error);
        toast.error('링크 공유에 실패했습니다.', {
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
    }
  };

  return (
    <button aria-label='공유하기' onClick={handleShare}>
      <img src={share} alt='공유 아이콘' />
    </button>
  );
};

export default ShareBtn;
