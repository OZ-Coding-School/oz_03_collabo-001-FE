import UserInfo from '../../components/Mypage/UserInfo';
import MyBookmark from './MyBookmark';
import RecentPlace from './RecentPlace';
import BackwardsHeader from '../../components/BackwardsHeader';
import MyReviewList from './MyReviewList';
import WritingList from './WritingList';
import FeaturedBanner from './FeaturedBanner';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface UserProfile {
  profile_image: string | null;
  nickname: string;
  email: string;
}

interface Bookmark {
  id: number;
  store_image: string;
  is_bookmarked: boolean;
  place_region: number;
  place_subcategory: number;
  name: string;
  address: string;
  rating: number;
  comments_count: number;
}

interface RecentViewHistory {
  id: number;
  store_image: string;
  is_bookmarked: boolean;
  place_region: number;
  place_subcategory: number;
  name: string;
  address: string;
  rating: number;
  comments_count: number;
}

interface RecentComment {
  id: number;
  place_image: string;
  place_name: string;
  rating_point: number;
  create_date: string;
  content: string;
  comments_images: string[];
}

interface Banner {
  image: string;
  url_link: string;
}

interface MyPageData {
  profile: UserProfile;
  recent_bookmarks: Bookmark[];
  recent_view_histories: RecentViewHistory[];
  recent_comments: RecentComment[];
  banners: Banner[];
}

const MyPage = () => {
  const [data, setData] = useState<MyPageData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/users/mypage/',
          {
            withCredentials: true,
          }
        );
        setData(response.data);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <BackwardsHeader title='마이페이지' />
      {data ? (
        <>
          <UserInfo profile={data.profile} />
          <UserDashboard
            recentBookmarks={data.recent_bookmarks}
            // recentViewHistories={data.recent_view_histories}
            recentComments={data.recent_comments}
            banners={data.banners}
          />
        </>
      ) : (
        <div className='flex items-center gap-[10px] px-3 py-[15px]'>
          데이터를 가져오는데 실패하였습니다.
        </div>
      )}
    </>
  );
};

interface UserDashboardProps {
  recentBookmarks: Bookmark[];
  // recentViewHistories: RecentViewHistory[];
  recentComments: RecentComment[];
  banners: Banner[];
}

const UserDashboard: React.FC<UserDashboardProps> = ({
  recentBookmarks,
  // recentViewHistories,
  recentComments,
  banners,
}) => {
  return (
    <>
      <div className='flex flex-col gap-[15px]'>
        {/* 나만의 북마크 */}
        <MyBookmark bookmarks={recentBookmarks} />
        {/* 최근 본 장소 */}
        <RecentPlace />
        {/* 작성 후기 */}
        <MyReviewList reviews={recentComments} />
        {/* 내가 작성한 글 */}
        <WritingList />
      </div>
      {/* 배너 */}
      <FeaturedBanner banners={banners} />
    </>
  );
};

export default MyPage;
