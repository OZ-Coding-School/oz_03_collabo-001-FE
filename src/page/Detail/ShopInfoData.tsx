import React, { useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

interface ServiceIcon {
  image: string;
  name: string;
}

interface ShopInfoDataProps {
  placeInfoMenu: ServiceIcon[];
}

const ShopInfoData: React.FC<ShopInfoDataProps> = ({ placeInfoMenu }) => {
  const buttonRefs = useRef<HTMLDivElement[]>([]);

  return (
    <div className='h-[60px] overflow-x-auto overflow-y-hidden bg-white'>
      {placeInfoMenu.length > 0 ? (
        <Scrollbars style={{ width: '100%', height: '100%' }} autoHide>
          <div className='relative flex h-full items-center bg-white text-center text-[14px] text-nav'>
            {placeInfoMenu.map((item, index) => (
              <div
                key={item.name}
                ref={(el) =>
                  (buttonRefs.current[index] = el as HTMLImageElement)
                }
                className='flex w-[66px] flex-shrink-0 flex-col items-center p-[4px]'
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className='color-[#333333] h-6 w-6'
                  />
                )}
                <span className='text-[10px] text-[#333333]'>{item.name}</span>
              </div>
            ))}
          </div>
        </Scrollbars>
      ) : (
        <div className='py-2 text-center text-[14px] text-caption'>
          데이터를 가져오는데 실패하였습니다.
        </div>
      )}
    </div>
  );
};

export default ShopInfoData;
