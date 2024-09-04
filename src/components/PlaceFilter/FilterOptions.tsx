/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState, useRef, useEffect } from 'react';
import Filter from '../../assets/Icon/Detail_Icon/Filter.svg';
import { twMerge } from 'tailwind-merge';
import { useFilterStore } from '../../store/filterStore';

type Option = {
  value: number;
  label: string;
};

type CustomSelectProps = {
  options: Option[];
  value: number | null;
  onChange: (value: number) => void;
  placeholder: string;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

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
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <img src={Filter} alt='아래 화살표' />
      </div>
      {isOpen && (
        <div className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-caption bg-white text-sm font-medium text-[#333333] shadow-lg'>
          {options.map((option) => (
            <div
              key={option.value}
              className={twMerge(
                'cursor-pointer px-3 py-2 text-sm',
                option.value === value && 'bg-indigo-100'
              )}
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

interface RegionType {
  id: number;
  region: string;
}

interface SubCategoryType {
  id: number;
  subcategory: string;
}

interface FilterOptionsProps {
  regions: RegionType[];
  subCategories: SubCategoryType[];
  onFilterChange: (
    regionId: number | null,
    subCategoryId: number | null
  ) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  regions,
  subCategories,
  onFilterChange,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(
    null
  );

  const setRegionId = useFilterStore((state) => state.setRegionId);
  const setSubCategoryId = useFilterStore((state) => state.setSubCategoryId);

  const regionOptions: Option[] = [
    ...regions.map((region) => ({
      value: region.id,
      label: region.region,
    })),
  ];

  const subCategoryOptions: Option[] = [
    ...subCategories.map((subCategory) => ({
      value: subCategory.id,
      label: subCategory.subcategory,
    })),
  ];

  const handleRegionSelect = (regionId: number) => {
    setSelectedRegion(regionId);
    setRegionId(regionId);
    console.log('Selected Region ID:', regionId);
    onFilterChange(regionId, selectedSubCategory);
  };

  const handleSubCategorySelect = (subCategoryId: number) => {
    setSelectedSubCategory(subCategoryId);
    setSubCategoryId(subCategoryId);
    console.log('Selected SubCategory ID:', subCategoryId);
    onFilterChange(selectedRegion, subCategoryId);
  };

  return (
    <div className='flex gap-[10px]'>
      <CustomSelect
        options={regionOptions}
        value={selectedRegion}
        onChange={handleRegionSelect}
        placeholder='지역'
      />
      <CustomSelect
        options={subCategoryOptions}
        value={selectedSubCategory}
        onChange={handleSubCategorySelect}
        placeholder='장소'
      />
    </div>
  );
};

export default FilterOptions;
