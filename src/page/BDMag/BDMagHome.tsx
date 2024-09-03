import Banner from '../Home/Banner';
import BDMag from '../Home/BDMag';
import BDStory from '../Home/BDStory';

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
