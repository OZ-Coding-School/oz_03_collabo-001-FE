import image from '../../assets/Images/starfield.png';
import InfoTab from '../../components/BDInfo/InfoTab';
import BDStoryItem from '../Home/BDStoryItem';

const BDMagStory = () => {
  return (
    <div>
      <img src={image} alt='' className='h-28 w-full object-cover' />
      <div className='bg-white p-3'>
        <InfoTab
          tabs={[
            { id: '1', tab: '전체' },
            { id: '2', tab: '핫플' },
            { id: '3', tab: '여행코스' },
            { id: '4', tab: '실내' },
            { id: '5', tab: '실외' },
          ]}
        />
        <div className='mt-2 flex flex-col gap-2'>
          <BDStoryItem />
          <BDStoryItem />
          <BDStoryItem />
          <BDStoryItem />
          <BDStoryItem />
          <BDStoryItem />
        </div>
      </div>
    </div>
  );
};

export default BDMagStory;
