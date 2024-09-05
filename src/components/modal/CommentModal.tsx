import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { GoChevronLeft } from 'react-icons/go';
import axios from 'axios';
import MyReviewListItem from '../../page/MyPage/Review/MyReviewListItem';
import Scrollbars from 'react-custom-scrollbars-2';
import renderThumbVertical from '../CustomScrollbar/renderThumbVertical';
import ScrollToTopBtn from '../CustomScrollbar/ScrollToTopBtn';

interface CommentModalProps {
  title: string;
  closeModal: () => void;
}

interface Comment {
  id: number;
  place_image: string;
  place_name: string;
  rating_point: number;
  create_date: string;
  content: string;
  comments_images: string[];
}

const CommentModal: React.FC<CommentModalProps> = ({ title, closeModal }) => {
  const [reviews, setReviews] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const fetchReviews = async () => {
      try {
        const response = await axios.get<Comment[]>(
          'http://127.0.0.1:8000/users/mypage/my-comment/',
          { withCredentials: true }
        );

        if (response.status === 200) {
          console.log('서버 연결 성공');
        }

        setReviews(response.data);
        setLoading(false);
      } catch (error) {
        console.error('댓글 데이터를 가져오는 데 실패했습니다.', error);
        setError('데이터를 가져오는 데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchReviews();

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const scrollbarRef = useRef<Scrollbars>(null);

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className='flex items-start justify-center overflow-x-hidden bg-white'>
      <Scrollbars
        style={{
          width: '100%',
          height: '100vh',
        }}
        ref={scrollbarRef}
        renderThumbVertical={renderThumbVertical}
        autoHide
      >
        <div>
          <div className='col'>
            <div className='colTitle flex h-[72px] items-center'>
              <button onClick={closeModal} className='mr-[8px] font-extrabold'>
                <GoChevronLeft className='text-[24px] opacity-[70%]' />
              </button>
              <p className='py-[18px] font-semibold'>{title}</p>
            </div>
            <div className='p-4'>
              {loading && (
                <p className='py-4 text-center text-[14px] text-caption'>
                  로딩 중...
                </p>
              )}
              {error && (
                <p className='py-4 text-center text-[14px] text-caption'>
                  {error}
                </p>
              )}
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <MyReviewListItem
                    key={review.id}
                    className={index === 0 ? 'first' : ''}
                    reviewText={review.content}
                    placeName={review.place_name}
                    ratingPoint={review.rating_point}
                    createDate={review.create_date}
                    commentImages={review.comments_images}
                  />
                ))
              ) : (
                <div className='py-4 text-center text-[14px] text-caption'>
                  작성한 후기가 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>
        <ScrollToTopBtn scrollbarRef={scrollbarRef} />
      </Scrollbars>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default CommentModal;
