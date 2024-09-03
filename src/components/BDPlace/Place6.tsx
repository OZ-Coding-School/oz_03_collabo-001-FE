import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Place from './Place';
import useBookmarkStore from '../../store/bookmarkStore';

interface RegionListType {
  id: string;
  region: string;
}

interface Props {
  current: string;
  currentTab?: string;
  section: string;
  regionList: RegionListType[];
}

interface PlaceData {
  id: string;
  store_image: string;
  is_bookmarked: boolean;
  place_region: string;
  name: string;
  rating: number;
  comments_count: number;
}

interface FetchParams {
  main_category: string;
  place_region?: string;
  place_subcategory?: string;
  page: number;
  page_size: number;
  latitude: number;
  longitude: number;
  is_active: boolean;
}

interface ApiResponse {
  results: {
    results: PlaceData[];
  };
}

const Place6: React.FC<Props> = ({
  current,
  currentTab,
  section,
  regionList,
}) => {
  const [places, setPlaces] = useState<PlaceData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { bookmarks } = useBookmarkStore(); // 북마크 상태 가져오기

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const params: FetchParams = {
          main_category: current,
          page: 1,
          page_size: 6,
          latitude: 0,
          longitude: 0,
          is_active: false,
        };
        if (section === 'region') {
          params.place_region = currentTab;
        } else if (section === 'sub_category') {
          params.place_subcategory = currentTab;
        } else {
          params.place_region = '';
          params.place_subcategory = '';
        }
        const response = await axios.get<ApiResponse>(
          'http://127.0.0.1:8000/places/',
          {
            params,
          }
        );
        console.log(response.data.results.results);
        setPlaces(response.data.results.results);
      } catch (error) {
        console.error('Error fetching places:', error);
        setError('장소 정보를 가져오는 데 실패했습니다.');
      }
    };

    fetchPlaces();
  }, [bookmarks, section, current, currentTab]);

  if (error) {
    return <div>오류: {error}</div>;
  }

  return (
    <div className='flex flex-wrap gap-[10px] py-2'>
      {places.map((place) => (
        <Place
          key={place.id}
          placeId={place.id}
          store_image={place.store_image}
          location={place.place_region}
          name={place.name}
          rating={place.rating}
          reviewCount={place.comments_count}
          isBookmarked={place.is_bookmarked}
          regionList={regionList}
        />
      ))}
    </div>
  );
};

export default Place6;
