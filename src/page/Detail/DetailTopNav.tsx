import { useState, useEffect, useRef, useCallback } from 'react';
import classNames from 'classnames';

interface DetailTopNavProps {
  contentScrollTop: number;
  reviewScrollTop: number;
  guideScrollTop: number;
  containerRef: React.RefObject<HTMLDivElement>;
  reviewCount: number;
}

const DetailTopNav: React.FC<DetailTopNavProps> = ({
  contentScrollTop,
  reviewScrollTop,
  guideScrollTop,
  containerRef,
  reviewCount,
}) => {
  const [placeTopNavBtn, setPlaceTopNavBtn] = useState<number>(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const [scrollOnClick, setScrollOnClick] = useState<boolean>(false);

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
    if (scrollOnClick && containerRef.current) {
      const scrollPositions = [
        contentScrollTop,
        reviewScrollTop,
        guideScrollTop,
      ];
      containerRef.current.scrollTo({
        top: scrollPositions[placeTopNavBtn],
        behavior: 'smooth',
      });
      setScrollOnClick(false);
    }
  }, [
    placeTopNavBtn,
    contentScrollTop,
    reviewScrollTop,
    guideScrollTop,
    scrollOnClick,
    containerRef,
  ]);

  const handleClick = (index: number) => {
    setPlaceTopNavBtn(index);
    setScrollOnClick(true);
  };

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      if (scrollTop >= contentScrollTop && scrollTop < reviewScrollTop) {
        setPlaceTopNavBtn(0);
      } else if (scrollTop >= reviewScrollTop && scrollTop < guideScrollTop) {
        setPlaceTopNavBtn(1);
      } else if (scrollTop >= guideScrollTop) {
        setPlaceTopNavBtn(2);
      }
    }
  }, [contentScrollTop, reviewScrollTop, guideScrollTop, containerRef]);

  useEffect(() => {
    const element = containerRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
      return () => {
        element.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll, containerRef]);

  return (
    <div className='sticky top-[0px] z-10 flex h-[48px] w-[400px] items-center justify-between bg-[#ffffff] text-center text-[14px] text-nav'>
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
