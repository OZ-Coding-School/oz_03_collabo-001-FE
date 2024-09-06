import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { GoChevronLeft } from 'react-icons/go';
import Scrollbars from 'react-custom-scrollbars-2';
import renderThumbVertical from '../CustomScrollbar/renderThumbVertical';
import ScrollToTopBtn from '../CustomScrollbar/ScrollToTopBtn';
import BookmarkList from '../../page/MyPage/Bookmark/BookmarkList';
import useFetchCategoryData from '../../hooks/useFetchCategoryData';

interface BookMarkModalProps {
  title: string;
  closeModal: () => void;
}

const BookMarkModal: React.FC<BookMarkModalProps> = ({ title, closeModal }) => {
  const { categoryData } = useFetchCategoryData('main');
  const tapRegions = categoryData?.tapRegions ?? [];

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
            <BookmarkList tapRegions={tapRegions} />
          </div>
        </div>
        <ScrollToTopBtn scrollbarRef={scrollbarRef} />
      </Scrollbars>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default BookMarkModal;
