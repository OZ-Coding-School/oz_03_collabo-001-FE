import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { GoChevronLeft } from 'react-icons/go';
import Scrollbars from 'react-custom-scrollbars-2';
import renderThumbVertical from '../CustomScrollbar/renderThumbVertical';
import ScrollToTopBtn from '../CustomScrollbar/ScrollToTopBtn';
import ReviewListItem from '../../page/Detail/ReviewListItem';

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

interface MoreReviewModalProps {
  closeModal: () => void;
  reviewData: ReviewData[] | null;
}

const MoreReviewModal: React.FC<MoreReviewModalProps> = ({
  closeModal,
  reviewData,
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const scrollbarRef = useRef<Scrollbars>(null);

  const modalRoot = document.getElementById('modal-root');

  function formatDate(date: string) {
    const newDate = new Date(date);
    return newDate.toISOString().slice(0, 10).replace(/-/g, '.');
  }

  if (!modalRoot) return null;
  return ReactDOM.createPortal(
    <div className='fixed z-50 h-[100vh] w-[400px] overflow-x-hidden bg-white'>
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
              <p className='py-[18px] font-semibold'>후기 모두 보기</p>
            </div>
            <div>
              {reviewData &&
                reviewData.map((item: ReviewData, i: number) => {
                  return (
                    <ReviewListItem
                      key={item.id}
                      id={item.id}
                      className={i === reviewData.length - 1 ? 'noBorder' : ''}
                      reviewText={item.content}
                      images={item.images}
                      rating={item.rating}
                      nickname={item.user.nickname}
                      profile_img={item.user.profile_image}
                      updateDate={formatDate(item.updated_at)}
                    />
                  );
                })}
            </div>
          </div>
        </div>
        <ScrollToTopBtn scrollbarRef={scrollbarRef} />
      </Scrollbars>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default MoreReviewModal;
