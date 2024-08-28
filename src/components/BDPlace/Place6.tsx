import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import Place from './Place';
import useBookmarkStore from '../../store/bookmarkStore';

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

const Place6: React.FC = () => {
  const [places, setPlaces] = useState<PlaceData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { bookmarks } = useBookmarkStore(); // 북마크 상태 가져오기

  useEffect(() => {
    // 데이터 fetching 함수
    // const fetchPlaces = async () => {
    //   try {
    //     const response = await axios.get('https://your-backend-api/places'); // 백엔드 API 호출
    //     setPlaces(response.data); // 장소 데이터 설정
    //   } catch (error) {
    //     console.error('Error fetching places:', error);
    //     setError('장소 정보를 가져오는 데 실패했습니다.');
    //   }
    // };

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

  return (
    <div className='grid grid-cols-3 grid-rows-2 gap-[10px] py-2'>
      {places.map((place) => (
        <Place
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
  );
};

export default Place6;
