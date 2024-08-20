import MoreTitle from '../../components/layout/MoreTitle';
import Place from '../../components/BDPlace/Place';

const RecentPlace = () => {
  return (
    <div className='card card2'>
      <MoreTitle title='최근 본 장소' />
      <div className='gap-4px flex justify-between pb-[30px]'>
        <Place />
        <Place />
        <Place />
      </div>
    </div>
  );
};

export default RecentPlace;
