import { useState, useEffect, useRef } from 'react';

import { twMerge } from 'tailwind-merge';
import BDInfoHome from './BDInfoHome';
import BDFreeBoard from './BDFreeBoard';
import BDInfoBoard from './BDInfoBoard';
import BDQna from './BDQna';

const BDInfo: React.FC = () => {
  const [placeTopNavBtn, setPlaceTopNavBtn] = useState(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);

  const placeNavMenu = [
    { name: '홈', component: <BDInfoHome /> },
    { name: '자유게시판', component: <BDFreeBoard /> },
    { name: '애개육아상식', component: <BDInfoBoard /> },
    { name: '애개IN', component: <BDQna /> },
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
      <div className='sticky top-0 z-10 flex h-[48px] w-[400px] items-center justify-center bg-[#ffffff] text-center text-[14px] text-nav'>
        {placeNavMenu.map((item, index) => (
          <button
            key={item.name}
            ref={(el) => (buttonRefs.current[index] = el)}
            className={twMerge(
              'relative flex h-[48px] w-[100px] items-center justify-center transition-colors duration-200',
              index === 0 && 'w-[60px]',
              placeTopNavBtn === index
                ? 'font-bold text-[#f78222]'
                : 'font-normal text-[#B1B1B1]'
            )}
            onClick={() => handleClick(index)}
          >
            <span>{item.name}</span>
          </button>
        ))}
        <span
          ref={indicatorRef}
          className={twMerge(
            'absolute bottom-0 h-[5px] bg-primary text-primary transition-all duration-300',
            'rounded-t-lg'
          )}
        />
      </div>
      <div>{placeNavMenu[placeTopNavBtn].component}</div>
    </div>
  );
};

export default BDInfo;
