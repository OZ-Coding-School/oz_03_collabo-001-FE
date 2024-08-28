import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
// import PlaceItem from '../../components/BDPlace/PlaceItem';
import { GoChevronLeft } from 'react-icons/go';
import FilterOptions from './FilterOptions';
import PlaceList from './PlaceList';
import FilterDistance from './FilterDistance';

interface PlaceHomeFilterProps {
  closeModal: () => void;
}

const PlaceHomeFilter: React.FC<PlaceHomeFilterProps> = ({ closeModal }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return ReactDOM.createPortal(
    <div className='h-100vh fixed inset-0 z-50 flex items-start justify-center bg-background'>
      <div className='flex h-[100%] flex-col overflow-y-scroll bg-white'>
        <div className='flex h-[72px] items-center px-2 py-3'>
          <button onClick={closeModal} className='mr-[8px] font-extrabold'>
            <GoChevronLeft className='text-[24px] opacity-[70%]' />
          </button>
          <p className='py-[18px] font-semibold'>애개플레이스</p>
        </div>
        <div className='flex items-center gap-[10px] px-3 py-[15px]'>
          <FilterOptions />
          <FilterDistance />
        </div>
        <div>
          <PlaceList />
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default PlaceHomeFilter;
