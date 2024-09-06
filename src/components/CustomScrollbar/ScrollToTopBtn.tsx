/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { GoChevronUp } from 'react-icons/go';

interface ScrollToPosition {
  scrollbarRef: React.RefObject<any>;
}

const ScrollToTopBtn: React.FC<ScrollToPosition> = ({ scrollbarRef }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollbarRef.current) {
        const isScrollable =
          scrollbarRef.current.getScrollHeight() >
          scrollbarRef.current.getClientHeight();
        setShowButton(isScrollable);
      }
    };

    handleScroll();
  }, [scrollbarRef]);

  const scrollToPosition = () => {
    if (scrollbarRef.current) {
      scrollbarRef.current.view.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  if (!showButton) return null;

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
