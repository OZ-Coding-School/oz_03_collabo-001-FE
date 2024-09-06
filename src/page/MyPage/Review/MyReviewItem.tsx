import classNames from 'classnames';
import useTruncatedText from '../../../hooks/useTruncatedText';
import DetailRating from '../../Detail/DetailRating';

interface MyReviewItemProps {
  className?: string;
  reviewText: string;
  placeName: string;
  ratingPoint: number;
  createDate: string;
  commentImages: string[];
}

const MyReviewItem: React.FC<MyReviewItemProps> = ({
  className,
  reviewText,
  placeName,
  ratingPoint,
  createDate,
  commentImages,
}) => {
  const borderClass = classNames({
    'border-t border-border': className !== 'first',
    'items-center py-[10px] flex': true,
  });

  const truncatedText = useTruncatedText(reviewText, 210);

  return (
    <div>
      <div className={borderClass}>
        <div className='imgWrap h-[50px] w-[50px] overflow-hidden rounded-[10px] bg-background'>
          {commentImages === null ? (
            <div></div>
          ) : (
            <img
              src={commentImages[0]}
              alt={placeName}
              className='h-full w-full object-cover'
            />
          )}
        </div>
        <p className='ml-[10px] text-[14px] font-semibold'>{placeName}</p>
      </div>
      <div className='mb-[15px] flex'>
        <DetailRating initialRating={ratingPoint} />
        <span className='ml-[8px] text-[12px] text-caption'>{createDate}</span>
      </div>
      <p className='pb-[15px] text-[12px]'>{truncatedText}</p>
    </div>
  );
};

export default MyReviewItem;
