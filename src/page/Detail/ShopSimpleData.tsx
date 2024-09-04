import DetailRating from './DetailRating';
import BookmarkButton from '../../components/BookmarkButton';
// import placeview from '../../assets/Icon/Detail_Icon/placeview.svg';

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
  is_bookmarked,
  storeImage,
}) => {
  return (
    <div className='flex items-center bg-[white] py-[3.5px]'>
      <div className='flex w-[400px] items-center'>
        <div className='ml-[12px] h-[40px] w-[40px] overflow-hidden rounded-full'>
          <img className='h-full w-full' src={storeImage} alt='장소 사진' />
        </div>
        <div className='ml-[12px] w-[324px] flex-col items-center space-y-[5px] bg-[white] py-[10px] pr-[12px]'>
          <div className='flex items-center justify-between text-[1rem] font-bold'>
            {name}
            <BookmarkButton placeId={placeId} isBookmarked={is_bookmarked} />
          </div>
          <div className='text-[0.75rem]'>{address}</div>
          <DetailRating initialRating={rating} />
        </div>
      </div>
    </div>
  );
};

export default ShopSimpleData;
