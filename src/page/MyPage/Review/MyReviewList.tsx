/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyReviewItem from './MyReviewItem';

interface ReviewData {
  id: string;
  place_image: string;
  place_name: string;
  rating_point: number;
  update_at: string;
  content: string;
  comments_images: string[];
}

const fetchPlaces = async () => {
  try {
    const response = await axios.get(
      'https://api.dogandbaby.co.kr/users/mypage/my-comment/',
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error('정보 가져오기 실패:', error);

    return { results: [] };
  }
};

const MyReviewList: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlaces = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchPlaces();
        const newPlaces = response || [];

        if (newPlaces.length === 0) {
          setError('작성한 후기가 없습니다.');
        } else {
          setReviews(newPlaces);
        }
      } catch (error) {
        console.error('후기 가져오기 실패:', error);

        setError('후기를 가져오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    loadPlaces();
  }, []);

  return (
    <>
      {error && !isLoading && !reviews.length && (
        <div className='py-4 text-center text-[14px] text-caption'>{error}</div>
      )}
      <div className='gap-[10px] py-2'>
        {reviews.map((review: ReviewData, index) => (
          <MyReviewItem
            key={review.id}
            id={review.id}
            className={index === 0 ? 'first' : ''}
            reviewText={review.content}
            placeName={review.place_name}
            ratingPoint={review.rating_point}
            update_at={review.update_at}
            commentImages={review.comments_images}
          />
        ))}
      </div>
      {isLoading && (
        <div className='py-4 text-center text-[14px] text-caption'>
          가져오는 중...
        </div>
      )}
    </>
  );
};

export default MyReviewList;
