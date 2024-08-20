import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/layout/Header';
// import FooterGnb from './components/layout/FooterGnb';
import MainLayout from './components/layout/MainLayout';
import FooterOnlyLayout from './components/layout/FooterOnlyLayout.tsx';
import EmptyLayout from './components/layout/EmptyLayout.tsx';
import Home from './page/Home/Home';
import MyPage from './page/MyPage/MyPage';
import PlaceFilter from './page/PlaceFilter/PlaceFilter';
import Login from './page/Login/Login';
import Detail from './page/Detail/Detail.tsx';
// import PrivateRoute from './components/PrivateRoute';
import AuthProvider from './page/Login/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        {/* 1. 메인 레이아웃 (헤더+푸터) */}
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
        </Route>

        {/* 2. 빈 레이아웃 */}
        <Route element={<EmptyLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/auth/provider' element={<AuthProvider />} />\
          {/* <Route
          path='/placefilter'
          element={<PrivateRoute element={PlaceFilter} />}
          /> */}
          <Route path='/placefilter' element={<PlaceFilter />} />
          <Route path='/detail/:id' element={<Detail />} />
        </Route>

        {/* 3. 푸터만 있는 경우 */}
        <Route element={<FooterOnlyLayout />}>
          <Route path='/mypage' element={<MyPage />} />
        </Route>
      </Routes>
    </>
  );
}

const Root = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default Root;
