import React from 'react';
import useGeolocation from '../hooks/useGeolocation';
import GPS from '../assets/GPS.svg';

const MyGPS: React.FC = () => {
  const { address, error, getLocation } = useGeolocation();

  const getButtonText = () => {
    if (error) return `오류 : ${error}`;
    if (address) return `현재 위치 : ${address}`;
    return '내 위치';
  };

  return (
    <div>
      <button
        className='flex items-center'
        onClick={() => {
          if (!address) {
            getLocation();
          }
        }}
      >
        <img src={GPS} alt='GPS icon' className='h-[10px] pr-1' />
        <span className='text-[8px] text-caption hover:underline'>
          {getButtonText()}
        </span>
      </button>
    </div>
  );
};

export default MyGPS;
