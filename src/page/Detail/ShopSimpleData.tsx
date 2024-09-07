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
      <div className='h-[44px] w-[44px] overflow-hidden rounded-full'>
        <img className='h-full w-full' src={storeImage} alt='장소 사진' />
      </div>
      <div className='w-[100%] flex-col items-center space-y-[5px] bg-[white] py-[10px]'>
        <div className='flex items-center justify-between text-[1rem] font-bold'>
          {name}
          <BookmarkButton placeId={placeId} />
        </div>
        <p className='text-[0.75rem]'>{address}</p>
        <DetailRating initialRating={rating} />
      </div>
    </div>
  );
};

export default ShopSimpleData;
