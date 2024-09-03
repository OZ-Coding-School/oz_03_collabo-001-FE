/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
import useModalWithURL from '../../hooks/useModalWithURL';
import BookmarkButton from '../BookmarkButton';
import DetailModal from '../modal/DetailModal';
import { useEffect, useState } from 'react';

export interface RegionListType {
  id: string;
  region: string;
}

interface PlaceProps {
  placeId: string;
  store_image: string;
  location: string;
  name: string;
  rating: number;
  reviewCount: number;
  isBookmarked: boolean;
  regionList?: RegionListType[];
}

const Place: React.FC<PlaceProps> = ({
  placeId,
  store_image,
  location,
  name,
  rating,
  reviewCount,
  isBookmarked,
  regionList,
}) => {
  const [locationName, setLocationName] = useState<string>('');

  const { isOpen, openModal, closeModal } = useModalWithURL(
    `detailModal_${placeId}`
  );

  useEffect(() => {
    const foundItem = regionList?.find((item) => item.id === location);
    setLocationName(foundItem ? foundItem.region : '');
  }, [regionList, location]);

  const handlePlaceClick = () => {
    openModal();
  };

  return (
    <>
      <div className='relative flex h-[120px] w-[120px] cursor-pointer flex-col overflow-clip rounded-lg border-[1px] border-border bg-[white]'>
        <button onClick={handlePlaceClick}>
          <img
            src={store_image}
            alt=''
            className='h-[70px] w-[120px] object-cover'
          />
        </button>
        <div className='absolute right-1 top-1'>
          <BookmarkButton
            placeId={placeId}
            isBookmarkedInitially={isBookmarked}
          />
        </div>
        <div
          className='flex h-[50px] flex-col justify-between p-1.5'
          onClick={handlePlaceClick}
        >
          <p className='truncate text-nowrap text-[12px] font-semibold'>{`[${locationName}] ${name}`}</p>
          <p className='flex gap-1 text-[10px]'>
            <span className='text-primary'>★</span>
            <span>{rating.toFixed(1)}</span>
            <span className='text-caption'>{reviewCount}</span>
          </p>
        </div>
      </div>
      {isOpen && <DetailModal placeId={placeId} closeModal={closeModal} />}
    </>
  );
};

export default Place;
