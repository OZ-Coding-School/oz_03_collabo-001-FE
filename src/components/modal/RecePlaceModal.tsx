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
    <div className='flex h-[100vh] items-start justify-center overflow-x-hidden bg-white'>
      <Scrollbars
        style={{
          width: '100%',
          height: '100%',
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
            <RecentList tapRegions={tapRegions} />
          </div>
        </div>
        <ScrollToTopBtn scrollbarRef={scrollbarRef} />
      </Scrollbars>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default RecePlaceModal;
