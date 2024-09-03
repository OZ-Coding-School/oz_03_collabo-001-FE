import DetailRating from './DetailRating';
// import placeview from '../../assets/Icon/Detail_Icon/placeview.svg';

interface ShopSimpleDataProps {
  name: string;
  address: string;
  rating: number;
  storeImage: string;
}

const ShopSimpleData: React.FC<ShopSimpleDataProps> = ({
  name,
  address,
  rating,
  storeImage,
}) => {
  return (
    <div className='flex items-center bg-[white] py-[3.5px]'>
      <div className='flex w-[400px] items-center'>
        <div className='ml-[12px] h-[40px] w-[40px] overflow-hidden rounded-full'>
          <img className='h-full w-full' src={storeImage} alt='장소 사진' />
        </div>
        <div className='ml-[12px] w-[324px] flex-col items-center space-y-[5px] bg-[white] py-[10px] pr-[12px]'>
          <div className='text-[1rem] font-bold'>{name}</div>
          <div className='text-[0.75rem]'>{address}</div>
          <DetailRating initialRating={rating} />
        </div>
      </div>
    </div>
  );
};

export default ShopSimpleData;
