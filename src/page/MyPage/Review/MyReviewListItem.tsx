import classNames from 'classnames';
import useTruncatedText from '../../../hooks/useTruncatedText';
import DetailRating from '../../Detail/DetailRating';

interface MyReviewListItemProps {
  className?: string;
  reviewText: string;
  placeName: string;
  ratingPoint: number;
  createDate: string;
  commentImages: string[];
}

const MyReviewListItem: React.FC<MyReviewListItemProps> = ({
  className,
  reviewText,
  placeName,
  ratingPoint,
  createDate,
  commentImages,
}) => {
  // 첫번째 아이템의 경우 상단 border 없앰
  const borderClass = classNames({
    'border-t border-border': className !== 'first',
    'items-center py-[10px] flex': true,
  });

  // useTruncatedText 훅 사용
  const truncatedText = useTruncatedText(reviewText, 210);

  return (
    <div>
      <div className={borderClass}>
        <div className='imgWrap h-[50px] w-[50px] overflow-hidden rounded-[10px] bg-background'>
          <img
            src={commentImages[0]}
            alt={placeName}
            className='h-full w-full object-cover'
          />
        </div>
        <p className='ml-[10px] text-[14px] font-semibold'>{placeName}</p>
      </div>
      <div className='mb-[15px] flex'>
        <DetailRating initialRating={ratingPoint} />
        <span className='ml-[8px] text-[12px] text-caption'>{createDate}</span>
      </div>
      <p className='pb-[15px] text-[12px]'>{truncatedText}</p>
      {/* <div className='imgList flex flex-wrap gap-[12px] pb-[40px]'>
        <div className='imgWrap h-[50px] w-[50px] rounded-[10px] border-2 border-border bg-background'></div>
        <div className='imgWrap h-[50px] w-[50px] rounded-[10px] border-2 border-border bg-background'></div>
      </div> */}
    </div>
  );
};

export default MyReviewListItem;
