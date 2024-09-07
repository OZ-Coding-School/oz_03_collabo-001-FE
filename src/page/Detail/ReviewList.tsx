import axios from 'axios';
import { useState, useEffect } from 'react';
import ReviewListItem from './ReviewListItem';
import useModalWithURL from '../../hooks/useModalWithURL';
import MoreReviewModal from '../../components/modal/MoreReviewModal';

interface ReviewListProps {
  placeId: string | number;
  reviewCount: number;
}

interface Images {
  url: string;
}

interface User {
  profile_image: string;
  nickname: string;
}

interface ReviewData {
  user: User;
  id: number;
  content: string;
  rating: number;
  images: Images[];
  updated_at: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ placeId, reviewCount }) => {
  const { isOpen, openThirdModal, closeModal } = useModalWithURL(`TestModal`);

  const [reviewData, setReviewData] = useState<ReviewData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fecthReviews = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.dogandbaby.co.kr/places/${placeId}/comments/`
        );

        setReviewData(response.data);
      } catch (error) {
        console.log('리뷰 데이터를 불러오는데 실패했습니다 :', error);

        setError('후기를 가져오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fecthReviews();
  }, [placeId]);

  const maxReviewCount = 3;

  function formatDate(date: string) {
    const newDate = new Date(date);
    return newDate.toISOString().slice(0, 10).replace(/-/g, '.');
  }

  return (
    <div className='col pb-[20px]'>
      <div className='colTitle flex items-center justify-between'>
        <p className='font-semibold'>
          후기 <span className='text-primary'>{reviewCount}</span>개
        </p>
      </div>

      {isLoading ? (
        <div className='text-center'>리뷰 데이터를 불러오고 있습니다...</div>
      ) : error ? (
        <div className='text-red-500 text-center'>{error}</div>
      ) : (
        <>
          {reviewData && (
            <div>
              {reviewData.slice(0, maxReviewCount).map((data, index) => (
                <ReviewListItem
                  key={data.id}
                  id={data.id}
                  className={index === 2 ? 'noBorder' : ''}
                  reviewText={data.content}
                  nickname={data.user.nickname}
                  profile_img={data.user.profile_image}
                  rating={data.rating}
                  updateDate={formatDate(data.updated_at)}
                  images={data.images}
                />
              ))}
            </div>
          )}

          {reviewCount > maxReviewCount && (
            <button
              className='h-[35px] w-full rounded-[5px] border-2 border-border text-center text-[14px]'
              onClick={() => {
                openThirdModal();
              }}
            >
              후기 {reviewCount}개 모두 보기
            </button>
          )}

          {reviewCount === 0 && (
            <div className='py-4 text-[14px] text-caption'>
              작성된 후기가 없습니다.
            </div>
          )}
          {isOpen && (
            <MoreReviewModal reviewData={reviewData} closeModal={closeModal} />
          )}
        </>
      )}
    </div>
  );
};

export default ReviewList;
