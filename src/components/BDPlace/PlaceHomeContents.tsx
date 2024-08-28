// import { useEffect, useState } from 'react'; // useState 제거
// import { useNavigate, useSearchParams } from 'react-router-dom';
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

  return (
    <>
      <div className='flex flex-col gap-[15px]'>
        <div>
          <Banner />
          <RecoPlace />
        </div>
        <div className='flex flex-col bg-white p-[10px] pt-0'>
          <p className='py-[18px] font-semibold'>
            {current === 'bd'
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
              current === 'bd'
                ? '지역별 애개플레이스'
                : current === 'pet'
                  ? '지역별 펫존'
                  : '지역별 키즈존'
            }
            gps={true}
          />
          <RegionTab
            tabs={placeRegions.map((item) => item.region)}
            current={current}
          />
          <Place6 />
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
            tabs={placeSubcategories.map((item) => item.subcategory)}
            current={current}
          />
          <Place6 />
        </div>
      </div>
    </>
  );
};

export default BDPlaceHome;
