import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './page/Home/Home';
import MyPage from './page/MyPage/MyPage';
import PlaceHome from './components/BDPlace/PlaceHome';
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
          <Route path='/bdplacehome' element={<PlaceHome />} />
          <Route path='/bdinfo' element={<Info />} />
          <Route path='/bdmag' element={<Magazine />} />
          <Route path='/mypage' element={<PrivateRoute element={MyPage} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/auth/provider' element={<AuthProvider />} />
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
