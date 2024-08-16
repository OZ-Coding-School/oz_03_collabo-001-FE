import DetailRating from './DetailRating';
import placeview from '../../assets/Icon/Detail_Icon/placeview.svg';

const ShopSimpleData: React.FC = () => {
  return (
    <div className='flex h-[102px] items-center bg-[white] py-[3.5px]'>
      <div className='flex h-[88px] w-[400px] items-center'>
        <img className='ml-[12px] h-[40px] w-[40px]' src={placeview} />
        <div className='ml-[12px] h-[88px] w-[324px] flex-col items-center space-y-[5px] bg-[white] py-[10px] pr-[12px]'>
          <div className='text-[1rem] font-bold'>마포오션플레이스</div>
          <div className='text-[0.75rem]'>
            경기도 고양시 일산동구 정발산동 145-4번지
          </div>
          <DetailRating initialRating={4} />
        </div>
      </div>
    </div>
  );
};

export default ShopSimpleData;
