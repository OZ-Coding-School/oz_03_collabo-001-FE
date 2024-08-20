import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Header from './components/layout/Header';
import FooterGnb from './components/layout/FooterGnb';
import Home from './page/Home/Home';
import MyPage from './page/MyPage/MyPage';
import PlaceFilter from './page/PlaceFilter/PlaceFilter';
import Login from './page/Login/Login';
// import PrivateRoute from './components/PrivateRoute';
import AuthProvider from './page/Login/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation();

  const noHeaderPaths: string[] = ['/placefilter', '/mypage', '/login', '/auth/provider']; // Header를 숨길 경로들
  const noFooterPaths: string[] = ['/login', '/auth/provider']; // Footer를 숨길 경로들

  return (
    <>
      <ToastContainer />

      {!noHeaderPaths.includes(location.pathname) && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/auth/provider' element={<AuthProvider />} />\
        {/* <Route
          path='/placefilter'
          element={<PrivateRoute element={PlaceFilter} />}
        /> */}
        <Route path='/placefilter' element={<PlaceFilter />} />
      </Routes>
      {!noFooterPaths.includes(location.pathname) && <FooterGnb />}
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
