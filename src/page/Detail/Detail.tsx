import BackwardsHeader from '../../components/BackwardsHeader';
import Banner from '../Home/Banner';
import ShopSimpleData from './ShopSimpleData';
import ShopDetailData from './ShopDetailData';
import ShopInfoData from './ShopInfoData';

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
      <div className='card'>상세내용</div>
      <div className='card'>
        <div>사진 모아보기</div>
        <div></div>
      </div>
    </>
  );
};

export default Detail;
