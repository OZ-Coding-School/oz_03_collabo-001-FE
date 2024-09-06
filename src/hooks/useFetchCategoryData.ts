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
          `https://api.dogandbaby.co.kr/places/${category}/main/`,
          { withCredentials: true }
        );

        const getRandomArrays = <T>(arr: T[], num: number): T[] => {
          const shuffled = [...arr].sort(() => 0.5 - Math.random());
          return shuffled.slice(0, num);
        };

        let bannerImages: Image[] = response.data.banners || [];
        let recoPlaces: RecoPlaceItem[] = response.data.recommandedplaces || [];
        const newPlaces: Place[] = response.data.new_places || [];
        const regionPlaces: Place[] = response.data.region_places || [];
        const subcategoryPlaces: Place[] = response.data.subcategory || [];
        const placeRegions: PlaceRegion[] = response.data.place_regions || [];
        const placeSubcategories: PlaceSubcategory[] =
          response.data.place_subcategories || [];

        if (bannerImages.length > 8) {
          bannerImages = getRandomArrays(bannerImages, 8);
        }

        if (recoPlaces.length > 4) {
          recoPlaces = getRandomArrays(recoPlaces, 4);
        }

        const fetchedData: CategoryData = {
          bannerImgs: bannerImages,
          recoPlaces: recoPlaces,
          newPlaces: newPlaces,
          regionPlaces: regionPlaces,
          subcategoryPlaces: subcategoryPlaces,
          tapRegions: placeRegions,
          tapSubcategories: placeSubcategories,
        };

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
