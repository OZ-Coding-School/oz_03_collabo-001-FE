import { useEffect, useState } from 'react';
import axios from 'axios';
import LocationStore from '../store/LocationStore';

const useGeolocation = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const setAddress = LocationStore((state) => state.setAddress);
  const address = LocationStore((state) => state.address);

  const getLocation = () => {
    setIsLoading(true);
    setError(null);

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
              setError(null);

              console.log('현위치:', formattedAddress);
            } else {
              setError('현위치를 찾을 수 없습니다.');
            }
          } catch (error) {
            console.error('현위치 가져오기 실패 :', error);
            setError('현위치를 가져오는 데 실패했습니다.');
          } finally {
            setIsLoading(false); // 로딩 끝
          }
        },
        (err) => {
          console.error('현위치 가져오기 실패 :', err);
          setError('위치 정보 사용을 허용해주세요.');
          setIsLoading(false); // 로딩 끝
        }
      );
    } else {
      setError('위치 정보 사용을 허용해주세요.');
      setIsLoading(false); // 로딩 끝
    }
  };
  useEffect(() => {
    if (address) {
      console.log('주소 업데이트됨:', address);
    }
  }, [address]);

  return { address, error, isLoading, getLocation };
};

export default useGeolocation;
