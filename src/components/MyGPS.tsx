import React from 'react';
import useGeolocation from '../hooks/useGeolocation';
import GPS from '../assets/GPS.svg';

const MyGPS: React.FC = () => {
  const { address, error, isLoading, getLocation } = useGeolocation();

  return (
    <button
      className='flex items-center'
      onClick={() => {
        getLocation();
      }}
    >
      <img src={GPS} alt='GPS icon' className='h-[10px] pr-1' />
      <span className='text-[8px] text-caption hover:underline'>
        {isLoading
          ? '현위치를 가져오는 중입니다...'
          : error
            ? `오류 : ${error}`
            : address
              ? `현위치 : ${address}`
              : '내 위치 보기'}
      </span>
    </button>
  );
};

export default MyGPS;
