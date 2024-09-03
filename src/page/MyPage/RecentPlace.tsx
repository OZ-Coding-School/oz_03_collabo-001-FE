import { useEffect } from 'react';
import MoreTitle from '../../components/layout/MoreTitle';
import Place, { RegionListType } from '../../components/BDPlace/Place';
import useRecentPlacesStore from '../../store/recentPlaceStore';
import useBookmarkStore from '../../store/bookmarkStore';
import axios from 'axios';

interface PlaceData {
  id: string;
  location: string;
  name: string;
  rating: number;
  reviewCount: number;
  regionList: RegionListType[];
}

const RecentPlace: React.FC = () => {
  // Zustand 스토어에서 최근 본 장소 가져오기
  const { recentPlaces, setRecentPlaces } = useRecentPlacesStore();
  // 북마크 스토어에서 북마크 정보 가져오기
  const { bookmarks } = useBookmarkStore();
  // 최근 본 장소를 3개로 제한하여 가져오기
  const limitedRecentPlaces = [...recentPlaces.entries()].slice(0, 3);

  useEffect(() => {
    // API 호출을 통해 최근 방문한 장소 데이터를 가져옵니다.
    const fetchRecentPlaces = async () => {
      try {
        const response = await axios.get<PlaceData[]>(
          'https://api.dogandbaby.co.kr/users/mypage/view-history/'
        );
        const placesData = response.data; // 데이터 구조에 따라 조정 필요
        const placesMap = new Map<string, PlaceData>();

        placesData.forEach((place) => {
          placesMap.set(place.id, place);
        });
        // Zustand 상태에 최근 방문한 장소 리스트를 설정합니다.
        setRecentPlaces(placesMap);
      } catch (error) {
        console.error('Failed to fetch recent places:', error);
      }
    };

    fetchRecentPlaces();
  }, [setRecentPlaces]);

  return (
    <div className='col'>
      <MoreTitle title='최근 본 장소' />
      <div className='flex flex-wrap gap-[8px] pb-[20px]'>
        {/* 최근 본 장소의 ID와 정보를 기반으로 Place 컴포넌트 렌더링 */}
        {limitedRecentPlaces.map(([placeId, info]) => (
          <Place
            key={placeId}
            placeId={placeId}
            store_image={''}
            location={info.location}
            name={info.name}
            rating={info.rating}
            reviewCount={info.reviewCount}
            isBookmarked={!!bookmarks[placeId]}
            regionList={info.regionList}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentPlace;
