/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import MyReviewItem from './MyReviewItem';
// import ScrollToTopButton from './ScrollToTopButton';

interface ReviewData {
  id: number;
  place_image: string;
  place_name: string;
  rating_point: number;
  create_date: string;
  content: string;
  comments_images: string[];
}

const fetchPlaces = async (page: number) => {
  const params: any = {
    page,
    page_size: 10,
  };
  try {
    const response = await axios.get(
      'http://127.0.0.1:8000/users/mypage/my-comment/',
      { params, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error('정보 가져오기 실패:', error);
    return { results: [], next: null };
  }
};

const MyReviewList: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const loadMorePlaces = async (initialLoad: boolean = false) => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchPlaces(initialLoad ? 1 : page);

      const newReview = response?.results || [];

      if (initialLoad) {
        if (newReview.length === 0) {
          setError('최근 본 장소가 없습니다.');
          setHasMore(false);
          setReviews([]);
        } else {
          setReviews(newReview);
          setPage(2);
          setHasMore(!!response.next);
        }
      } else {
        if (newReview.length === 0) {
          setHasMore(false);
        } else {
          setReviews((prevPlaces) => [...prevPlaces, ...newReview]);
          setPage((prevPage) => prevPage + 1);
          setHasMore(!!response.next);
        }
      }
    } catch (error) {
      console.error('장소 더 가져오기 실패:', error);
      setError('장소를 가져오는데 실패했습니다.');
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  const { observerElem } = useInfiniteScroll(
    () => loadMorePlaces(false),
    hasMore && !isLoading
  );

  useEffect(() => {
    loadMorePlaces(true);
  }, []);

  return (
    <div ref={scrollContainerRef}>
      {error && !isLoading && !reviews.length && (
        <div className='py-4 text-center text-[14px] text-caption'>{error}</div>
      )}
      <div className='gap-[10px] py-2'>
        {reviews.map((review: ReviewData, index) => (
          <MyReviewItem
            key={review.id}
            className={index === 0 ? 'first' : ''}
            reviewText={review.content}
            placeName={review.place_name}
            ratingPoint={review.rating_point}
            createDate={review.create_date}
            commentImages={review.comments_images}
          />
        ))}
      </div>
      {isLoading && (
        <div className='py-4 text-center text-[14px] text-caption'>
          가져오는 중...
        </div>
      )}
      {hasMore && <div ref={observerElem} className='h-1' />}

      {/* <ScrollToTopButton scrollContainerRef={scrollContainerRef} /> */}
    </div>
  );
};

export default MyReviewList;
