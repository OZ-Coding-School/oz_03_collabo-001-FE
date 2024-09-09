import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Place6 from './Place6';

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

interface TabProps {
  current: string;
  section: 'new' | 'region' | 'sub_category';
  newPlaces?: PlaceData[];
  regionPlaces?: PlaceData[];
  subcategoryPlaces?: PlaceData[];
  tapRegions?: RegionListType[];
  tapSubcategories?: SubcategoryListType[];
}

const RegionTab: React.FC<TabProps> = ({
  current,
  section,
  newPlaces,
  regionPlaces,
  subcategoryPlaces,
  tapRegions,
  tapSubcategories,
}) => {
  const [strTabs, setStrTabs] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>('전체');
  const [filteredPlaces, setFilteredPlaces] = useState<PlaceData[]>([]);

  const handleTabRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTab(e.target.value);
  };

  useEffect(() => {
    let tabs: string[] = [];

    if (tapSubcategories) {
      tabs = ['전체', ...tapSubcategories.map((item) => item.subcategory)];
    } else if (tapRegions) {
      tabs = ['전체', ...tapRegions.map((item) => item.region)];
    }

    setStrTabs(tabs);
    if (!selectedTab || !tabs.includes(selectedTab)) {
      setSelectedTab('전체');
    }
  }, [selectedTab, tapRegions, tapSubcategories]);

  useEffect(() => {
    let placesToFilter: PlaceData[] = [];

    if (section === 'region' && regionPlaces) {
      placesToFilter = regionPlaces;
    } else if (section === 'sub_category' && subcategoryPlaces) {
      placesToFilter = subcategoryPlaces;
    } else if (section === 'new' && newPlaces) {
      placesToFilter = newPlaces;
    }

    if (selectedTab === '전체') {
      setFilteredPlaces(placesToFilter);
    } else if (tapSubcategories) {
      const selectedSubcategoryId = tapSubcategories.find(
        (subcategory) => subcategory.subcategory === selectedTab
      )?.id;
      setFilteredPlaces(
        placesToFilter.filter(
          (place) => place.place_subcategory === selectedSubcategoryId
        )
      );
    } else if (tapRegions) {
      const selectedRegionId = tapRegions.find(
        (region) => region.region === selectedTab
      )?.id;
      setFilteredPlaces(
        placesToFilter.filter(
          (place) => place.place_region === selectedRegionId
        )
      );
    }
  }, [
    selectedTab,
    section,
    regionPlaces,
    subcategoryPlaces,
    newPlaces,
    tapRegions,
    tapSubcategories,
  ]);

  return (
    <div>
      <div className='flex flex-wrap gap-[6px] pb-[18px]'>
        {strTabs.map((tab) => (
          <label key={tab}>
            <input
              type='radio'
              value={tab}
              onChange={handleTabRadio}
              checked={selectedTab === tab}
              className='hidden'
            />
            <div
              className={twMerge(
                'flex h-[20px] w-[65px] items-center justify-center rounded-full border-[1px] border-border bg-[white] text-[10px] text-caption',
                selectedTab === tab && 'border-0 bg-primary text-[white]'
              )}
            >
              {tab}
            </div>
          </label>
        ))}
      </div>
      <Place6
        current={current}
        section={section}
        newPlaces={section === 'new' ? filteredPlaces : undefined}
        regionPlaces={section === 'region' ? filteredPlaces : undefined}
        subcategoryPlaces={
          section === 'sub_category' ? filteredPlaces : undefined
        }
        tapRegions={tapRegions}
        tapSubcategories={tapSubcategories}
      />
    </div>
  );
};

export default RegionTab;
