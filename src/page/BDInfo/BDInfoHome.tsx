import InfoPost from '../../components/BDInfo/InfoPost';
import Banner from '../Home/Banner';
import more from '../../assets/More.svg';
import InfoCard from '../../components/BDInfo/InfoCard';

const BDInfoHome = () => {
  return (
    <div>
      <Banner />
      <div className='flex flex-col gap-[15px]'>
        <div className='bg-white p-3'>
          <div className='flex h-[35px] items-center justify-between'>
            <p className='text-base font-semibold'>
              애개육아정보<span className='text-primary'>실시간인기글</span>
            </p>
            <button type='button' aria-label={`실시간 인기글 더보기`}>
              <img src={more} alt='더보기 아이콘' aria-hidden />
            </button>
          </div>
          <div>
            <InfoPost />
            <InfoPost />
            <InfoPost />
            <InfoPost />
            <InfoPost />
          </div>
        </div>
        <div className='bg-white p-3'>
          <div className='flex h-[40px] items-center justify-between'>
            <p className='flex items-center gap-1 text-base font-semibold'>
              애개육아정보
              <span className='text-[8px] text-nav'>
                아이와 반려견을 키울때 필요한 모든정보가 여기 다!
              </span>
            </p>
            <button type='button' aria-label={`실시간 인기글 더보기`}>
              <img src={more} alt='더보기 아이콘' aria-hidden />
            </button>
          </div>
          <div className='grid grid-cols-2 grid-rows-2 gap-2'>
            <InfoCard />
            <InfoCard />
            <InfoCard />
            <InfoCard />
          </div>
        </div>
        <div className='bg-white p-3'>
          <div className='flex h-[35px] items-center justify-between'>
            <p className='text-base font-semibold'>
              애개In<span className='text-primary'>베스트</span>
            </p>
            <button type='button' aria-label={`애개IN 베스트 더보기`}>
              <img src={more} alt='더보기 아이콘' aria-hidden />
            </button>
          </div>
          <div>
            <InfoPost />
            <InfoPost />
            <InfoPost />
            <InfoPost />
            <InfoPost />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BDInfoHome;
