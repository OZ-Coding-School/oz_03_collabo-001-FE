import React, { useRef } from 'react';
import parkingIcon from '../../assets/Icon/Detail_Icon/Parking.svg';
import wifi from '../../assets/Icon/Detail_Icon/Wifi.svg';
import babyBottle from '../../assets/Icon/Detail_Icon/Baby_Bottle.svg';
import diaper from '../../assets/Icon/Detail_Icon/Diaper.svg';
import babyChair from '../../assets/Icon/Detail_Icon/Baby_Chair.svg';
import withPet from '../../assets/Icon/Detail_Icon/With_Pet.svg';

const ShopInfoData: React.FC = () => {
  const buttonRefs = useRef<HTMLDivElement[]>([]);
  const PlaceInfoMenu = [
    { icon: parkingIcon, name: '주차가능' },
    { icon: wifi, name: '와이파이' },
    { icon: babyBottle, name: '수유실' },
    { icon: diaper, name: '기저귀교환대' },
    { icon: babyChair, name: '아기의자' },
    { icon: withPet, name: '반려동물동반' },
  ];
  return (
    <div className='bg-white h-[60px] py-[7px]'>
      <div className='bg-white relative flex h-[46px] w-[400px] items-center justify-between text-center text-[14px] text-nav'>
        {PlaceInfoMenu.map((item, index) => (
          <div
            key={item.name}
            ref={(el) => (buttonRefs.current[index] = el as HTMLImageElement)}
            className='flex w-[66px] flex-col items-center p-[4px]'
          >
            {item.icon && (
              <img
                src={item.icon}
                alt={item.name}
                className='color-[#333333] h-6 w-6'
              />
            )}
            <span className='text-[10px] text-[#333333]'>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopInfoData;
