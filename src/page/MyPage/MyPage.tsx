import React from 'react';
import BackwardsHeader from '../../components/BackwardsHeader';
import ReviewList from './ReviewList';
import WritingList from './WritingList';
import FeaturedBanner from './FeaturedBanner';

const MyPage = () => {
  return (
    <div>
      <BackwardsHeader title='마이페이지' />
      <ReviewList />
      <WritingList />
      <FeaturedBanner />
    </div>
  );
};

export default MyPage;
