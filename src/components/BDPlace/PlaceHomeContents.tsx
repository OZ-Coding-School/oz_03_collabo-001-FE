// import { useEffect, useState } from 'react'; // useState 제거
// import { useNavigate, useSearchParams } from 'react-router-dom';
import useFetchCategoryData from '../../hooks/useFetchCategoryData';
import RecoPlace from './RecoPlace';
import RegionTab from './RegionTab';
import Banner from '../../page/Home/Banner';
import MoreTitle from '../layout/MoreTitle';
import Place6 from './Place6';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface CurrentProps {
  current: string;
}
interface PlaceSubcategories {
  id: string;
  subcategory: string;
}
interface PlaceRegions {
  id: string;
  region: string;
}

const BDPlaceHome: React.FC<CurrentProps> = ({ current }) => {
  // 배너, 추천장소 데이터 가져오기
  const { categoryData, loading, error } = useFetchCategoryData(current);
  const recoTags: { [key: string]: string[] } = {
    bd: ['5세아이', '중형견', '실내'],
    pet: ['대형견이 놀기좋아요', '강아지수영장'],
    kids: ['아들들이 좋아해요', '5세아이맞춤', '실내'],
  };

  const [placeSubcategories, setPlaceSubcategories] = useState<
    PlaceSubcategories[]
  >([]);
  const [placeRegions, setPlaceRegions] = useState<PlaceRegions[]>([]);

  useEffect(() => {
    const getTabs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/places/');
        setPlaceSubcategories(response.data.results.place_subcategories);
        setPlaceRegions(response.data.results.place_regions);
      } catch (err) {
        console.log(err);
      }
    };
    getTabs();
  }, [current]);

  if (!categoryData) {
    return null;
  }

  if (loading || error) {
    return null;
  }

  return (
    <>
      <div className='flex flex-col gap-[15px]'>
        <div>
          <Banner bannerImgs={categoryData.bannerImgs} />
          <RecoPlace
            recoTags={recoTags[current]}
            recoPlaces={categoryData.recoPlaces}
          />
        </div>
        <div className='flex flex-col bg-white p-[10px] pt-0'>
          <p className='py-[18px] font-semibold'>
            {current === 'bd'
              ? '새로생긴 애개플레이스'
              : current === 'pet'
                ? '새로생긴 펫존'
                : '새로생긴 키즈존'}
          </p>
          <Place6 current={current} section='new' regionList={placeRegions} />
        </div>
        <div className='flex flex-col bg-white p-[10px] pt-0'>
          <MoreTitle
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
            tabs={placeRegions}
            current={current}
            section='region'
            regionList={placeRegions}
          />
        </div>
        <div className='flex flex-col bg-white p-[10px] pt-0'>
          <MoreTitle
            title={
              current === 'bd'
                ? '장소별 애개플레이스'
                : current === 'pet'
                  ? '장소별 펫존'
                  : '장소별 키즈존'
            }
          />
          <RegionTab
            tabs={placeSubcategories}
            current={current}
            section='sub_category'
            regionList={placeRegions}
          />
        </div>
      </div>
    </>
  );
};

export default BDPlaceHome;
