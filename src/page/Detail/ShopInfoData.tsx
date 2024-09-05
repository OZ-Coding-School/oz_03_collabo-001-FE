import React, { useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
// import parkingIcon from '../../assets/Icon/Detail_Icon/Parking.svg';
// import wifi from '../../assets/Icon/Detail_Icon/Wifi.svg';
// import babyBottle from '../../assets/Icon/Detail_Icon/Baby_Bottle.svg';
// import diaper from '../../assets/Icon/Detail_Icon/Diaper.svg';
// import babyChair from '../../assets/Icon/Detail_Icon/Baby_Chair.svg';
// import withPet from '../../assets/Icon/Detail_Icon/With_Pet.svg';

interface ServiceIcon {
  image: string;
  name: string;
}

interface ShopInfoDataProps {
  placeInfoMenu: ServiceIcon[];
}

const ShopInfoData: React.FC<ShopInfoDataProps> = ({ placeInfoMenu }) => {
  const buttonRefs = useRef<HTMLDivElement[]>([]);
  // const placeInfoMenu = [
  //   { image: parkingIcon, name: '주차가능' },
  //   { image: wifi, name: '와이파이' },
  //   { image: babyBottle, name: '수유실' },
  //   { image: diaper, name: '기저귀교환대' },
  //   { image: babyChair, name: '아기의자' },
  //   { image: withPet, name: '반려동물동반' },
  //   { image: withPet, name: '반려동물동반' },
  //   { image: withPet, name: '반려동물동반' },
  //   { image: withPet, name: '반려동물동반' },
  //   { image: withPet, name: '반려동물동반' },
  // ];

  // console.log(placeInfoMenu);

  return (
    <div className='h-[60px] overflow-x-auto overflow-y-hidden bg-white'>
      <Scrollbars style={{ width: '100%', height: '100%' }} autoHide>
        <div className='relative flex h-full items-center bg-white text-center text-[14px] text-nav'>
          {placeInfoMenu.map((item, index) => (
            <div
              key={item.name}
              ref={(el) => (buttonRefs.current[index] = el as HTMLImageElement)}
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
    </div>
  );
};

export default ShopInfoData;
