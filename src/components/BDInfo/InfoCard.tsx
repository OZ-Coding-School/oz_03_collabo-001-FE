import BgImage from '../../assets/images/starfield.png';

const InfoCard = () => {
  return (
    <div className='h-[180px] overflow-clip rounded-[5px] border border-border bg-[white]'>
      <img src={BgImage} alt='' className='h-2/3 w-full object-cover' />
      <div className='flex flex-col justify-between p-2'>
        <p className='truncate text-[0.9rem] font-bold'>
          {'찬바람 불 때 가기 좋은 카페'}
        </p>
        <p className='text-[0.8rem] text-caption'>{'장소추천'}</p>
      </div>
    </div>
  );
};

export default InfoCard;
