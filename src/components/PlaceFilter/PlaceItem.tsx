import useModalWithURL from '../../hooks/useModalWithURL';
import DetailModal from '../modal/DetailModal';
import BookmarkButton from '../BookmarkButton';
import Location from '../../assets/Location.svg';
import Star from '../../assets/star.svg';

interface PlaceItem {
  placeId: string;
  location: string;
  name: string;
  rating: number;
  reviewCount: number;
  isBookmarked: boolean;
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
                <BookmarkButton placeId={placeId} />
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
      {isOpen && <DetailModal closeModal={closeModal} placeId={placeId} />}
    </>
  );
};

export default PlaceItem;
