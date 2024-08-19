import MoreTitle from '../../components/layout/MoreTitle';
import BDStoryItem from './BDStoryItem';

const BDStory = () => {
  return (
    <div className='last card card2'>
      <MoreTitle title='애개스토리' />
      <div className='flex flex-wrap justify-between pb-[12px]'>
        <BDStoryItem />
        <BDStoryItem />
        <BDStoryItem />
        <BDStoryItem />
      </div>
    </div>
  );
};

export default BDStory;
