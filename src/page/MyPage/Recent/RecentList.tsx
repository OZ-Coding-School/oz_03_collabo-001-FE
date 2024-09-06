/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlaceItem from '../../../components/PlaceFilter/PlaceItem';

interface RegionType {
  id: number;
  region: string;
}

interface PlaceListProps {
  selectPlace?: string;
  tapRegions?: RegionType[];
}

interface PlaceData {
  id: number;
  store_image: string;
  is_bookmarked: boolean;
  place_region: number;
  place_subcategory: number;
  name: string;
  address: string;
  rating: number;
  comments_count: number;
}

const fetchPlaces = async () => {
  try {
    const response = await axios.get(
      'http://127.0.0.1:8000/users/mypage/view-history/',
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error('정보 가져오기 실패:', error);
    return { results: [] };
  }
};

const RecentList: React.FC<PlaceListProps> = ({ tapRegions }) => {
  const [places, setPlaces] = useState<PlaceData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlaces = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchPlaces();
        const newPlaces = response?.results || [];
        if (newPlaces.length === 0) {
          setError('최근 본 장소가 없습니다.');
        } else {
          setPlaces(newPlaces);
        }
      } catch (error) {
        console.error('장소 가져오기 실패:', error);
        setError('장소를 가져오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    loadPlaces();
  }, []);

  const getLocationName = (placeRegionId: number) => {
    const region = tapRegions?.find((region) => region.id === placeRegionId);
    return region ? region.region : 'Unknown';
  };

  return (
    <>
      {error && !isLoading && !places.length && (
        <div className='py-4 text-center text-[14px] text-caption'>{error}</div>
      )}
      <div className='gap-[10px] py-2'>
        {places.map((place: PlaceData) => (
          <PlaceItem
            key={place.id}
            placeId={place.id}
            store_image={place.store_image}
            isBookmarked={place.is_bookmarked}
            locationName={getLocationName(place.place_region)}
            name={place.name}
            address={place.address}
            rating={place.rating}
            comments_count={place.comments_count}
          />
        ))}
      </div>
      {isLoading && (
        <div className='py-4 text-center text-[14px] text-caption'>
          가져오는 중...
        </div>
      )}
    </>
  );
};

export default RecentList;
