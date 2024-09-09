import Banner from '../../page/Home/Banner';
import BDMag from '../../page/Home/BDMag';
import BDStory from '../../page/Home/BDStory';

const BDMagHome = () => {
  return (
    <div>
      <Banner />
      <div className='flex flex-col gap-[15px]'>
        <BDMag />
        <BDStory />
      </div>
    </div>
  );
};

export default BDMagHome;
