import React from 'react';
import useFetchCategoryData from '../../hooks/useFetchCategoryData';
import RecoPlace from './RecoPlace';
import RegionTab from './RegionTab';
import Banner from '../../page/Home/Banner';
import MoreTitle from '../layout/MoreTitle';
import Place6 from './Place6';

interface CurrentProps {
  current: string;
}

const BDPlaceHome: React.FC<CurrentProps> = ({ current }) => {
  const { categoryData, loading, error } = useFetchCategoryData(current);

  const recoTags: { [key: string]: string[] } = {
    bd: ['5세아이', '중형견', '실내'],
    pet: ['대형견이 놀기좋아요', '강아지수영장'],
    kids: ['아들들이 좋아해요', '5세아이맞춤', '실내'],
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !categoryData) {
    return <div>Error loading data.</div>;
  }

  const {
    newPlaces,
    regionPlaces,
    subcategoryPlaces,
    bannerImgs,
    recoPlaces,
    tapRegions,
    tapSubcategories,
  } = categoryData;

  return (
    <>
      <div className='flex flex-col gap-[15px]'>
        <div>
          <Banner bannerImgs={bannerImgs} />
          <RecoPlace recoTags={recoTags[current]} recoPlaces={recoPlaces} />
        </div>
        <div className='flex flex-col bg-white p-[10px] pt-0'>
          <p className='py-[18px] font-semibold'>
            {current === 'bd'
              ? '새로생긴 애개플레이스'
              : current === 'pet'
                ? '새로생긴 펫존'
                : '새로생긴 키즈존'}
          </p>
          <Place6
            current={current}
            section='new'
            newPlaces={newPlaces}
            tapRegions={tapRegions}
          />
        </div>
        <div className='flex flex-col bg-white p-[10px] pt-0'>
          <MoreTitle
            key='region-filter'
            title={
              current === 'bd'
                ? '지역별 애개플레이스'
                : current === 'pet'
                  ? '지역별 펫존'
                  : '지역별 키즈존'
            }
            gps={true}
          />
          <RegionTab
            current={current}
            section='region'
            regionPlaces={regionPlaces}
            tapRegions={tapRegions}
          />
        </div>
        <div className='flex flex-col bg-white p-[10px] pt-0'>
          <MoreTitle
            key='place-filter'
            title={
              current === 'bd'
                ? '장소별 애개플레이스'
                : current === 'pet'
                  ? '장소별 펫존'
                  : '장소별 키즈존'
            }
          />
          <RegionTab
            current={current}
            section='sub_category'
            subcategoryPlaces={subcategoryPlaces}
            tapRegions={tapRegions}
            tapSubcategories={tapSubcategories}
          />
        </div>
      </div>
    </>
  );
};

export default BDPlaceHome;
