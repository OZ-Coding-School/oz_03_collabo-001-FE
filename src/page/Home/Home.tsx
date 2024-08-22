import Banner from './Banner';
import MiddleNav from './MiddleNav';
import RecoPlace from '../../components/BDPlace/RecoPlace';
import BDInfoPopular from './BDInfoPopular';
import BDMag from './BDMag';
import BDStory from './BDStory';

const Home = () => {
  return (
    <div>
      <div className='flex flex-col gap-[15px]'>
        <div>
          <Banner />
          <MiddleNav />
        </div>
        {/* 추천장소 */}
        <RecoPlace />
        {/* 애개육아정보 인기글 */}
        <BDInfoPopular />
        {/* 애개매거진 */}
        <BDMag />
        {/* 애개스토리 */}
        <BDStory />
      </div>
    </div>
  );
};

export default Home;
