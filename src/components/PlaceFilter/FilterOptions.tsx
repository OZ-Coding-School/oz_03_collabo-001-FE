/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef, useEffect } from 'react';
import Filter from '../../assets/Icon/Detail_Icon/Filter.svg';

type Option = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  options: Option[];
  id: string;
  value: string;
  onChange: (value: string) => void;
};

const REGION_OPTIONS: Option[] = [
  { value: '', label: '지역' },
  { value: '전체', label: '전체' },
  { value: '서울', label: '서울' },
  { value: '경기', label: '경기' },
  { value: '인천', label: '인천' },
  { value: '충청', label: '충청' },
  { value: '강원', label: '강원' },
  { value: '전라', label: '전라' },
  { value: '경상', label: '경상' },
  { value: '제주', label: '제주' },
];

const PLACE_OPTIONS: Option[] = [
  { value: '', label: '장소' },
  { value: '전체', label: '전체' },
  { value: '카페', label: '카페' },
  { value: '펜션', label: '펜션' },
  { value: '음식점', label: '음식점' },
  { value: '야외/공원', label: '야외/공원' },
];

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption =
    options.find((option) => option.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative h-[35px] w-[115px]' ref={dropdownRef}>
      <div
        className='focus:ring-indigo-500 focus:border-indigo-500 flex h-full w-full cursor-pointer items-center justify-between rounded-md border border-caption px-3 py-2 text-sm focus:outline-none focus:ring-2'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='truncate text-sm font-medium text-[#333333]'>
          {selectedOption.label}
        </span>
        <img src={Filter} alt='아래 화살표' />
      </div>
      {isOpen && (
        <div className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-caption bg-white text-sm font-medium text-[#333333] shadow-lg'>
          {options.map((option) => (
            <div
              key={option.value}
              className={`hover:bg-gray-100 cursor-pointer px-3 py-2 text-sm ${option.value === value ? 'bg-indigo-100' : ''}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const FilterOptions: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
    console.log('Selected region:', region);
  };

  const handlePlaceSelect = (place: string) => {
    setSelectedPlace(place);
    console.log('Selected place:', place);
  };

  return (
    <div className='flex gap-[9px]'>
      <CustomSelect
        options={REGION_OPTIONS}
        id='region'
        value={selectedRegion}
        onChange={handleRegionSelect}
      />
      <CustomSelect
        options={PLACE_OPTIONS}
        id='place'
        value={selectedPlace}
        onChange={handlePlaceSelect}
      />
    </div>
  );
};

export default FilterOptions;
