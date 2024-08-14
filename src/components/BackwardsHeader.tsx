import { Outlet, useNavigate } from 'react-router-dom';

const BackwardsHeader = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='fixed top-0 z-50 flex h-[48px] w-[400px] items-center bg-[white] p-4'>
        <button onClick={() => navigate(-1)} className='mr-4 font-extrabold'>
          〈
        </button>
        <p>{'애개플레이스'}</p>
      </div>
      <div className='mt-[48px]'>
        <Outlet />
      </div>
    </>
  );
};

export default BackwardsHeader;
