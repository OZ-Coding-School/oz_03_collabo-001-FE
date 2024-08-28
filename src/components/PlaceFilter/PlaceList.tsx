// import React from 'react';
import { useEffect, useState } from 'react';
import PlaceItem from './PlaceItem';
import useBookmarkStore from '../../store/bookmarkStore';
// import useInfiniteScroll from '../../hooks/useInfiniteScroll'; // 경로는 실제 위치에 맞게 조정해주세요

// interface Place {
//   // Place 타입을 정의해주세요
//   id: string;
//   // 기타 필요한 속성들...
// }

// const fetchPlaces = async ({ pageParam = 0 }) => {
//   // API 호출 로직을 구현해주세요
//   const response = await fetch(`/api/places?page=${pageParam}`);
//   return response.json();
// };

interface PlaceData {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  isBookmarked: boolean; // 북마크 여부를 나타내는 필드
}

const mockPlaceData: PlaceData[] = [
  {
    id: '1',
    location: '경기',
    name: '스타필드 고양',
    rating: 4.8,
    reviewCount: 120,
    isBookmarked: false, // 기본값 설정
  },
  {
    id: '2',
    location: '서울',
    name: '롯데월드몰',
    rating: 4.5,
    reviewCount: 95,
    isBookmarked: false, // 기본값 설정
  },
  {
    id: '3',
    location: '서울',
    name: '코엑스몰',
    rating: 4.7,
    reviewCount: 150,
    isBookmarked: false, // 기본값 설정
  },
  {
    id: '4',
    location: '서울',
    name: '동대문 디자인 플라자',
    rating: 4.6,
    reviewCount: 80,
    isBookmarked: false, // 기본값 설정
  },
  {
    id: '5',
    location: '서울',
    name: '잠실 롯데타워',
    rating: 4.9,
    reviewCount: 200,
    isBookmarked: false, // 기본값 설정
  },
  {
    id: '6',
    location: '서울',
    name: '남산타워',
    rating: 4.4,
    reviewCount: 110,
    isBookmarked: false, // 기본값 설정
  },
];

const PlaceList: React.FC = () => {
  const [places, setPlaces] = useState<PlaceData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { bookmarks } = useBookmarkStore(); // 북마크 상태 가져오기

  useEffect(() => {
    // 목데이터를 사용하여 상태를 설정
    const fetchPlaces = async () => {
      try {
        // 목데이터를 사용하여 상태를 설정
        const placesWithBookmarks = mockPlaceData.map((place) => ({
          ...place,
          isBookmarked: !!bookmarks[place.id], // 스토어에서 북마크 상태를 가져와 설정
        }));
        setPlaces(placesWithBookmarks);
      } catch (error) {
        console.error('Error fetching places:', error);
        setError('장소 정보를 가져오는 데 실패했습니다.');
      }
    };

    fetchPlaces();
  }, [bookmarks]);

  if (error) {
    return <div>오류: {error}</div>;
  }

  //   const { data, observerElem, isFetchingNextPage, isLoading, isError, error } =
  //     useInfiniteScroll<Place[]>({
  //       queryKey: ['places'],
  //       queryFn: fetchPlaces,
  //       getNextPageParam: (lastPage, allPages) => {
  //         // 다음 페이지 파라미터 로직을 구현해주세요
  //         return lastPage.length === 0 ? undefined : allPages.length;
  //       },
  //     });

  //   if (isLoading) return <div>Loading...</div>;
  //   if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className='h-[100%] w-[400px]'>
      {/* {data?.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.map((place) => (
            <PlaceItem key={place.id} place={place} />
          ))}
        </React.Fragment>
      ))} */}
      {/* {isFetchingNextPage && <div>Loading more...</div>}
      <div ref={observerElem} /> */}
      <div className='gap-[10px] py-2'>
        <div>
          {places.map((place) => (
            <PlaceItem
              key={place.id}
              placeId={place.id}
              location={place.location}
              name={place.name}
              rating={place.rating}
              reviewCount={place.reviewCount}
              isBookmarked={place.isBookmarked || false} // 북마크 상태를 전달
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaceList;
