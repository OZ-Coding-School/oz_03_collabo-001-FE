import { useNavigate } from 'react-router-dom';
import { GoChevronLeft } from 'react-icons/go';

const BackwardsHeader = ({ title }: { title?: string }) => {
  const navigate = useNavigate();
  const importantPaths = ['/', '/bdplacehome', '/bdinfo', '/bdmag'];

  const handleBackClick = () => {
    const referrerUrl = document.referrer;

    if (referrerUrl) {
      const url = new URL(referrerUrl);
      const cleanedUrl = `${url.origin}${url.pathname}`;

      // 도메인 및 경로 확인
      if (url.origin === 'https://dogandbaby.co.kr') {
        if (importantPaths.includes(url.pathname)) {
          navigate(url.pathname);
        } else {
          navigate(cleanedUrl);
        }
      } else {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  return (
    <div className='BackwardsHeader fixed top-0 z-50 flex h-[48px] w-[400px] items-center bg-[white] p-4 shadow'>
      <button onClick={handleBackClick} className='mr-[8px] font-extrabold'>
        <GoChevronLeft className='text-[24px] opacity-[70%]' />
      </button>
      <p>{title}</p>
    </div>
  );
};

export default BackwardsHeader;
