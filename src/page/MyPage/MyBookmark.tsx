import MoreTitle from '../../components/layout/MoreTitle';
import Place from '../../components/BDPlace/Place';

const MyBookmark = () => {
  return (
    <div className='card card2'>
      <MoreTitle title='나만의 북마크' />
      <div className='gap-4px flex justify-between pb-[30px]'>
        <Place />
        <Place />
        <Place />
      </div>
    </div>
  );
};

export default MyBookmark;
