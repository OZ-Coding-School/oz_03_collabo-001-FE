import React from 'react';
import Place from './Place';

interface PlaceData {
  id: number;
  store_image: string;
  is_bookmarked: boolean;
  place_region: number;
  place_subcategory: number;
  name: string;
  rating: number;
  comments_count: number;
}

interface RegionListType {
  id: number;
  region: string;
}

interface SubcategoryListType {
  id: number;
  subcategory: string;
}

interface Props {
  current: string;
  currentTab?: string;
  section: 'new' | 'region' | 'sub_category';
  newPlaces?: PlaceData[];
  regionPlaces?: PlaceData[];
  subcategoryPlaces?: PlaceData[];
  tapRegions?: RegionListType[];
  tapSubcategories?: SubcategoryListType[];
}

const Place6: React.FC<Props> = ({
  section,
  newPlaces = [],
  regionPlaces = [],
  subcategoryPlaces = [],
  tapRegions = [],
  // tapSubcategories = [],
}) => {
  const places =
    section === 'new'
      ? newPlaces
      : section === 'region'
        ? regionPlaces
        : subcategoryPlaces;

  const getLocationName = (id: number) => {
    return tapRegions?.find((region) => region.id === id)?.region || '';
  };

  return (
    <div className='flex h-[250px] flex-wrap gap-[8px]'>
      {places && places.length > 0 ? (
        places.map((place) => (
          <Place
            key={place.id}
            placeId={place.id}
            store_image={place.store_image}
            place_region={place.place_region}
            place_subcategory={place.place_subcategory}
            name={place.name}
            rating={place.rating}
            reviewCount={place.comments_count}
            isBookmarked={place.is_bookmarked}
            locationName={getLocationName(place.place_region)}
          />
        ))
      ) : (
        <div className='w-[100%] text-center text-[14px] text-caption'>
          해당하는 장소가 없습니다.
        </div>
      )}
    </div>
  );
};

export default Place6;
