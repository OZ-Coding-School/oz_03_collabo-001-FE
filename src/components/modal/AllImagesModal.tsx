import axios from 'axios';
import { useEffect, useState } from 'react';
import AllImages from '../../page/Detail/AllImagesImage';

interface Props {
  placeId: string | number;
  closeModal: () => void;
}

interface user {
  profile_image: string;
  nickname: string;
  email: string;
}
interface image {
  url: string;
  created_at: string;
  updated_at: string;
}

interface review {
  user: user;
  id: number;
  content: string;
  rating: number;
  images: image[];
  created_at: string;
  updated_at: string;
}

const AllImagesModal: React.FC<Props> = ({ placeId, closeModal }) => {
  const [reviews, setReviews] = useState<review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.dogandbaby.co.kr/places/${placeId}/comments/`
        );
        setReviews(response.data);
      } catch (error) {
        console.log('전체 후기이미지를 불러오는데 실패했습니다. : ', error);
      }
    };

    fetchReviews();
  }, [placeId]);

  return (
    <div className='fixed inset-0 z-20 flex h-screen items-start justify-center bg-black-50'>
      <div className='flex w-[400px] flex-col gap-2'>
        <div>
          <button onClick={closeModal} className='ml-2 text-white'>
            x
          </button>
        </div>
        <div className='grid grid-cols-3 gap-2 overflow-y-auto'>
          {reviews.map((review) =>
            review.images.map((image, i) => (
              <AllImages
                key={i}
                unique={i}
                review={review}
                imageUrl={image.url}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllImagesModal;
