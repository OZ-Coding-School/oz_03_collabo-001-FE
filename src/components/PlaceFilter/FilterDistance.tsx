/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import useGeolocation from '../../hooks/useGeolocation';
import { toast } from 'react-toastify';

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
    toast.info('위치 정보를 가져오는 중 입니다.', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    setIsChecked((prev) => {
      if (prev) {
        onDistanceFilterChange(null, null, false);
      } else {
        if (latitude && longitude) {
          onDistanceFilterChange(latitude, longitude, true);
        } else {
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
