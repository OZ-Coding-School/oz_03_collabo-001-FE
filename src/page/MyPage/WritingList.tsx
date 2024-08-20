import WritingListItem from './WritingListItem';
import MoreTitle from '../../components/layout/MoreTitle';

const WritingList = () => {
  const reviewItemCount = 2;
  const reviewItems = Array.from({ length: reviewItemCount });

  return (
    <>
      <div className='last card card2'>
        <MoreTitle title='내가 작성한 글' />
        {reviewItems.map((_, index) => (
          <WritingListItem key={index} className={index === 0 ? 'first' : ''} />
        ))}
      </div>
    </>
  );
};

export default WritingList;
