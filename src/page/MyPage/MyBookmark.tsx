/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import MoreTitle from '../../components/layout/MoreTitle';
import Place from '../../components/BDPlace/Place';

interface Bookmark {
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

interface MyBookmarkProps {
  bookmarks: Bookmark[];
}

const MyBookmark: React.FC<MyBookmarkProps> = ({ bookmarks }) => {
  const [bookmarkedPlaces, setBookmarkedPlaces] = useState<Bookmark[]>([]);

  useEffect(() => {
    const fetchBookmarksPlaces = async () => {
      try {
        setBookmarkedPlaces(bookmarks);
      } catch (err) {
        console.error('Failed to load bookmarks and places', err);
      }
    };

    fetchBookmarksPlaces();
  }, [bookmarks]);

  return (
    <div className='col'>
      <MoreTitle title='나만의 북마크' />
      <div className='flex flex-wrap gap-[8px] pb-[20px]'>
        {bookmarkedPlaces.length > 0 ? (
          bookmarkedPlaces.map((placeInfo) => (
            <Place
              key={placeInfo.id}
              placeId={placeInfo.id.toString()}
              location={placeInfo.address}
              name={placeInfo.name}
              rating={placeInfo.rating}
              reviewCount={placeInfo.comments_count}
              isBookmarked={placeInfo.is_bookmarked}
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
