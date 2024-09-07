/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import useModalWithURL from '../../hooks/useModalWithURL';
import DetailModal from '../modal/DetailModal';
import BookmarkButton from '../BookmarkButton';
import Location from '../../assets/Location.svg';
import Star from '../../assets/star.svg';

interface PlaceItem {
  placeId: number;
  store_image: string;
  isBookmarked: boolean;
  locationName: string;
  name: string;
  address: string;
  rating: number;
  comments_count: number;
}

const PlaceItem: React.FC<PlaceItem> = ({
  placeId,
  store_image,
  locationName,
  name,
  address,
  rating,
  comments_count,
}) => {
  const { isOpen, openSubModal, closeModal } = useModalWithURL(
    `detailModal_${placeId}`
  );

  return (
    <>
      <div className='flex items-center justify-between border-b border-border bg-white p-[10px]'>
        <button onClick={openSubModal}>
          <div className='h-[70px] w-[120px]'>
            <img
              src={store_image}
              alt=''
              className='h-[100%] w-[100%] rounded-lg'
            />
          </div>
        </button>

        <ul className='flex w-[220px] flex-col gap-2 py-[8px]'>
          <li className='relative mb-[4px] flex justify-between truncate text-nowrap text-[14px] font-semibold'>
            <p className='w-[180px] truncate text-nowrap'>{`[${locationName}] ${name}`}</p>
            <div className='absolute right-0 top-0'>
              <BookmarkButton placeId={placeId} />
            </div>
          </li>
          <li className='flex items-center justify-start'>
            <img src={Location} alt='' aria-hidden />
            <span className='truncate text-nowrap text-[12px] font-medium text-caption'>
              {address}
            </span>
          </li>
          <li className='flex items-center justify-start'>
            <img src={Star} alt='별점' aria-hidden />
            <span aria-label='별점' className='ml-[4px] text-[12px]'>
              {(rating ?? 0).toFixed(1)}
            </span>
            <span
              aria-label='후기 갯수'
              className='ml-[4px] text-[12px] text-caption'
            >
              {comments_count}
            </span>
          </li>
        </ul>
      </div>
      {isOpen && <DetailModal closeModal={closeModal} placeId={placeId} />}
    </>
  );
};

export default PlaceItem;
