import classNames from 'classnames';
import useTruncatedText from '../../../hooks/useTruncatedText';
import DetailRating from '../../Detail/DetailRating';
import { twMerge } from 'tailwind-merge';

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
    <div className='pb-[10px]'>
      <div className={borderClass} id={id}>
        <div className='imgWrap h-[50px] w-[50px] overflow-hidden rounded-[10px] bg-background'>
          {place_image === null ? (
            <div></div>
          ) : (
            <img
              src={`https://dogandbaby-backend.s3.amazonaws.com/media/${place_image}`}
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
      {commentImages.length > 0 ? (
        <div
          className={twMerge(
            'flex items-center',
            commentImages.length === 5 ? 'justify-between' : 'gap-6'
          )}
        >
          {commentImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=''
              className='h-[70px] w-[70px] overflow-hidden rounded-[10px]'
            />
          ))}
        </div>
      ) : (
        <div className='py-4 text-[10px] text-caption opacity-40'>
          이미지를 불러오는데 실패하였습니다.
        </div>
      )}
    </div>
  );
};
export default MyReviewItem;
