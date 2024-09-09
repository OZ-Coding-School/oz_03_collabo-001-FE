import DetailRating from './DetailRating';
import BookmarkButton from '../../components/BookmarkButton';

interface ShopSimpleDataProps {
  placeId: number;
  name: string;
  address: string;
  rating: number;
  is_bookmarked: boolean;
  storeImage: string;
}

const ShopSimpleData: React.FC<ShopSimpleDataProps> = ({
  placeId,
  name,
  address,
  rating,
  storeImage,
}) => {
  return (
    <div className='flex w-[100%] items-center gap-3 bg-[white] px-[12px] py-[3.5px]'>
      <img
        className='h-[45px] w-[45px] overflow-hidden rounded-full'
        src={storeImage}
        alt='장소 사진'
      />
      <div
        className='flex flex-col items-start justify-center gap-1 bg-[white] py-[10px]'
        style={{ width: 'calc(100% - 57px)' }}
      >
        <div className='flex w-[100%] items-center justify-between text-[1rem] font-bold'>
          <p>{name}</p>
          <BookmarkButton placeId={placeId} />
        </div>
        <p className='text-[0.75rem]'>{address}</p>
        <DetailRating initialRating={rating} />
      </div>
    </div>
  );
};

export default ShopSimpleData;
