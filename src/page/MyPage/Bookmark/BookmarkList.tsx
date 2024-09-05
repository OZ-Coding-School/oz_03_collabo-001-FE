/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PlaceItem from '../../../components/PlaceFilter/PlaceItem';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import { useBookmarkStore } from '../../../store/bookmarkStore';

interface RegionType {
  id: number;
  region: string;
}

interface PlaceListProps {
  selectPlace?: string;
  tapRegions: RegionType[];
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

const fetchPlaces = async (page: number) => {
  const params: { page: number; page_size: number } = {
    page,
    page_size: 10,
  };
  try {
    const response = await axios.get(
      'http://127.0.0.1:8000/users/mypage/bookmark',
      { params, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error('정보 가져오기 실패:', error);
    return { results: [], next: null };
  }
};

const BookmarkList: React.FC<PlaceListProps> = ({ tapRegions }) => {
  const [places, setPlaces] = useState<PlaceData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { bookmarks, setBookmarks } = useBookmarkStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const loadMorePlaces = async (initialLoad: boolean = false) => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchPlaces(initialLoad ? 1 : page);
      const newPlaces = response?.results?.results || [];

      if (initialLoad) {
        if (newPlaces.length === 0) {
          setError('해당하는 장소가 없습니다.');
          setHasMore(false);
          setPlaces([]);
        } else {
          const bookmarkedPlaces = newPlaces.filter(
            (place: PlaceData) => place.is_bookmarked
          );
          setPlaces(bookmarkedPlaces);
          setPage(2);
          setHasMore(!!response.next);

          const bookmarkIds = bookmarkedPlaces.map(
            (place: PlaceData) => place.id
          );
          setBookmarks(bookmarkIds);
        }
      } else {
        if (newPlaces.length === 0) {
          setHasMore(false);
        } else {
          const filteredPlaces = newPlaces.filter(
            (place: PlaceData) => place.is_bookmarked
          );
          setPlaces((prevPlaces) => [...prevPlaces, ...filteredPlaces]);
          setPage((prevPage) => prevPage + 1);
          setHasMore(!!response.next);

          const newBookmarkIds = filteredPlaces.map(
            (place: PlaceData) => place.id
          );
          setBookmarks(Array.from(new Set([...bookmarks, ...newBookmarkIds])));
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
  }, [bookmarks]);

  const getLocationName = (placeRegionId: number) => {
    const region = tapRegions?.find((region) => region.id === placeRegionId);
    return region ? region.region : 'Unknown';
  };

  return (
    <div ref={scrollContainerRef}>
      {error && !isLoading && !places.length && (
        <div className='text-red-500 py-4 text-center text-[14px] text-caption'>
          {error}
        </div>
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
    </div>
  );
};

export default BookmarkList;
