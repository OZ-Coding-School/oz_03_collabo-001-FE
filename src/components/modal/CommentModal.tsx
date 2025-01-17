import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { GoChevronLeft } from 'react-icons/go';
import Scrollbars from 'react-custom-scrollbars-2';
import renderThumbVertical from '../CustomScrollbar/renderThumbVertical';
import ScrollToTopBtn from '../CustomScrollbar/ScrollToTopBtn';
import MyReviewList from '../../page/MyPage/Review/MyReviewList';

interface CommentModalProps {
  title: string;
  closeModal: () => void;
}

const CommentModal: React.FC<CommentModalProps> = ({ title, closeModal }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const scrollbarRef = useRef<Scrollbars>(null);

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className='h-100vh fixed inset-0 z-50 flex items-start justify-center bg-background'>
      <Scrollbars
        style={{
          width: '400px',
          height: '100vh',
        }}
        ref={scrollbarRef}
        renderThumbVertical={renderThumbVertical}
        autoHide
      >
        <div className='flex flex-col bg-white'>
          <div className='flex h-[72px] items-center px-2 py-3'>
            <button onClick={closeModal} className='mr-[8px] font-extrabold'>
              <GoChevronLeft className='text-[24px] opacity-[70%]' />
            </button>
            <p className='py-[18px] font-semibold'>{title}</p>
          </div>
          <MyReviewList />
        </div>
        <ScrollToTopBtn scrollbarRef={scrollbarRef} />
      </Scrollbars>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default CommentModal;
