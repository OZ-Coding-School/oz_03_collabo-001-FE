/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import MoreTitle from '../../components/layout/MoreTitle';
import Place from '../../components/BDPlace/Place';
import useBookmarkStore from '../../store/bookmarkStore';

interface PlaceInfo {
  placeId: string;
  location: string;
  name: string;
  rating: number;
  reviewCount: number;
}

const MyBookmark: React.FC = () => {
  const { bookmarks, placesInfo, loadBookmarks, loadBookmarkedPlaces } =
    useBookmarkStore();

  const [bookmarkedPlaces, setBookmarkedPlaces] = useState<PlaceInfo[]>([]);

  // 북마크를 로드하고, 북마크된 장소의 정보를 로드하는 useEffect
  useEffect(() => {
    const fetchBookmarksAndPlaces = async () => {
      try {
        await loadBookmarks(); // 북마크 로드
        await loadBookmarkedPlaces(); // 북마크된 장소 정보 로드
        console.log('Bookmarks:', bookmarks);
      } catch (err) {
        console.error('Failed to load bookmarks and places', err);
      }
    };

    fetchBookmarksAndPlaces();
  }, [loadBookmarks, loadBookmarkedPlaces]);

  useEffect(() => {
    // 북마크된 장소의 정보가 스토어에서 올바르게 로드되었는지 확인
    const updatedBookmarkedPlaces = Object.entries(bookmarks)
      .filter(([placeId]) => placesInfo[placeId]) // `placesInfo`에 존재하는 `placeId`만 필터링
      .filter(([, isBookmarked]) => isBookmarked) // 북마크된 장소만 필터링
      .map(([placeId]) => placesInfo[placeId]) // 장소 정보를 `placesInfo`에서 가져오기
      .filter(Boolean); // null 또는 undefined를 필터링

    setBookmarkedPlaces(updatedBookmarkedPlaces.slice(0, 3));
  }, [bookmarks, placesInfo]);

  return (
    <div className='col'>
      <MoreTitle title='나만의 북마크' />
      <div className='flex flex-wrap gap-[8px] pb-[20px]'>
        {/* 북마크된 장소의 정보로 Place 컴포넌트를 렌더링 */}
        {bookmarkedPlaces.length > 0 ? (
          bookmarkedPlaces.map((placeInfo) => (
            <Place
              key={placeInfo.placeId}
              placeId={placeInfo.placeId}
              location={placeInfo.location}
              name={placeInfo.name}
              rating={placeInfo.rating}
              reviewCount={placeInfo.reviewCount}
              isBookmarked={bookmarks[placeInfo.placeId]} //
            />
          ))
        ) : (
          <div className='text-[14px] text-caption'>
            북마크된 장소가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookmark;
