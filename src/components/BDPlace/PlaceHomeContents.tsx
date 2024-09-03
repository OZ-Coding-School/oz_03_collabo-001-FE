import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecoPlace from './RecoPlace';
import RegionTab from './RegionTab';
import Banner from '../../page/Home/Banner';
import MoreTitle from '../layout/MoreTitle';
import Place6 from './Place6';

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

// interface PlaceData {
//   id: string;
//   store_image: string;
//   is_bookmarked: boolean;
//   place_region: number;
//   place_subcategory: number;
//   name: string;
//   address: string;
//   rating: number;
//   comments_count: number;
// }

const BDPlaceHome: React.FC<CurrentProps> = ({ current }) => {
  const [placeSubcategories, setPlaceSubcategories] = useState<
    PlaceSubcategories[]
  >([]);
  const [placeRegions, setPlaceRegions] = useState<PlaceRegions[]>([]);
  // const [newPlaces, setNewPlaces] = useState<PlaceData[]>([]);
  // const [regionPlaces, setRegionPlaces] = useState<PlaceData[]>([]);
  // const [subcategoryPlaces, setSubcategoryPlaces] = useState<PlaceData[]>([]);

  useEffect(() => {
    const getTabs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/places/', {
          withCredentials: true,
        });
        setPlaceSubcategories(response.data.results.place_subcategories);
        setPlaceRegions(response.data.results.place_regions);
      } catch (err) {
        console.log(err);
      }
    };
    getTabs();
  }, [current]);

  useEffect(() => {
    console.log(current);
    const fetchPlaces = async () => {
      try {
        // For new places
        const response = await axios.get(
          `http://127.0.0.1:8000/places/${current}/main/`,
          { withCredentials: true }
        );
        console.log(response.data);

        // setNewPlaces(response.data.new_places);
        // setRegionPlaces(response.data.region_places);
        // setSubcategoryPlaces(response.data.subcategory);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPlaces();
  }, [current]);

  // const fetchPlacesByCategory = async (category: string, section: string) => {
  //   try {
  //     let url = `http://127.0.0.1:8000/places/?main_category=${category}&page_size=6`;
  //     if (section === 'region') {
  //       url = `http://127.0.0.1:8000/places/?main_category=${category}&page_size=6`;
  //     } else if (section === 'sub_category') {
  //       url = `http://127.0.0.1:8000/places/?main_category=${category}&page_size=6`;
  //     }
  //     const response = await axios.get(url);
  //     return response.data.results;
  //   } catch (err) {
  //     console.log(err);
  //     return [];
  //   }
  // };

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
          <Place6
            current={current}
            section='new'
            regionList={placeRegions}
            // newPlaces={newPlaces}
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
            tabs={placeRegions}
            current={current}
            section='region'
            regionList={placeRegions}
            // fetchPlacesByCategory={fetchPlacesByCategory}
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
            tabs={placeSubcategories}
            current={current}
            section='sub_category'
            regionList={placeRegions}
            // subcategoryPlaces={subcategoryPlaces}
            // fetchPlacesByCategory={fetchPlacesByCategory}
          />
        </div>
      </div>
    </>
  );
};

export default BDPlaceHome;
