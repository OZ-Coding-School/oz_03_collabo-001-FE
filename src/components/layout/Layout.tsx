import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import FooterGnb from './FooterGnb';
import { ToastContainer } from 'react-toastify';
import Scrollbars from 'react-custom-scrollbars-2';
import renderThumbVertical from '../CustomScrollbar/renderThumbVertical';

const Layout = () => {
  const location = useLocation();

  // 헤더와 푸터를 숨길 경로 리스트
  const noHeaderPaths = ['/placefilter', '/mypage', '/login', '/auth/provider'];
  const noFooterPaths = ['/login', '/auth/provider'];

  // 현재 경로에 따라 헤더와 푸터 렌더링
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
