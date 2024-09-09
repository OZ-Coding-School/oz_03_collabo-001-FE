import UserInfo from '../../components/Mypage/UserInfo';
import MyBookmark from './Bookmark/BookmarkPlace';
import RecentPlace from './Recent/RecentPlace';
import BackwardsHeader from '../../components/BackwardsHeader';
import MyReviewPlace from './Review/MyReviewPlace';
import WritingList from './WritingList/WritingList';
import FeaturedBanner from './FeaturedBanner';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import useFetchCategoryData from '../../hooks/useFetchCategoryData';
import useBookmarkStore from '../../store/useBookmarkStore';

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
  id: string;
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { bookmarks } = useBookmarkStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.dogandbaby.co.kr/users/mypage/',
          {
            withCredentials: true,
          }
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);

        toast.error('데이터 가져오기 실패', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    };

    fetchData();
  }, [bookmarks]);

  return (
    <>
      <BackwardsHeader title='마이페이지' />
      {data && !isLoading ? (
        <>
          <UserInfo profile={data.profile} />
          <UserDashboard
            recentBookmarks={data.recent_bookmarks}
            recentViewHistories={data.recent_view_histories}
            recentComments={data.recent_comments}
            banners={data.banners}
          />
        </>
      ) : (
        <div className='py-4 text-center text-[14px] text-caption'>
          데이터 가져오는 중...
        </div>
      )}
    </>
  );
};

interface UserDashboardProps {
  recentBookmarks: Bookmark[];
  recentViewHistories: RecentViewHistory[];
  recentComments: RecentComment[];
  banners: Banner[];
}

const UserDashboard: React.FC<UserDashboardProps> = ({
  recentBookmarks,
  recentViewHistories,
  recentComments,
  banners,
}) => {
  const { categoryData } = useFetchCategoryData('main');
  const tapRegions = categoryData?.tapRegions ?? [];

  return (
    <>
      <div className='flex flex-col gap-[15px]'>
        {/* 나만의 북마크 */}
        <MyBookmark bookmarks={recentBookmarks} tapRegions={tapRegions} />
        {/* 최근 본 장소 */}
        <RecentPlace
          recentplace={recentViewHistories}
          tapRegions={tapRegions}
        />
        {/* 작성 후기 */}
        <MyReviewPlace reviews={recentComments} />
        {/* 내가 작성한 글 */}
        <WritingList />
      </div>
      {/* 배너 */}
      <FeaturedBanner banners={banners} />
    </>
  );
};

export default MyPage;
