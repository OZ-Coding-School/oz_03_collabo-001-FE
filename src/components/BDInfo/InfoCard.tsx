import BgImage from '../../assets/Images/starfield.png';

const InfoCard = () => {
  return (
    <div className='overflow-clip rounded-[5px] border border-border bg-[white]'>
      <img src={BgImage} alt='' className='h-2/3 w-full object-cover' />
      <div className='flex flex-col justify-between gap-1 p-2'>
        <p className='flex h-[12px] w-[32px] items-center justify-center bg-[#F6821F30] text-[7px] font-semibold text-primary'>
          애견상식
        </p>
        <p className='truncate text-xs font-bold'>
          {'찬바람 불 때 가기 좋은 카페'}
        </p>
        <p className='text-[8px] text-caption'>{'1시간전'}</p>
      </div>
    </div>
  );
};

export default InfoCard;
