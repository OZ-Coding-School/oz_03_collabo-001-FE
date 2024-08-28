import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { GoChevronLeft } from 'react-icons/go';
import PlaceList from '../PlaceFilter/PlaceList';

interface BookMarkModalProps {
  title: string;
  closeModal: () => void;
}

const BookMarkModal: React.FC<BookMarkModalProps> = ({ title, closeModal }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null; // modal-root가 존재하지 않으면 렌더링하지 않음

  return ReactDOM.createPortal(
    <div className='flex h-[100vh] items-start justify-center overflow-x-hidden overflow-y-scroll bg-white'>
      <div className='w-full'>
        <div className='col'>
          <div className='colTitle flex h-[72px] items-center'>
            <button onClick={closeModal} className='mr-[8px] font-extrabold'>
              <GoChevronLeft className='text-[24px] opacity-[70%]' />
            </button>
            <p className='py-[18px] font-semibold'>{title}</p>
          </div>
        </div>

        <div className=''>
          <PlaceList />
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default BookMarkModal;
