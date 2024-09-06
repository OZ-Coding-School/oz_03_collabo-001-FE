import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import FooterGnb from './FooterGnb';
import { ToastContainer } from 'react-toastify';
import Scrollbars from 'react-custom-scrollbars-2';
import renderThumbVertical from '../CustomScrollbar/renderThumbVertical';

const Layout = () => {
  const location = useLocation();

  const noHeaderPaths = ['/placefilter', '/mypage', '/login', '/auth/provider'];
  const noFooterPaths = ['/login', '/auth/provider'];

  const showHeader = !noHeaderPaths.includes(location.pathname);
  const showFooter = !noFooterPaths.includes(location.pathname);

  return (
    <>
      <ToastContainer />
      {showHeader && <Header />}

      <Scrollbars
        style={{
          width: '100%',
          height: '100%',
        }}
        renderThumbVertical={renderThumbVertical}
        autoHide
      >
        <main>
          <Outlet />
        </main>
      </Scrollbars>

      {showFooter && <FooterGnb />}
    </>
  );
};

export default Layout;
