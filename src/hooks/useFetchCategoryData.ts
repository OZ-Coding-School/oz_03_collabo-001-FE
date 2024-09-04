import { useState, useEffect } from 'react';
import axios from 'axios';

interface Image {
  image: string;
  url_link?: string;
}

interface Place {
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
  places: Place;
  tags: number[];
}

interface PlaceRegion {
  id: number;
  region: string;
}

interface PlaceSubcategory {
  id: number;
  subcategory: string;
}

interface CategoryData {
  bannerImgs: Image[];
  recoPlaces: RecoPlaceItem[];
  newPlaces: Place[];
  regionPlaces: Place[];
  subcategoryPlaces: Place[];
  tapRegions: PlaceRegion[];
  tapSubcategories: PlaceSubcategory[];
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

        // 초기 데이터
        let bannerImages: Image[] = response.data.banners || [];
        let recoPlaces: RecoPlaceItem[] = response.data.recommandedplaces || [];
        const newPlaces: Place[] = response.data.new_places || [];
        const regionPlaces: Place[] = response.data.region_places || [];
        const subcategoryPlaces: Place[] = response.data.subcategory || [];
        const placeRegions: PlaceRegion[] = response.data.place_regions || [];
        const placeSubcategories: PlaceSubcategory[] =
          response.data.place_subcategories || [];

        // 배너의 개수가 8개보다 많을 경우 랜덤으로 8개 선택
        if (bannerImages.length > 8) {
          bannerImages = getRandomArrays(bannerImages, 8);
        }

        // 추천 장소의 개수가 4개보다 많을 경우 랜덤으로 4개 선택
        if (recoPlaces.length > 4) {
          recoPlaces = getRandomArrays(recoPlaces, 4);
        }

        // fetchedData 설정
        const fetchedData: CategoryData = {
          bannerImgs: bannerImages,
          recoPlaces: recoPlaces,
          newPlaces: newPlaces,
          regionPlaces: regionPlaces,
          subcategoryPlaces: subcategoryPlaces,
          tapRegions: placeRegions,
          tapSubcategories: placeSubcategories,
        };

        // 상태 설정
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