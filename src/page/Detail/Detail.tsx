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
    <>
      <div className='card'>
        <BackwardsHeader />
        <Banner />
        <ShopSimpleData />
        <ShopDetailData />
        <ShopInfoData />
      </div>
      <div className='card'>
        <DetailTopNav />
        <DetailContent />
      </div>
      <div className='card card2'>
        <ReviewPictures />
        <ReviewList />
      </div>
      <div className='last card card2'>
        <DetailGuide />
      </div>
    </>
  );
};

export default Detail;
