import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { GoChevronLeft } from 'react-icons/go';
import Scrollbars from 'react-custom-scrollbars-2';
import renderThumbVertical from '../CustomScrollbar/renderThumbVertical';
import ScrollToTopBtn from '../CustomScrollbar/ScrollToTopBtn';
import RecentList from '../../page/MyPage/Recent/RecentList';
import useFetchCategoryData from '../../hooks/useFetchCategoryData';

interface RecePlaceModalProps {
  title: string;
  closeModal: () => void;
}

const RecePlaceModal: React.FC<RecePlaceModalProps> = ({
  title,
  closeModal,
}) => {
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
    <div className='h-100vh fixed inset-0 z-50 flex items-start justify-center bg-background'>
      <Scrollbars
        style={{
          width: '400px',
          height: '100%',
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
          <RecentList tapRegions={tapRegions} />
        </div>
        <ScrollToTopBtn scrollbarRef={scrollbarRef} />
      </Scrollbars>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default RecePlaceModal;
