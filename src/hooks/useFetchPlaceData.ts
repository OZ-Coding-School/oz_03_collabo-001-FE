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
  name: string;
  address: string;
  rating: number;
  storeImage: string;
  reviewCount: number;
  price: string;
  instruction: string;
  tags: string;
  bannerImgs: images[];
  contentImgs: string[];
  reviewImgs: string[];
  serviceIcons: ServiceIcon[];
}

const useFetchPlaceData = (placeId: string | number) => {
  const [placeData, setPlaceData] = useState<PlaceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/places/${placeId}/`
        );

        const fetchedData: PlaceData = {
          name: response.data.name,
          address: response.data.address,
          rating: response.data.rating,
          reviewCount: response.data.comments_count,
          storeImage: response.data.store_image,
          price: response.data.price_text,
          tags: response.data.description_tags,
          instruction: response.data.instruction,
          bannerImgs: response.data.images,
          contentImgs: response.data.description_images,
          reviewImgs: response.data.comment_images,
          serviceIcons: response.data.service_icons,
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
