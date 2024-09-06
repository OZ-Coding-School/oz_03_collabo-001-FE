import MoreTitle from '../../../components/layout/MoreTitle';
import MyReviewItem from './MyReviewItem';

interface MyReviewPlaceProps {
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

const MyReviewPlace: React.FC<MyReviewPlaceProps> = ({ reviews }) => {
  return (
    <>
      <div className='col'>
        <MoreTitle title='작성 후기' />
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <MyReviewItem
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
            작성한 후기가 없습니다.
          </div>
        )}
      </div>
    </>
  );
};

export default MyReviewPlace;
