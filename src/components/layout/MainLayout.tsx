import { Outlet } from 'react-router-dom';
import Header from './Header';
import FooterGnb from './FooterGnb';

const MainLayout = () => {
  return (
    <>
      <Header />
      <section>
        <Outlet />
      </section>
      <FooterGnb />
    </>
  );
};

export default MainLayout;
