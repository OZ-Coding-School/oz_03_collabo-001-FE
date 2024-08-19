import ReviewListItem from './ReviewListItem';
import more from '../../assets/More.svg';

const ReviewList = () => {
  const reviewItemCount = 3;
  const reviewItems = Array.from({ length: reviewItemCount });

  return (
    <>
      <div className='card card2'>
        <div className='cardTitle flex items-center justify-between'>
          <p className='font-semibold'>작성후기</p>
          <button type='button' aria-label='작성후기 더보기'>
            <img src={more} alt='더보기 아이콘' aria-hidden />
          </button>
        </div>
        {reviewItems.map((_, index) => (
          <ReviewListItem key={index} className={index === 0 ? 'first' : ''} />
        ))}
      </div>
    </>
  );
};

export default ReviewList;
