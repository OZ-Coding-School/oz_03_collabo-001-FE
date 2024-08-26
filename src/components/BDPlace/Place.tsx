import React, { useState } from 'react';
import useModalWithURL from '../../hooks/useModalWithURL';
import BgBookMarkLine from '../../assets/Icon/BookMark/Bg_BookMark_Line.svg';
import BgBookMarkFill from '../../assets/Icon/BookMark/Bg_BookMark_Fill.svg';
import BgImage from '../../assets/images/starfield.png';
import DetailModal from '../modal/DetailModal';

interface PlaceProps {
  placeId: string; // 각 Place에 고유한 ID를 부여하여 모달 상태를 구분
}

const Place: React.FC<PlaceProps> = ({ placeId }) => {
  const { isOpen, openModal, closeModal } = useModalWithURL(
    `detailModal_${placeId}`
  );

  const [isBookMarked, setIsBookMarked] = useState<boolean>(false);

  const handleBoockMark = () => {
    setIsBookMarked(!isBookMarked);
  };

  return (
    <>
      <div className='relative h-[120px] w-[120px] overflow-clip rounded-lg border-[1px] border-border bg-[white]'>
        <button
          onClick={() => {
            openModal();
          }}
        >
          <img src={BgImage} alt='' className='h-3/5 w-full object-cover' />
        </button>
        <label className='absolute right-1 top-1'>
          <input type='checkbox' onClick={handleBoockMark} className='hidden' />
          <img
            src={isBookMarked ? BgBookMarkFill : BgBookMarkLine}
            alt={isBookMarked ? BgBookMarkFill : BgBookMarkLine}
            className='h-5'
          />
        </label>
        <div className='flex h-2/5 flex-col justify-between p-1.5'>
          <p className='truncate text-nowrap text-[12px] font-semibold'>{`[${'경기'}] ${'스타필드 고양'}`}</p>
          <p className='flex gap-1 text-[10px]'>
            <span className='text-primary'>★</span>
            <span>{'4.8'}</span>
            <span className='text-caption'>{`(${'3'})`}</span>
          </p>
        </div>
      </div>
      {isOpen && <DetailModal closeModal={closeModal} />}
    </>
  );
};

export default Place;
