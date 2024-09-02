/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlaceItem from './PlaceItem';
import { useFilterStore } from '../../store/filterStore';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

interface PlaceData {
  id: string;
  store_image: string;
  is_bookmarked: boolean;
  place_region: string;
  name: string;
  rating: number;
  comments_count: number;
}

const regionMap: { [key: string]: string } = {
  '': '전체',
  '1': '서울',
  '2': '경기',
  '3': '인천',
  '4': '충청',
  '5': '강원',
  '6': '전라',
  '7': '경상',
  '8': '제주',
};

const fetchPlaces = async (
  regionId: string | null,
  subCategoryId: string | null,
  latitude: number | null,
  longitude: number | null,
  isActive: boolean,
  page: number
) => {
  const params: any = {
    page,
    page_size: 10,
    place_region: regionId || '',
    place_subcategory: subCategoryId || '',
    latitude: latitude,
    longitude: longitude,
    is_active: isActive,
  };

  try {
    const response = await axios.get('http://127.0.0.1:8000/places/', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching places:', error);
    return { results: [], next: null };
  }
};

const PlaceList: React.FC = () => {
  const { regionId, subCategoryId, latitude, longitude, isActive } =
    useFilterStore();
  const [places, setPlaces] = useState<PlaceData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMorePlaces = async (initialLoad: boolean = false) => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchPlaces(
        regionId,
        subCategoryId,
        latitude,
        longitude,
        isActive,
        initialLoad ? 1 : page
      );
      const newPlaces = response.results.results;

      if (initialLoad) {
        setPlaces(newPlaces);
        setPage(2);
      } else {
        setPlaces((prevPlaces) => [...prevPlaces, ...newPlaces]);
        setPage((prevPage) => prevPage + 1);
      }

      setHasMore(!!response.next);
    } catch (error) {
      console.error('Error loading more places:', error);
      setError('장소를 가져오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const { observerElem } = useInfiniteScroll(
    () => loadMorePlaces(false),
    hasMore && !isLoading
  );

  useEffect(() => {
    loadMorePlaces(true);
  }, [regionId, subCategoryId, latitude, longitude, isActive]);

  return (
    <div className='h-[100%]'>
      {error && !isLoading && !places.length && (
        <div className='text-red-500 py-4 text-center'>{error}</div>
      )}
      <div className='gap-[10px] py-2'>
        {places.map((place: PlaceData) => (
          <PlaceItem
            key={place.id}
            placeId={place.id}
            location={regionMap[place.place_region]}
            name={place.name}
            rating={place.rating}
            reviewCount={place.comments_count}
            isBookmarked={place.is_bookmarked}
          />
        ))}
      </div>
      {isLoading && <div className='py-4 text-center'>가져오는 중...</div>}
      {hasMore && <div ref={observerElem} className='h-1' />}
    </div>
  );
};

export default PlaceList;
