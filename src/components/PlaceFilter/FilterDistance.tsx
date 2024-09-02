/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import useGeolocation from '../../hooks/useGeolocation';

interface FilterDistanceProps {
  onDistanceFilterChange: (
    latitude: number | null,
    longitude: number | null,
    isChecked: boolean
  ) => void;
}

const FilterDistance: React.FC<FilterDistanceProps> = ({
  onDistanceFilterChange,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const { getLocation, latitude, longitude } = useGeolocation();

  const handleCheckboxChange = useCallback(() => {
    setIsChecked((prev) => {
      if (prev) {
        console.log('거리순 필터링 비활성화');
        onDistanceFilterChange(null, null, false);
      } else {
        if (latitude && longitude) {
          console.log('저장된 위치 사용:', latitude, longitude);
          onDistanceFilterChange(latitude, longitude, true);
        } else {
          console.log('위치 정보 가져오는 중...');
          getLocation();
        }
      }
      return !prev;
    });
  }, [latitude, longitude, onDistanceFilterChange, getLocation]);

  useEffect(() => {
    if (latitude !== null && longitude !== null && isChecked) {
      onDistanceFilterChange(latitude, longitude, isChecked);
    }
  }, [latitude, longitude, isChecked]);

  return (
    <div className='flex items-center justify-center'>
      <input
        type='checkbox'
        id='distanceFilter'
        checked={isChecked}
        onChange={handleCheckboxChange}
        className={twMerge(
          'h-5 w-5 cursor-pointer appearance-none rounded-md border border-caption bg-white',
          isChecked ? 'bg-checkBox bg-contain bg-center' : ''
        )}
      />
      <label
        htmlFor='distanceFilter'
        className='cursor-pointer pl-2 text-[12px] text-caption'
      >
        거리순
      </label>
    </div>
  );
};

export default FilterDistance;
