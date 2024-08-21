import { useState } from 'react';
import UserInfo from '../../components/Mypage/UserInfo';
import MyBookmark from './MyBookmark';
import RecentPlace from './RecentPlace';
import BackwardsHeader from '../../components/BackwardsHeader';
import MyReviewList from './MyReviewList';
import WritingList from './WritingList';
import FeaturedBanner from './FeaturedBanner';

const MyPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <div>
      <BackwardsHeader title='마이페이지' />
      <UserInfo isLoggedIn={isLoggedIn} />
      {isLoggedIn ? <UserDashboard /> : null}
    </div>
  );
};

const UserDashboard = () => {
  return (
    <>
      {/* 나만의 북마크 */}
      <MyBookmark />
      {/* 최근 본 장소 */}
      <RecentPlace />
      {/* 작성 후기 */}
      <MyReviewList />
      {/* 내가 작성한 글 */}
      <WritingList />
      {/* 배너 */}
      <FeaturedBanner />
    </>
  );
};

export default MyPage;
