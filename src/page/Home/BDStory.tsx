import MoreTitle from '../../components/layout/MoreTitle';
import BDStoryItem from './BDStoryItem';

const BDStory = () => {
  return (
    <div className='col'>
      <MoreTitle title='애개스토리' />
      <div className='grid grid-cols-2 justify-between gap-2 pb-[12px]'>
        <BDStoryItem />
        <BDStoryItem />
        <BDStoryItem />
        <BDStoryItem />
      </div>
    </div>
  );
};

export default BDStory;
