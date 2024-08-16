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

function App() {
  const location = useLocation();
  const noHeaderPaths: string[] = ['/placefilter']; // Header를 숨길 경로들

  return (
    <>
      {!noHeaderPaths.includes(location.pathname) && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/placefilter' element={<PlaceFilter />} />
      </Routes>
      <FooterGnb />
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
