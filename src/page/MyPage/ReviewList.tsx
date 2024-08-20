import ReviewListItem from './ReviewListItem';
import MoreTitle from '../../components/layout/MoreTitle';

const ReviewList = () => {
  const reviewItemCount = 3;
  const reviewItems = Array.from({ length: reviewItemCount });

  return (
    <>
      <div className='card card2'>
        <MoreTitle title='작성 후기' />
        {reviewItems.map((_, index) => (
          <ReviewListItem key={index} className={index === 0 ? 'first' : ''} />
        ))}
      </div>
    </>
  );
};

export default ReviewList;
