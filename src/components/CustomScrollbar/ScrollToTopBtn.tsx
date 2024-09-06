/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoChevronUp } from 'react-icons/go';

interface scrollToPosition {
  scrollbarRef: any;
}

const ScrollToTopBtn: React.FC<scrollToPosition> = ({ scrollbarRef }) => {
  const scrollToPosition = () => {
    if (scrollbarRef.current) {
      scrollbarRef.current.view.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <button
      aria-label='맨위로 스크롤 이동'
      style={{ right: 'calc(50% - 170px)' }}
      className='fixed bottom-[25px] flex h-[38px] w-[38px] items-center justify-center rounded-full border border-border bg-white'
      onClick={scrollToPosition}
    >
      <GoChevronUp />
    </button>
  );
};

export default ScrollToTopBtn;
