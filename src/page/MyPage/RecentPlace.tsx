import React from 'react';
import MoreTitle from '../../components/layout/MoreTitle';
import Place from '../../components/BDPlace/Place';

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

interface RecentPlaceProps {
  recentplace: PlaceData[];
}

const RecentPlace: React.FC<RecentPlaceProps> = ({ recentplace }) => {
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
              place_region={0}
              place_subcategory={0}
              locationName={''}
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
