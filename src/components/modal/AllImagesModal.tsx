import React, { useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import Scrollbars from 'react-custom-scrollbars-2';
import axios from 'axios';
import AllImages from '../../page/Detail/AllImagesImage';

interface Props {
  placeId: string | number;
  closeModal: () => void;
}

interface User {
  profile_image: string;
  nickname: string;
  email: string;
}

interface Image {
  url: string;
  created_at: string;
  updated_at: string;
}

interface Review {
  user: User;
  id: number;
  content: string;
  rating: number;
  images: Image[];
  created_at: string;
  updated_at: string;
}

const AllImagesModal: React.FC<Props> = ({ placeId, closeModal }) => {
  const [reviews, setReviews] = React.useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.dogandbaby.co.kr/places/${placeId}/comments/`
        );
        setReviews(response.data);
      } catch (error) {
        console.log('전체 후기 이미지를 불러오는데 실패했습니다: ', error);
      }
    };

    fetchReviews();
  }, [placeId]);

  return (
    <div
      className='fixed inset-0 z-20 flex h-screen items-start justify-center bg-black-50'
      // modal-root에 추가된 이벤트 리스너는 이곳에 필요하지 않음
    >
      <div className='fixed left-1/2 top-1/2 flex w-[90%] max-w-[380px] -translate-x-1/2 -translate-y-1/2 flex-col gap-2 overflow-hidden rounded-lg bg-white p-[20px]'>
        <div className='mb-[20px] flex justify-between'>
          <p className='font-semibold'>사진모아보기</p>
          <button onClick={closeModal}>
            <IoClose className='text-[20px] text-caption' />
          </button>
        </div>
        <Scrollbars style={{ width: '100%', height: '500px' }} autoHide>
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
        </Scrollbars>
      </div>
    </div>
  );
};

export default AllImagesModal;
