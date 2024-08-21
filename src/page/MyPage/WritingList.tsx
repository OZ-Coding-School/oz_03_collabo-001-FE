import WritingListItem from './WritingListItem';
import MoreTitle from '../../components/layout/MoreTitle';

const WritingList = () => {
  const reviewItemCount = 2;
  const reviewItems = Array.from({ length: reviewItemCount });

  const boardText =
    '친절하고 좋아요 아이들이랑 강아지랑 놀께 많아요 친절하고 좋아요 아이들이랑 강아지랑 놀께 많아요친절하고 좋아요 아이들이랑 강아지랑 놀께 많아요친절하고 좋아요 아이들이랑 강아지랑 놀께 많아요친절하고 좋아요 아이들이랑 강아지랑 놀께 많아요친절하고 좋아요 아이들이랑 강아지랑 놀께 많아요친절하고 좋아요 아이들이랑 강아지랑 놀께 많아요친절하고 좋아요 아이들이랑 강아지랑 놀께 많아요친절하고 좋아요 아이들이랑 강아지랑 놀께많아요 아이들이랑 강아지랑 놀께 많아요친절하고 좋아요 아이들이랑 강아지랑 놀께많아요';

  return (
    <>
      <div className='last card card2'>
        <MoreTitle title='내가 작성한 글' />
        {reviewItems.map((_, index) => (
          <WritingListItem
            key={index}
            className={index === 0 ? 'first' : ''}
            boardText={boardText}
          />
        ))}
      </div>
    </>
  );
};

export default WritingList;
