import { useState, useEffect, useRef } from 'react';
import PlaceHome from '../../page/PlaceHome/PlaceHome';

const PlaceTopNav: React.FC = () => {
  const [placeTopNavBtn, setPlaceTopNavBtn] = useState(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);

  const placeNavMenu = [
    { name: '애개플레이스', component: <PlaceHome current={'BD'} /> },
    { name: '펫존', component: <PlaceHome current={'pet'} /> },
    { name: '키즈존', component: <PlaceHome current={'kid'} /> },
    // ex: 컴포넌트 연결시 이렇게 사용 { name: '애개플레이스', component: <MiddleNav /> },
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

  const handleClick = (index: number) => {
    setPlaceTopNavBtn(index);
  };

  return (
    <div>
      <div className='relative flex h-[48px] w-[400px] items-center justify-between bg-[#ffffff] text-center text-[14px] text-nav'>
        {placeNavMenu.map((item, index) => (
          <button
            key={item.name}
            ref={(el) => (buttonRefs.current[index] = el)}
            className='relative flex h-[48px] w-[133.33px] items-center justify-center'
            onClick={() => handleClick(index)}
            style={{
              fontWeight: placeTopNavBtn === index ? 'bold' : 'normal',
              color: placeTopNavBtn === index ? '#f78222' : '#B1B1B1',
              transition: 'color 0.2s ease-in-out',
            }}
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
      {/* 여기에 선택된 메뉴를 표시하는 부분을 추가 */}
      <div>{placeNavMenu[placeTopNavBtn].component}</div>
    </div>
  );
};

export default PlaceTopNav;
