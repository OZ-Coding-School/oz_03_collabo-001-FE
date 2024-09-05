import { useState, useEffect, useRef, useCallback } from 'react';
import classNames from 'classnames';

interface DetailTopNavProps {
  contentScrollTop: number;
  reviewScrollTop: number;
  guideScrollTop: number;
  containerRef: React.RefObject<HTMLDivElement>;
  reviewCount: number;
  scrollbarRef: any;
  currentScrollTop: number;
  navStartRefTop: number;
}

const DetailTopNav: React.FC<DetailTopNavProps> = ({
  contentScrollTop,
  reviewScrollTop,
  guideScrollTop,
  containerRef,
  reviewCount,
  scrollbarRef,
  currentScrollTop,
  navStartRefTop,
}) => {
  const [placeTopNavBtn, setPlaceTopNavBtn] = useState<number>(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const [scrollOnClick, setScrollOnClick] = useState<boolean>(false);
  const [isFixed, setIsFixed] = useState<boolean>(false);

  const placeNavMenu = [
    { name: '상세내용' },
    { name: `후기 (${reviewCount})` },
    { name: '이용안내' },
  ];

  useEffect(() => {
    const currentButton = buttonRefs.current[placeTopNavBtn];
    if (indicatorRef.current && currentButton) {
      const buttonTextWidth =
        currentButton.querySelector('span')?.offsetWidth ||
        currentButton.offsetWidth;
      indicatorRef.current.style.width = `${buttonTextWidth}px`;
      indicatorRef.current.style.left = `${currentButton.offsetLeft + (currentButton.offsetWidth - buttonTextWidth) / 2}px`;
      indicatorRef.current.style.backgroundColor = 'primary';
    }
  }, [placeTopNavBtn]);

  useEffect(() => {
    if (scrollOnClick && scrollbarRef.current) {
      const scrollPositions = [
        contentScrollTop,
        reviewScrollTop,
        guideScrollTop,
      ];
      scrollbarRef.current.view.scrollTo({
        top: scrollPositions[placeTopNavBtn],
        behavior: 'smooth',
      });
      setScrollOnClick(false); // Reset the flag after scrolling
    }
  }, [
    placeTopNavBtn,
    contentScrollTop,
    reviewScrollTop,
    guideScrollTop,
    scrollOnClick,
    scrollbarRef,
  ]);

  const handleClick = (index: number) => {
    setPlaceTopNavBtn(index);
    setScrollOnClick(true); // Set flag to trigger scrolling
  };

  // 스크롤 영역 감지
  const handleScroll = useCallback(() => {
    if (scrollbarRef.current) {
      const view = scrollbarRef.current.view;
      if (!view) return;

      const scrollHeight = view.scrollHeight;
      const clientHeight = view.clientHeight;
      const isAtBottom = currentScrollTop + clientHeight >= scrollHeight - 2; // 거의 맨 아래 도달시

      // 스크롤이 맨 아래일 때
      if (isAtBottom) {
        setPlaceTopNavBtn(2); // "이용안내" 버튼 활성화
        // console.log('이용안내');
      } else if (currentScrollTop >= reviewScrollTop - 50) {
        setPlaceTopNavBtn(1); // "후기" 버튼 활성화
        // console.log('후기');
      } else if (currentScrollTop < reviewScrollTop) {
        setPlaceTopNavBtn(0); // "상세내용" 버튼 활성화
        // console.log('상세내용');
      }

      // nav sticky 처리
      setIsFixed(currentScrollTop >= navStartRefTop);
    }
  }, [
    currentScrollTop,
    contentScrollTop,
    reviewScrollTop,
    guideScrollTop,
    navStartRefTop,
    scrollbarRef,
  ]);

  useEffect(() => {
    const currentScrollbar = scrollbarRef.current?.view;
    if (currentScrollbar) {
      currentScrollbar.addEventListener('scroll', handleScroll);
      return () => {
        currentScrollbar.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll, scrollbarRef]);

  return (
    // <div className='sticky top-[0px] z-10 flex h-[48px] w-[400px] items-center justify-between bg-[#ffffff] text-center text-[14px] text-nav'>
    <div
      className={classNames(
        'flex h-[48px] w-[400px] items-center justify-between bg-[#ffffff] text-center text-[14px] text-nav',
        {
          'fixed top-0 z-10': isFixed,
          relative: !isFixed,
        }
      )}
      style={{
        transition: 'position 0.3s ease',
      }}
    >
      {placeNavMenu.map((item, index) => (
        <button
          key={item.name}
          ref={(el) => (buttonRefs.current[index] = el)}
          className={classNames(
            'relative flex h-[48px] w-[133.33px] items-center justify-center transition-colors duration-200',
            placeTopNavBtn === index
              ? 'font-bold text-primary'
              : 'text-gray-600'
          )}
          onClick={() => handleClick(index)}
        >
          <span>{item.name}</span>
        </button>
      ))}
      <span
        ref={indicatorRef}
        className='absolute bottom-0 h-[5px] bg-primary text-primary transition-all duration-300'
        style={{
          borderTopLeftRadius: '0.5rem',
          borderTopRightRadius: '0.5rem',
        }}
      />
    </div>
  );
};

export default DetailTopNav;
