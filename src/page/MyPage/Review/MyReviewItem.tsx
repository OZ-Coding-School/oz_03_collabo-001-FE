import classNames from 'classnames';
import useTruncatedText from '../../../hooks/useTruncatedText';
import DetailRating from '../../Detail/DetailRating';

interface MyReviewItemProps {
  className?: string;
  id: string;
  reviewText: string;
  placeName: string;
  place_image: string;
  ratingPoint: number;
  update_at: string;
  commentImages: string[];
}

const MyReviewItem: React.FC<MyReviewItemProps> = ({
  className,
  id,
  reviewText,
  placeName,
  place_image,
  ratingPoint,
  update_at,
  commentImages,
}) => {
  const borderClass = classNames({
    'border-t border-border': className !== 'first',
    'items-center py-[10px] flex': true,
  });

  const truncatedText = useTruncatedText(reviewText, 210);

  return (
    <div>
      <div className={borderClass} id={id}>
        <div className='imgWrap h-[50px] w-[50px] overflow-hidden rounded-[10px] bg-background'>
          {place_image === null ? (
            <div></div>
          ) : (
            <img
              src={place_image}
              alt={placeName}
              className='h-full w-full object-cover'
            />
          )}
        </div>
        <p className='ml-[10px] text-[14px] font-semibold'>{placeName}</p>
      </div>
      <div className='mb-[15px] flex'>
        <DetailRating initialRating={ratingPoint} />
        <span className='ml-[8px] text-[12px] text-caption'>{update_at}</span>
      </div>
      <p className='pb-[15px] text-[12px]'>{truncatedText}</p>
      <div className='flex items-center justify-between'>
        {commentImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt=''
            className='mr-[5px] h-[50px] w-[50px]'
          />
        ))}
      </div>
    </div>
  );
};

export default MyReviewItem;
