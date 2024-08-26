import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { GoChevronLeft } from 'react-icons/go';
import PlaceList from '../PlaceFilter/PlaceList';

interface PlaceFilterModalProps {
  title: string;
  closeModal: () => void;
}

const PlaceFilterModal: React.FC<PlaceFilterModalProps> = ({
  title,
  closeModal,
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null; // modal-root가 존재하지 않으면 렌더링하지 않음

  return ReactDOM.createPortal(
    <div className='h-100vh fixed inset-0 z-50 flex items-start justify-center bg-background'>
      <div className='flex h-[100%] flex-col overflow-y-scroll bg-white'>
        <div className='flex h-[72px] items-center px-2 py-3'>
          <button onClick={closeModal} className='mr-[8px] font-extrabold'>
            <GoChevronLeft className='text-[24px] opacity-[70%]' />
          </button>
          <p className='py-[18px] font-semibold'>{title}</p>
        </div>

        <div>
          {/* <PlaceItem />
          <PlaceItem />
          <PlaceItem />
          <PlaceItem />
          <PlaceItem />
          <PlaceItem />
          <PlaceItem />
          <PlaceItem />
          <PlaceItem />
          <PlaceItem />
          <PlaceItem />
          <PlaceItem /> */}
          <PlaceList /> {/* 여기서 PlaceList 컴포넌트를 사용 */}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default PlaceFilterModal;
