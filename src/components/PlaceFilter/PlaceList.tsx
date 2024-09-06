/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PlaceItem from './PlaceItem';
import { useFilterStore } from '../../store/useFilterStore';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
// import ScrollToTopButton from './ScrollToTopButton';

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

const fetchPlaces = async (
  regionId: number | null,
  subCategoryId: number | null,
  latitude: number | null,
  longitude: number | null,
  isActive: boolean,
  page: number,
  selectPlace?: string
) => {
  const params: any = {
    main_category: selectPlace,
    page,
    page_size: 10,
    place_region: regionId,
    place_subcategory: subCategoryId,
    latitude: latitude,
    longitude: longitude,
    is_active: isActive,
  };

  try {
    const response = await axios.get('https://api.dogandbaby.co.kr/places/', {
      params,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('정보 가져오기 실패:', error);
    return { results: [], next: null };
  }
};

const PlaceList: React.FC<PlaceListProps> = ({ selectPlace, tapRegions }) => {
  const { regionId, subCategoryId, latitude, longitude, isActive } =
    useFilterStore();
  const [places, setPlaces] = useState<PlaceData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
        initialLoad ? 1 : page,
        selectPlace
      );

      const newPlaces = response?.results?.results || [];

      if (initialLoad) {
        if (newPlaces.length === 0) {
          setError('북마크된 장소가 없습니다.');
          setHasMore(false);
          setPlaces([]);
        } else {
          setPlaces(newPlaces);
          setPage(2);
          setHasMore(!!response.next);
        }
      } else {
        if (newPlaces.length === 0) {
          setHasMore(false);
        } else {
          setPlaces((prevPlaces) => [...prevPlaces, ...newPlaces]);
          setPage((prevPage) => prevPage + 1);
          setHasMore(!!response.next);
        }
      }
    } catch (error) {
      console.error('장소 더 가져오기 실패:', error);
      setError('장소를 가져오는데 실패했습니다.');
      setHasMore(false);
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
  }, [regionId, subCategoryId, latitude, longitude, isActive, selectPlace]);

  const getLocationName = (placeRegionId: number) => {
    const region = tapRegions?.find((region) => region.id === placeRegionId);
    return region ? region.region : 'Unknown';
  };

  return (
    <div className='h-[100vh]' ref={scrollContainerRef}>
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
      {isLoading && <div className='py-4 text-center'>가져오는 중...</div>}
      {hasMore && <div ref={observerElem} className='h-1' />}

      {/* <ScrollToTopButton scrollContainerRef={scrollContainerRef} /> */}
    </div>
  );
};

export default PlaceList;
