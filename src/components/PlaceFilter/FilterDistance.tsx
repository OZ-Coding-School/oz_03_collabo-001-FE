import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const FilterDistance = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);

    if (!isChecked) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            console.log('User location:', latitude, longitude);
            console.log(location);
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    } else {
      setLocation(null);
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
      {/* {location && (
        <div className='text-gray-600 ml-4 text-sm'>
          <p>위도: {location.latitude}</p>
          <p>경도: {location.longitude}</p>
        </div>
      )} */}
    </div>
  );
};

export default FilterDistance;
