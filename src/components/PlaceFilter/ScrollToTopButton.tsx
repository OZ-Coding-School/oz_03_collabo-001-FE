import React from 'react';
import { RiArrowUpSLine } from 'react-icons/ri';

interface ScrollToTopButtonProps {
  scrollContainerRef: React.RefObject<HTMLElement>;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  scrollContainerRef,
}) => {
  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      console.log('전체 height:', scrollContainerRef.current.scrollHeight);
      console.log('보이는 height:', scrollContainerRef.current.clientHeight);

      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      console.log('scrollTo called');
    } else {
      console.log('Scroll container not found');
    }
  };

  return (
    <button
      onClick={scrollToTop}
      className='z-60 fixed bottom-[25px] right-2 rounded-full border border-caption bg-white p-3 shadow-lg transition-opacity ease-in-out'
      aria-label='Scroll to top'
    >
      <RiArrowUpSLine size={24} />
    </button>
  );
};

export default ScrollToTopButton;
