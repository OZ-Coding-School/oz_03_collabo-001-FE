// import { useEffect, useState } from 'react'; // useState 제거
// import { useNavigate, useSearchParams } from 'react-router-dom';
import RecoPlace from './RecoPlace';
import RegionTab from './RegionTab';
import Banner from '../../page/Home/Banner';
import MoreTitle from '../layout/MoreTitle';
import Place6 from './Place6';

interface CurrentProps {
  current: string;
}

const BDPlaceHome: React.FC<CurrentProps> = ({ current }) => {
  return (
    <>
      <div className='flex flex-col gap-[15px]'>
        <div>
          <Banner />
          <RecoPlace />
        </div>
        <div className='flex flex-col bg-white p-[10px] pt-0'>
          <p className='py-[18px] font-semibold'>
            {current === 'BD'
              ? '새로생긴 애개플레이스'
              : current === 'pet'
                ? '새로생긴 펫존'
                : '새로생긴 키즈존'}
          </p>
          <Place6 />
        </div>
        <div className='flex flex-col bg-white p-[10px] pt-0'>
          <MoreTitle
            title={
              current === 'BD'
                ? '지역별 애개플레이스'
                : current === 'pet'
                  ? '지역별 펫존'
                  : '지역별 키즈존'
            }
          />
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
            current={current}
          />
          <Place6 />
        </div>
        <div className='flex flex-col bg-white p-[10px] pt-0'>
          <MoreTitle
            title={
              current === 'BD'
                ? '장소별 애개플레이스'
                : current === 'pet'
                  ? '장소별 펫존'
                  : '장소별 키즈존'
            }
          />
          <RegionTab
            tabs={['전체', '카페', '펜션', '음식점', '야외/공원']}
            current={current}
          />
          <Place6 />
        </div>
      </div>
    </>
  );
};

export default BDPlaceHome;
