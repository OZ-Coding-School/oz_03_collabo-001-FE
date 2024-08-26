import MoreTitle from '../../components/layout/MoreTitle';
import Place from '../../components/BDPlace/Place';

const MyBookmark = () => {
  return (
    <div className='col'>
      <MoreTitle title='나만의 북마크' />
      <div className='gap-4px flex justify-between pb-[30px]'>
        <Place placeId='1' /> {/* 각 Place 컴포넌트에 고유 ID를 부여 */}
        <Place placeId='2' />
        <Place placeId='3' />
      </div>
    </div>
  );
};

export default MyBookmark;
