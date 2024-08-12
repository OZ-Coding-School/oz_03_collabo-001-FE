import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import FooterGnb from './components/layout/FooterGnb';
import Home from './pages/Home/Home';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
        <FooterGnb />
      </Router>
    </>
  );
}

export default App;
