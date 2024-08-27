import { useState } from 'react';
import axios from 'axios';
import LocationStore from '../store/LocationStore';

const useGeolocation = () => {
  const [error, setError] = useState<string | null>(null);
  const setAddress = LocationStore((state) => state.setAddress);
  const address = LocationStore((state) => state.address);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await axios.get(
              `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
              {
                headers: {
                  Authorization: `KakaoAK ${import.meta.env.VITE_REACT_APP_KAKAO_API_KEY}`,
                },
              }
            );

            const documents = response.data.documents;
            if (documents.length > 0) {
              const {
                region_1depth_name,
                region_2depth_name,
                region_3depth_name,
              } = documents[0].address;

              const formattedAddress = `${region_1depth_name} ${region_2depth_name} ${region_3depth_name}`;
              setAddress(formattedAddress);
              console.log('현위치 :', formattedAddress);
            } else {
              setAddress('현위치를 찾을 수 없습니다.');
            }
          } catch (error) {
            console.error('Error fetching address:', error);
            setError('현위치를 가져오는 데 실패했습니다.');
          }
        },
        (err) => {
          console.error('Error getting location:', err);
          setError('위치 정보를 가져오는 데 실패했습니다.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  return { address, error, getLocation };
};

export default useGeolocation;
