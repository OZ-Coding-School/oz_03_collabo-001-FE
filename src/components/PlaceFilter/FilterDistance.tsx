import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import useGeolocation from '../../hooks/useGeolocation';
import LocationStore from '../../store/locationStore'; // Zustand 스토어 임포트

const FilterDistance = () => {
  const [isChecked, setIsChecked] = useState(false);
  const { getLocation } = useGeolocation();
  const address = LocationStore((state) => state.address); // Zustand에서 주소 가져오기

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);

    if (!isChecked) {
      if (address) {
        console.log('저장된 주소 사용:', address);
      } else {
        console.log('지역 정보 가져오는중...');
        getLocation();
      }
    } else {
      console.log('체크 해제');
    }
  };

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
