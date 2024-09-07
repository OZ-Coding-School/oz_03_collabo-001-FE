import { useState, useEffect } from 'react';
import axios from 'axios';
import more from '../../assets/More.svg';
import { FaPlus } from 'react-icons/fa6';
import useModalWithURL from '../../hooks/useModalWithURL';
import AllImagesModal from '../../components/modal/AllImagesModal';

interface ReviewPicturesProps {
  placeId: string | number;
}

interface reviewImages {
  image: string;
}

const ReviewPictures: React.FC<ReviewPicturesProps> = ({ placeId }) => {
  const [reviewImages, setReviewImages] = useState<reviewImages[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const numberOfItems = 3;
  const items = Array.from({ length: numberOfItems }, (_, index) => index);
  const { isOpen, openThirdModal, closeModal } = useModalWithURL(
    `allImagesModal_${placeId}`
  );

  useEffect(() => {
    const fetchReviewPictures = async () => {
      try {
        const response = await axios.get(
          `https://api.dogandbaby.co.kr/places/${placeId}/comments/images/`
        );

        setReviewImages(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('전체 후기 이미지를 불러오는데 실패했습니다.:', error);

        setError('전체 후기 이미지를 불러오는데 실패했습니다.');
        setIsLoading(false);
      }
    };

    fetchReviewPictures();
  }, [placeId]);

  const handleMoreImagesClick = () => {
    openThirdModal();
  };

  if (isLoading) {
    return (
      <div className='bg-white py-4 text-center text-[14px] text-caption'>
        로딩 중...
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-white py-4 text-center text-[14px] text-caption'>
        {error}
      </div>
    );
  }

  return (
    <div>
      {reviewImages.length > 0 && (
        <div className='col'>
          <div className='colTitle flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <p className='font-semibold'>사진모아보기</p>
            </div>
            <button
              type='button'
              aria-label='사진모아보기'
              onClick={handleMoreImagesClick}
            >
              <img src={more} alt='더보기 아이콘' aria-hidden />
            </button>
          </div>
          {reviewImages.length > 3 ? (
            <div className='flex justify-between'>
              {items.map((_, i) => {
                return (
                  <div
                    key={i}
                    className='imgWrap relative flex h-[115px] w-[115px] overflow-hidden rounded-[10px] border-2 border-border bg-background'
                  >
                    {i === 2 ? (
                      <button
                        onClick={handleMoreImagesClick}
                        className='absolute bottom-0 left-0 right-0 top-0 flex cursor-pointer items-center justify-center bg-black-50 text-[14px] text-white'
                      >
                        <FaPlus className='mr-[5px] text-[12px]' />
                        더보기
                      </button>
                    ) : null}
                    <img
                      src={`${reviewImages[i].image}`}
                      alt=''
                      className='h-[115px] w-[115px] object-cover'
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className='flex gap-[10px]'>
              {reviewImages.map((_, i) => {
                return (
                  <div
                    key={i}
                    className='imgWrap h-[115px] w-[115px] overflow-hidden rounded-[10px] border-2 border-border bg-background'
                  >
                    <img
                      src={`${reviewImages[i].image}`}
                      alt=''
                      className='h-[115px] w-[115px] object-cover'
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      {isOpen && <AllImagesModal placeId={placeId} closeModal={closeModal} />}
    </div>
  );
};

export default ReviewPictures;
