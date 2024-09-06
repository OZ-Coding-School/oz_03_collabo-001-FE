import { useState, useEffect } from 'react';
import axios from 'axios';

interface images {
  image: string;
}

interface ServiceIcon {
  image: string;
  name: string;
}

interface PlaceData {
  id: number;
  name: string;
  address: string;
  rating: number;
  storeImage: string;
  reviewCount: number;
  price: string;
  link: string;
  instruction: string;
  tags: string;
  bannerImgs: images[];
  contentImgs: string[];
  reviewImgs: string[];
  serviceIcons: ServiceIcon[];
  isBookmark: boolean;
}

const useFetchPlaceData = (placeId: number) => {
  const [placeData, setPlaceData] = useState<PlaceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/places/${placeId}/`,
          { withCredentials: true }
        );

        const fetchedData: PlaceData = {
          id: placeId,
          name: response.data.name,
          address: response.data.address,
          rating: response.data.rating,
          reviewCount: response.data.comments_count,
          storeImage: response.data.store_image,
          price: response.data.price_text,
          link: response.data.price_link,
          tags: response.data.description_tags,
          instruction: response.data.instruction,
          bannerImgs: response.data.images,
          contentImgs: response.data.description_images,
          reviewImgs: response.data.comment_images,
          serviceIcons: response.data.service_icons,
          isBookmark: response.data.bookmark,
        };
        setPlaceData(fetchedData);
        setLoading(false);

        console.log(response.data.service_icons);
      } catch (error) {
        console.log('error : ', error);
        setError('failed to fetch data');
        setLoading(false);
      }
    };
    fetchPlaces();
  }, [placeId]);

  return { placeData, loading, error };
};

export default useFetchPlaceData;
