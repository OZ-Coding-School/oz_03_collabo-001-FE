import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './page/Home/Home';
import MyPage from './page/MyPage/MyPage';
import PlaceFilter from './page/PlaceFilter/PlaceFilter';
import PlaceTopNav from './components/BDPlace/PlaceTopNav';
import Login from './page/Login/Login';
import PrivateRoute from './components/PrivateRoute';
import AuthProvider from './page/Login/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/layout/Layout';
import Info from './components/BDInfo/Info';
import Magazine from './components/BDMag/Magazine';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/bdPlaceHome' element={<PlaceTopNav />} />
          <Route path='/bdInfo' element={<Info />} />
          <Route path='/bdMag' element={<Magazine />} />
          <Route path='/mypage' element={<PrivateRoute element={MyPage} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/auth/provider' element={<AuthProvider />} />
          <Route path='/placefilter' element={<PlaceFilter />} />
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
