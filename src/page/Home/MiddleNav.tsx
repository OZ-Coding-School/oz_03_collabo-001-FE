import baby from '../../assets/Icon/Nav_Middle/Baby.svg';
import dog from '../../assets/Icon/Nav_Middle/Dog.svg';
import bdplace from '../../assets/Icon/Nav_Middle/BdPlace.svg';
import story from '../../assets/Icon/Nav_Middle/Story.svg';

const MiddleNav = () => {
  return (
    <div className='card'>
      <div className='flex h-[60px] w-[400px] items-center justify-between bg-[#ffffff] py-[10px]'>
        <div className='flex w-[100px] flex-col items-center border-r-[0.5px] border-border'>
          <img src={baby} alt='육아정보 아이콘' />
          <p className='text-[10px]'>육아정보</p>
        </div>
        <div className='flex w-[100px] flex-col items-center border-r-[0.5px] border-border'>
          <img src={dog} alt='애견정보 아이콘' />
          <p className='text-[10px]'>애견정보</p>
        </div>
        <div className='flex w-[100px] flex-col items-center border-r-[0.5px] border-border'>
          <img src={bdplace} alt='애개플레이스 아이콘' />
          <p className='text-[10px]'>애개플레이스</p>
        </div>
        <div className='flex w-[100px] flex-col items-center'>
          <img src={story} alt='애개스토리 아이콘' />
          <p className='text-[10px]'>애개스토리</p>
        </div>
      </div>
    </div>
  );
};

export default MiddleNav;
