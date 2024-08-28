import useModalWithURL from '../../hooks/useModalWithURL';
import DetailModal from '../modal/DetailModal';
import BookmarkButton from '../BookmarkButton';
import Location from '../../assets/Location.svg';
import Star from '../../assets/star.svg';
import useBookmarkStore from '../../store/bookmarkStore';
import { useMemo } from 'react';

interface PlaceItem {
  placeId: string;
  location: string;
  name: string;
  rating: number;
  reviewCount: number;
  isBookmarked: boolean; // 북마크 상태를 나타내는 필드
}

const PlaceItem: React.FC<PlaceItem> = ({
  placeId,
  location,
  name,
  rating,
  reviewCount,
}) => {
  const { isOpen, openSubModal, closeModal } = useModalWithURL(
    `detailModal_${placeId}`
  );

  const { bookmarks, toggleBookmark } = useBookmarkStore();

  // 현재 장소의 북마크 상태를 가져옵니다.
  const isBookmarked = useMemo(
    () => !!bookmarks[placeId],
    [bookmarks, placeId]
  );

  const handleBookmarkToggle = () => {
    // 장소 정보를 포함하여 북마크 토글
    toggleBookmark({ placeId, location, name, rating, reviewCount });
  };

  return (
    <>
      <div className='flex items-center border-b border-border bg-white p-[10px]'>
        <button onClick={openSubModal}>
          <div className='imgWrap h-[70px] w-[119px] rounded-lg bg-background'></div>
        </button>

        <div className='ml-[12px] grow p-[8px]'>
          <ul>
            <li className='relative mb-[4px] text-[14px] font-semibold'>
              <p>{`[${location}] ${name}`}</p>
              <div className='absolute right-0 top-0'>
                <BookmarkButton
                  placeId={placeId}
                  isBookmarked={isBookmarked}
                  onToggle={handleBookmarkToggle}
                />
              </div>
            </li>
            <li className='mb-[4px] flex'>
              <img src={Location} alt='' aria-hidden />
              <span className='ml-[4px] text-[12px] font-medium text-caption'>
                경기 고양시 덕양구 고양대로 1955
              </span>
            </li>
            <li className='flex'>
              <img src={Star} alt='별점' aria-hidden />
              <span aria-label='별점' className='ml-[4px] text-[12px]'>
                {rating.toFixed(1)}
              </span>
              <span
                aria-label='후기 갯수'
                className='ml-[4px] text-[12px] text-caption'
              >
                {reviewCount}
              </span>
            </li>
          </ul>
        </div>
      </div>
      {isOpen && <DetailModal closeModal={closeModal} />}
    </>
  );
};

export default PlaceItem;
