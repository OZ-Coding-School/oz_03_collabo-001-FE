import image from '../../assets/Images/starfield.png';

const BDMagStoryItem = () => {
  return (
    <div className='flex flex-col gap-2 bg-white py-2'>
      <div className='flex items-center gap-2'>
        <img src={image} alt='' className='h-6 w-6 rounded-full' />
        <p className='text-[10px] font-semibold'>
          애개육아맘<span className='ml-1 text-[8px] text-nav'>2024.01.01</span>
        </p>
      </div>
      <div className='flex gap-2'>
        <img src={image} alt='' className='h-[70px] w-full rounded-md' />
        <img src={image} alt='' className='h-[70px] w-full rounded-md' />
        <img src={image} alt='' className='h-[70px] w-full rounded-md' />
      </div>
      <p className='text-[10px] font-semibold'>
        <span className='text-primary'>
          {'['}
          서울
          {'] '}
        </span>
        마포구 아이와 강아지와 함께가기 좋은 카페는 바로여기
      </p>
      <div className='flex gap-[6px]'>
        <div className='rounded-[5px] border border-border bg-background px-1.5 py-0.5'>
          <p className='text-[8px]'>1~3세</p>
        </div>
        <div className='rounded-[5px] border border-border bg-background px-1.5 py-0.5'>
          <p className='text-[8px]'>플레이스</p>
        </div>
        <div className='rounded-[5px] border border-border bg-background px-1.5 py-0.5'>
          <p className='text-[8px]'>대형견가능</p>
        </div>
        <div className='rounded-[5px] bg-primary px-1.5 py-0.5'>
          <p className='text-[8px] text-white'>핫플</p>
        </div>
      </div>
    </div>
  );
};

export default BDMagStoryItem;
