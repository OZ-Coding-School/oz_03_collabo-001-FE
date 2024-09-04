import MoreTitle from '../../components/layout/MoreTitle';
import Place from '../../components/BDPlace/Place';

interface RecentPlaceProps {
  recentplace: PlaceData[];
  tapRegions: RegionListType[];
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

interface RegionListType {
  id: number;
  region: string;
}

const RecentPlace: React.FC<RecentPlaceProps> = ({
  recentplace,
  tapRegions,
}) => {
  const getLocationName = (id: number) => {
    return tapRegions?.find((region) => region.id === id)?.region || '';
  };

  return (
    <div className='col'>
      <MoreTitle title='최근 본 장소' />
      <div className='flex flex-wrap gap-[8px] pb-[20px]'>
        {recentplace.length > 0 ? (
          recentplace.map((placeInfo) => (
            <Place
              key={placeInfo.id}
              placeId={placeInfo.id}
              store_image={placeInfo.store_image}
              name={placeInfo.name}
              rating={placeInfo.rating}
              reviewCount={placeInfo.comments_count}
              isBookmarked={placeInfo.is_bookmarked}
              place_region={placeInfo.place_region}
              locationName={getLocationName(placeInfo.place_region)}
            />
          ))
        ) : (
          <div className='text-[14px] text-caption'>
            최근 본 장소가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentPlace;
