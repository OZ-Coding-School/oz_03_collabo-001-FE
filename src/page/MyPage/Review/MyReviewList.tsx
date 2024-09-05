import MoreTitle from '../../../components/layout/MoreTitle';
import MyReviewListItem from './MyReviewListItem';

interface MyReviewListProps {
  reviews: Comment[];
}

interface Comment {
  id: number;
  place_image: string;
  place_name: string;
  rating_point: number;
  create_date: string;
  content: string;
  comments_images: string[];
}

const MyReviewList: React.FC<MyReviewListProps> = ({ reviews }) => {
  return (
    <>
      <div className='col'>
        <MoreTitle title='작성 후기' />
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <MyReviewListItem
              key={review.id}
              className={index === 0 ? 'first' : ''}
              reviewText={review.content}
              placeName={review.place_name}
              ratingPoint={review.rating_point}
              createDate={review.create_date}
              commentImages={review.comments_images}
            />
          ))
        ) : (
          <div className='py-4 text-center text-[14px] text-caption'>
            작성된 후기가 없습니다.
          </div>
        )}
      </div>
    </>
  );
};

export default MyReviewList;
