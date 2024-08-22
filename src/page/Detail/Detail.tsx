import BackwardsHeader from '../../components/BackwardsHeader';
import Banner from '../Home/Banner';
import ShopSimpleData from './ShopSimpleData';
import ShopDetailData from './ShopDetailData';
import ShopInfoData from './ShopInfoData';
import ReviewPictures from './ReviewPictures';
import ReviewList from './ReviewList';
import DetailTopNav from './DetailTopNav';
import DetailContent from './DetailContent';
import DetailGuide from './DetailGuide';

const Detail = () => {
  return (
    <div className='flex flex-col gap-[15px]'>
      <div>
        <BackwardsHeader />
        <Banner />
        <ShopSimpleData />
        <ShopDetailData />
        <ShopInfoData />
      </div>
      <div>
        <DetailTopNav />
        <DetailContent />
      </div>
      <div>
        <ReviewPictures />
        <ReviewList />
      </div>
      <div>
        <DetailGuide />
      </div>
    </div>
  );
};

export default Detail;
