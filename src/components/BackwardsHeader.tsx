import { Outlet, useNavigate } from 'react-router-dom';
import { GoChevronLeft } from 'react-icons/go';

const BackwardsHeader = ({ title }: { title?: string }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className='BackwardsHeader fixed top-0 z-50 flex h-[48px] w-[400px] items-center bg-[white] p-4 shadow'>
        <button
          onClick={() => navigate(-1)}
          className='mr-[8px] font-extrabold'
        >
          <GoChevronLeft className='text-[24px] opacity-[70%]' />
        </button>
        <p>{title}</p>
      </div>
      {/* <div className='mt-[48px]'>
        <Outlet />
      </div> */}
    </>
  );
};

export default BackwardsHeader;
