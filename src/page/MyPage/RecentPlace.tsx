import MoreTitle from '../../components/layout/MoreTitle';
import Place from '../../components/BDPlace/Place';

const RecentPlace = () => {
  return (
    <div className='col'>
      <MoreTitle title='최근 본 장소' />
      <div className='gap-4px flex justify-between pb-[30px]'>
        <Place placeId='4' />
        <Place placeId='5' />
        <Place placeId='6' />
      </div>
    </div>
  );
};

export default RecentPlace;
