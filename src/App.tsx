import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Header from './components/layout/Header';
import FooterGnb from './components/layout/FooterGnb';
import Home from './page/Home/Home';
import PlaceFilter from './page/PlaceFilter/PlaceFilter';
import Login from './page/Login/Login';
import GoogleAuth from './page/Login/Google/GoogleAuth';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation();

  const noHeaderPaths: string[] = ['/placefilter', '/login', '/google/auth']; // Header를 숨길 경로들
  const noFooterPaths: string[] = ['/login', '/google/auth']; // Footer를 숨길 경로들

  return (
    <>
      <ToastContainer />

      {!noHeaderPaths.includes(location.pathname) && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/google/auth' element={<GoogleAuth />} />
        <Route
          path='/placefilter'
          element={<PrivateRoute element={PlaceFilter} />}
        />
        {/* <Route path='/placefilter' element={<PlaceFilter />} /> */}
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
