import MoreTitle from '../../components/layout/MoreTitle';
import Place from '../../components/BDPlace/Place';
import useRecentPlacesStore from '../../store/RecentPlaceStore';
import useBookmarkStore from '../../store/bookmarkStore';

const RecentPlace: React.FC = () => {
  // Zustand 스토어에서 최근 본 장소 가져오기
  const { recentPlaces } = useRecentPlacesStore();
  // 북마크 스토어에서 북마크 정보 가져오기
  const { bookmarks } = useBookmarkStore();
  // 최근 본 장소를 3개로 제한하여 가져오기
  const limitedRecentPlaces = [...recentPlaces.entries()].slice(0, 3);

  return (
    <div className='col'>
      <MoreTitle title='최근 본 장소' />
      <div className='flex flex-wrap gap-[8px] pb-[20px]'>
        {/* 최근 본 장소의 ID와 정보를 기반으로 Place 컴포넌트 렌더링 */}
        {limitedRecentPlaces.map(([placeId, info]) => (
          <Place
            key={placeId}
            placeId={placeId}
            location={info.location}
            name={info.name}
            rating={info.rating}
            reviewCount={info.reviewCount}
            isBookmarked={!!bookmarks[placeId]} // 북마크 상태 확인
          />
        ))}
      </div>
    </div>
  );
};

export default RecentPlace;
