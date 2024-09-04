import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { GoChevronLeft } from 'react-icons/go';
import RecentList from '../../page/MyPage/Recent/RecentList';

interface RecoPlaceModalProps {
  title: string;
  closeModal: () => void;
}

const RecoPlaceModal: React.FC<RecoPlaceModalProps> = ({
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
  if (!modalRoot) return null;
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
        <RecentList />
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default RecoPlaceModal;
