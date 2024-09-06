import { useEffect, useState } from 'react';
import axios from 'axios';
import useLocationStore from '../store/locationStore';

const useGeolocation = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const setAddress = useLocationStore((state) => state.setAddress);
  const address = useLocationStore((state) => state.address);

  const getLocation = () => {
    setIsLoading(true);
    setError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude: lat, longitude: lon } = position.coords;
        setLatitude(lat);
        setLongitude(lon);

        try {
          const response = await axios.get(
            `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}`,
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
            setError(null);
          } else {
            setError('현위치를 찾을 수 없습니다.');
          }
        } catch (error) {
          console.error('현위치 가져오기 실패 :', error);
          setError('현위치를 가져오는 데 실패했습니다.');
        } finally {
          setIsLoading(false);
        }
      });
    } else {
      setError('위치 정보 사용을 허용해주세요.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      console.log('주소 업데이트됨:', address);
    }
  }, [address]);

  return { address, latitude, longitude, error, isLoading, getLocation };
};

export default useGeolocation;
