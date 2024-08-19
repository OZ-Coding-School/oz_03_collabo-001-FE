import WritingListItem from './WritingListItem';
import more from '../../assets/More.svg';

const WritingList = () => {
  const reviewItemCount = 2;
  const reviewItems = Array.from({ length: reviewItemCount });

  return (
    <>
      <div className='last card card2'>
        <div className='cardTitle flex items-center justify-between'>
          <p className='font-semibold'>내가 작성한 글</p>
          <button type='button' aria-label='내가 작성한 글 더보기'>
            <img src={more} alt='더보기 아이콘' aria-hidden />
          </button>
        </div>
        {reviewItems.map((_, index) => (
          <WritingListItem key={index} className={index === 0 ? 'first' : ''} />
        ))}
      </div>
    </>
  );
};

export default WritingList;
