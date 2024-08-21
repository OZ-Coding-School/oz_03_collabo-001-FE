import { Outlet } from 'react-router-dom';

const EmptyLayout = () => {
  return (
    <>
      <section>
        <Outlet />
      </section>
    </>
  );
};

export default EmptyLayout;
