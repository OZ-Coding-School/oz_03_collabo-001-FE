import { useState, useEffect } from 'react';
import axios from 'axios';

//카테고리별 배너, 추천장소 가져오기

interface images {
  image: string;
}

interface places {
  address: string;
  comments_count: number;
  id: number;
  is_bookmarked: boolean;
  name: string;
  place_region: number;
  place_subcategory: number;
  rating: number;
  store_image: string;
}

interface RecoPlaceItem {
  content: string;
  places: places;
  tags: number[];
}

interface CategoryData {
  bannerImgs: images[];
  recoPlaces: RecoPlaceItem[];
}

const useFetchCategoryData = (category: string) => {
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/places/${category}/main/`
        );

        // 배열에서 랜덤으로 선택하는 함수
        const getRandomArrays = <T>(arr: T[], num: number): T[] => {
          const shuffled = [...arr].sort(() => 0.5 - Math.random());
          return shuffled.slice(0, num);
        };

        // 초기데이터
        let bannerImages: images[] = response.data.banners;
        let recoPlaces: RecoPlaceItem[] = response.data.recommandedplaces;

        // 배너의 개수가 8개보다 많을경우 랜덤으로 8개 선택
        if (bannerImages.length > 8) {
          bannerImages = getRandomArrays(bannerImages, 8);
        }

        // 추천장소의 개수가 4개보다 많을경우 랜덤으로 4개 선택
        if (recoPlaces.length > 4) {
          recoPlaces = getRandomArrays(recoPlaces, 4);
        }

        // fetchedData 설정
        const fetchedData: CategoryData = {
          bannerImgs: bannerImages,
          recoPlaces: recoPlaces,
        };

        // 상태 설정
        // console.log(response.data);
        setCategoryData(fetchedData);
        setLoading(false);
      } catch (error) {
        console.log('error : ', error);
        setError('failed to fetch data');
        setLoading(false);
      }
    };
    fetchPlaces();
  }, [category]);

  return { categoryData, loading, error };
};

export default useFetchCategoryData;
