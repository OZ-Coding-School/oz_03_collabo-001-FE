import React from 'react';
import Banner from './Banner';
import MiddleNav from './MiddleNav';
import RecoPlace from '../../components/BDPlace/RecoPlace';

const Home = () => {
  return (
    <div className='h-[1200px] bg-background'>
      <Banner />
      <MiddleNav />
      <RecoPlace />
    </div>
  );
};

export default Home;
