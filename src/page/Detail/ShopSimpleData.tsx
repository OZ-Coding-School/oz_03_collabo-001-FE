import DetailRating from './DetailRating';
import placeview from '../../assets/Icon/Detail_Icon/placeview.svg';
import BookmarkButton from '../../components/BookmarkButton';

interface ShopSimpleDataProps {
  placeId: string;
  name: string;
  address: string;
  rating: number;
}

const ShopSimpleData: React.FC<ShopSimpleDataProps> = ({
  placeId,
  name,
  address,
  rating,
}) => {
  return (
    <div className='flex items-center bg-[white] py-[3.5px]'>
      <div className='flex w-[400px] items-center'>
        <img
          className='ml-[12px] h-[40px] w-[40px]'
          src={placeview}
          alt='장소 사진'
        />
        <div className='ml-[12px] w-[324px] flex-col items-center space-y-[5px] bg-[white] py-[10px] pr-[12px]'>
          <div className='flex items-center justify-between text-[1rem] font-bold'>
            {name}
            <BookmarkButton placeId={placeId} />
          </div>
          <div className='text-[0.75rem]'>{address}</div>
          <DetailRating initialRating={rating} />
        </div>
      </div>
    </div>
  );
};

export default ShopSimpleData;
