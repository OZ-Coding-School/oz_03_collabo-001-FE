import share from '../assets/share.svg';

const ShareBtn = () => {
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
      }
    } else {
      alert('이 브라우저는 Web Share API를 지원하지 않습니다.');
    }
  };

  return (
    <button aria-label='공유하기' onClick={handleShare}>
      <img src={share} alt='' />
    </button>
  );
};

export default ShareBtn;
