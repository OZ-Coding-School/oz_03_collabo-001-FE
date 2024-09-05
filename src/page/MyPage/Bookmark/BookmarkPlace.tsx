import MoreTitle from '../../../components/layout/MoreTitle';
import Place from '../../../components/BDPlace/Place';
import { useBookmarkStore } from '../../../store/bookmarkStore';

interface MyBookmarkProps {
  bookmarks: Bookmark[];
  tapRegions: RegionListType[];
}

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

interface RegionListType {
  id: number;
  region: string;
}

const MyBookmark: React.FC<MyBookmarkProps> = ({ bookmarks, tapRegions }) => {
  const bookmarkIds = useBookmarkStore((state) => state.bookmarks);

  const filteredBookmarks = bookmarks.filter((bookmark) =>
    bookmarkIds.includes(bookmark.id)
  );

  const getLocationName = (id: number) => {
    return tapRegions?.find((region) => region.id === id)?.region || '';
  };

  return (
    <div className='col'>
      <MoreTitle title='나만의 북마크' />
      <div className='flex flex-wrap gap-[8px] pb-[20px]'>
        {filteredBookmarks.length > 0 ? (
          filteredBookmarks.map((placeInfo) => (
            <Place
              key={placeInfo.id}
              placeId={placeInfo.id}
              store_image={placeInfo.store_image}
              name={placeInfo.name}
              rating={placeInfo.rating}
              reviewCount={placeInfo.comments_count}
              isBookmarked={placeInfo.is_bookmarked}
              // isBookmarked={true}
              locationName={getLocationName(placeInfo.place_region)}
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
