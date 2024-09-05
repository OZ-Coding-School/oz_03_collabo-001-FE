import axios from 'axios';
import { useState, useEffect } from 'react';
import ReviewListItem from './ReviewListItem';

interface ReviewListProps {
  placeId: string | number;
  reviewCount: number;
}

interface Images {
  url: string;
}

interface user {
  nickname: string;
  // profile: string;
}

interface ReviewData {
  content: string;
  images: Images[];
  rating: number;
  date: string;
  user: user;
}

const ReviewList: React.FC<ReviewListProps> = ({ placeId, reviewCount }) => {
  const [reviewData, setReviewData] = useState<ReviewData[] | null>(null);

  useEffect(() => {
    const fecthReviews = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/places/${placeId}/comments/`
        );
        setReviewData(response.data);
      } catch (error) {
        console.log('리뷰 데이터를 불러오는데 실패했습니다 :', error);
      }
    };

    fecthReviews();
  }, [placeId]);

  // 리뷰는 3개만 우선 보이도록
  const reviewItemCount = 3;
  const reviewItems = Array.from({ length: reviewItemCount });

  return (
    <div className='col pb-[20px]'>
      <div className='colTitle flex items-center justify-between'>
        <p className='font-semibold'>
          후기 <span className='text-primary'>{reviewCount}</span>개
        </p>
      </div>

      {reviewCount <= 0 ? (
        <NoReview />
      ) : (
        <>
          {reviewData &&
            reviewItems.map((_, index) => {
              return (
                <ReviewListItem
                  key={index}
                  className={index === 2 ? 'noBorder' : ''}
                  reviewText={reviewData[index].content}
                  images={reviewData[index].images}
                  rating={reviewData[index].rating}
                  nickname={reviewData[index].user.nickname}
                />
              );
            })}

          {reviewCount > 3 ? (
            <button className='h-[35px] w-full rounded-[5px] border-2 border-border text-center text-[14px]'>
              후기 {reviewCount}개 모두보기
            </button>
          ) : null}
        </>
      )}
    </div>
  );
};

const NoReview = () => {
  return (
    <div className='py-4 text-[14px] text-caption'>작성한 후기가 없습니다.</div>
  );
};

export default ReviewList;
