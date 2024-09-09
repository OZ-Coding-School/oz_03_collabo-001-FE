import image from '../../assets/Images/starfield.png';
import InfoTab from '../BDInfo/InfoTab';
import BDMagItem from '../../page/Home/BDMagItem';

const BDMagMag = () => {
  return (
    <div>
      <img src={image} alt='' className='h-28 w-full object-cover' />
      <div className='bg-white p-3'>
        <InfoTab
          tabs={[
            { id: '1', tab: '전체' },
            { id: '2', tab: '육아꿀팁' },
            { id: '3', tab: '놀이꿀팁' },
            { id: '4', tab: '베스트템' },
            { id: '5', tab: '장소추천' },
          ]}
        />
        <div className='mt-2 flex flex-col gap-2'>
          <BDMagItem />
          <BDMagItem />
          <BDMagItem />
          <BDMagItem />
          <BDMagItem />
          <BDMagItem />
        </div>
      </div>
    </div>
  );
};

export default BDMagMag;
