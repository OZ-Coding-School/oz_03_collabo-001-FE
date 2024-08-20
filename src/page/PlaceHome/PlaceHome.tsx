import Place from '../../components/BDPlace/Place';
import RecoPlace from '../../components/BDPlace/RecoPlace';
import RegionTab from '../../components/BDPlace/RegionTab';
import Banner from '../Home/Banner';

interface CurrentProps {
  current: string;
}

const BDPlaceHome: React.FC<CurrentProps> = ({ current }) => {
  return (
    <>
      <Banner />
      <RecoPlace />
      <div className='flex flex-col gap-[15px] pb-[46px]'>
        <div className='flex flex-col gap-[10px] bg-white p-[10px]'>
          <p>
            {current === 'BD'
              ? '새로생긴 애개플레이스'
              : current === 'pet'
                ? '새로생긴 펫존'
                : '새로생긴 키즈존'}
          </p>
          <div className='grid grid-cols-3 grid-rows-2 gap-[8px]'>
            <Place />
            <Place />
            <Place />
            <Place />
            <Place />
            <Place />
          </div>
        </div>
        <div className='flex flex-col gap-[10px] bg-white p-[10px]'>
          <div className='flex items-center justify-between'>
            <p>
              {current === 'BD'
                ? '지역별 애개플레이스'
                : current === 'pet'
                  ? '지역별 펫존'
                  : '지역별 키즈존'}
            </p>
            <button className='font-medium'>〉</button>
          </div>
          <div>
            <RegionTab
              tabs={[
                '전체',
                '서울',
                '경기',
                '인천',
                '충청',
                '강원',
                '전라',
                '경상',
                '제주',
              ]}
            />
          </div>
          <div className='grid grid-cols-3 grid-rows-2 gap-[8px]'>
            <Place />
            <Place />
            <Place />
            <Place />
            <Place />
            <Place />
          </div>
        </div>
        <div className='flex flex-col gap-[10px] bg-white p-[10px]'>
          <div className='flex items-center justify-between'>
            <p>
              {current === 'BD'
                ? '장소별 애개플레이스'
                : current === 'pet'
                  ? '장소별 펫존'
                  : '장소별 키즈존'}
            </p>
            <button>〉</button>
          </div>
          <div>
            <RegionTab tabs={['전체', '카페', '펜션', '음식점', '야외/공원']} />
          </div>
          <div className='grid grid-cols-3 grid-rows-2 gap-[8px]'>
            <Place />
            <Place />
            <Place />
            <Place />
            <Place />
            <Place />
          </div>
        </div>
      </div>
    </>
  );
};

export default BDPlaceHome;
