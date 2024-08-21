import MoreTitle from '../../components/layout/MoreTitle';
import MyReviewListItem from './MyReviewListItem';

const MyReviewList = () => {
  const reviewItemCount = 3;
  const reviewItems = Array.from({ length: reviewItemCount });

  const reviewText =
    '친절하고 좋아요 아이들이랑 강아지랑 놀께 많아요 친절하고 좋아요 아이들이랑 강아지랑 놀께 많아요친절하고 좋아요 아이들이랑 강아지랑 놀께 많아요친절하고 좋아요 아이들이랑 강아지랑 놀께 많아요친절하고 좋아요 아이들이랑 강아지랑 놀께 많아요친절하고 좋아요 아이들이랑 강아지랑 놀께 많아요친절하고 좋아요 아이들이랑 강아지랑 놀께 많아요친절하고 좋아요 아이들이랑 강아지랑 놀께 많아요친절하고 좋아요 아이들이랑 강아지랑 놀께많아요 아이들이랑 강아지랑 놀께 많아요친절하고 좋아요 아이들이랑 강아지랑 놀께많아요';

  return (
    <>
      <div className='card card2'>
        <MoreTitle title='작성 후기' />
        {reviewItems.map((_, index) => (
          <MyReviewListItem
            key={index}
            className={index === 0 ? 'first' : ''}
            reviewText={reviewText}
          />
        ))}
      </div>
    </>
  );
};

export default MyReviewList;
