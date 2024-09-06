/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { GoChevronLeft } from 'react-icons/go';
import axios from 'axios';
import Scrollbars from 'react-custom-scrollbars-2';
import renderThumbVertical from '../CustomScrollbar/renderThumbVertical';
import FilterOptions from './FilterOptions';
import PlaceList from './PlaceList';
import FilterDistance from './FilterDistance';
import { useFilterStore } from '../../store/useFilterStore';
import ScrollToTopBtn from '../CustomScrollbar/ScrollToTopBtn';

interface PlaceFilterProps {
  closeModal: () => void;
  title: string;
  selectPlace: string;
}

interface FetchResponse {
  results: {
    place_subcategories: SubCategoryType[];
    place_regions: RegionType[];
  };
}

interface RegionType {
  id: number;
  region: string;
}

interface SubCategoryType {
  id: number;
  subcategory: string;
}

const PlaceFilter: React.FC<PlaceFilterProps> = ({
  selectPlace,
  title,
  closeModal,
}) => {
  const [regions, setRegions] = React.useState<RegionType[]>([]);
  const [subCategories, setSubCategories] = React.useState<SubCategoryType[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);

  const {
    setRegionId,
    setSubCategoryId,
    setLatitude,
    setLongitude,
    setIsActive,
  } = useFilterStore();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const fetchRegionsAndSubCategories = async () => {
      try {
        const response = await axios.get<FetchResponse>(
          'https://api.dogandbaby.co.kr/places/',
          {
            params: { main_category: selectPlace, page: 1, page_size: 10 },
            withCredentials: true,
          }
        );
        setRegions(response.data.results.place_regions as RegionType[]);
        setSubCategories(
          response.data.results.place_subcategories as SubCategoryType[]
        );
        setError(null);
      } catch (error) {
        console.error('정보를 가져오는데 실패했습니다.', error);
        setError('정보를 가져오는데 실패했습니다.');
      }
    };

    fetchRegionsAndSubCategories();
  }, [selectPlace]);

  // 모달이 열릴 때 필터 상태 초기화
  useEffect(() => {
    setRegionId(null);
    setSubCategoryId(null);
    setLatitude(null);
    setLongitude(null);
    setIsActive(false);
  }, [setRegionId, setSubCategoryId, setLatitude, setLongitude, setIsActive]);

  const extractLastPart = (text: string): string => {
    const lastIndex = text.lastIndexOf(' ');
    return lastIndex !== -1 ? text.substring(lastIndex + 1) : text;
  };

  const handleFilterChange = (
    regionId: number | null,
    subCategoryId: number | null
  ) => {
    setRegionId(regionId);
    setSubCategoryId(subCategoryId);
  };

  const handleDistanceFilterChange = (
    lat: number | null,
    long: number | null
  ) => {
    const active = lat !== null && long !== null;
    setLatitude(lat);
    setLongitude(long);
    setIsActive(active);
  };

  if (error) {
    return ReactDOM.createPortal(
      <div className='h-100vh fixed inset-0 z-50 flex items-start justify-center bg-background'>
        <div className='flex h-[100%] w-[400px] flex-col overflow-y-scroll bg-white'>
          <div className='flex h-[72px] w-[400px] items-center px-2 py-3'>
            <button onClick={closeModal} className='mr-[8px] font-extrabold'>
              <GoChevronLeft className='text-[24px] opacity-[70%]' />
            </button>
            <p className='py-[18px] font-semibold'>{extractLastPart(title)}</p>
          </div>
          <div className='flex items-center gap-[10px] px-3 py-[15px]'>
            {error}
          </div>
        </div>
      </div>,
      document.getElementById('modal-root')!
    );
  }

  const scrollbarRef = useRef<Scrollbars>(null);

  return ReactDOM.createPortal(
    <div className='h-100vh fixed inset-0 z-50 flex items-start justify-center bg-background'>
      <Scrollbars
        style={{
          width: '400px',
          height: '100%',
        }}
        ref={scrollbarRef}
        renderThumbVertical={renderThumbVertical}
        autoHide
      >
        <div className='flex flex-col bg-white'>
          <div className='flex h-[72px] items-center px-2 py-3'>
            <button onClick={closeModal} className='mr-[8px] font-extrabold'>
              <GoChevronLeft className='text-[24px] opacity-[70%]' />
            </button>
            <p className='py-[18px] font-semibold'>{extractLastPart(title)}</p>
          </div>
          <div className='flex items-center gap-[10px] px-3 py-[15px]'>
            <FilterOptions
              regions={regions}
              subCategories={subCategories}
              onFilterChange={handleFilterChange}
            />
            <FilterDistance
              onDistanceFilterChange={handleDistanceFilterChange}
            />
          </div>
          <div>
            <PlaceList selectPlace={selectPlace} tapRegions={regions} />
          </div>
        </div>
        <ScrollToTopBtn scrollbarRef={scrollbarRef} />
      </Scrollbars>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default PlaceFilter;
