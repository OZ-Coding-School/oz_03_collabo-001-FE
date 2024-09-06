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
        // 스크롤의 높이를 확인하여 버튼 표시 여부 결정
        const isScrollable =
          scrollbarRef.current.getScrollHeight() >
          scrollbarRef.current.getClientHeight();
        setShowButton(isScrollable);
      }
    };

    handleScroll(); // 컴포넌트가 처음 렌더링될 때 스크롤 여부를 확인합니다.
  }, [scrollbarRef]);

  const scrollToPosition = () => {
    if (scrollbarRef.current) {
      scrollbarRef.current.view.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  if (!showButton) return null; // 버튼이 필요 없는 경우 렌더링하지 않음

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
