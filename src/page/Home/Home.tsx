import useFetchCategoryData from '../../hooks/useFetchCategoryData';
import Banner from './Banner';
import MiddleNav from './MiddleNav';
import RecoPlace from '../../components/BDPlace/RecoPlace';
import BDInfoPopular from './BDInfoPopular';
import BDMag from './BDMag';
import BDStory from './BDStory';

const Home = () => {
  const { categoryData, loading, error } = useFetchCategoryData('main');

  if (!categoryData) {
    return null;
  }

  if (loading || error) {
    return null;
  }

  const recoTags = ['5세아이', '중형견', '실내'];

  return (
    <div>
      <div className='flex flex-col gap-[15px]'>
        <div>
          <Banner bannerImgs={categoryData.bannerImgs} />
          <MiddleNav />
        </div>
        {/* 추천장소 */}
        <RecoPlace recoTags={recoTags} recoPlaces={categoryData.recoPlaces} />
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
