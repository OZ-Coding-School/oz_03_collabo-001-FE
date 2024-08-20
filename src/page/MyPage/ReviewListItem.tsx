import classNames from 'classnames';
import useTruncatedText from '../../hooks/useTruncatedText';
import DetailRating from '../Detail/DetailRating';

interface ReviewListItemProps {
  className?: string;
  reviewText: string;
}

const ReviewListItem: React.FC<ReviewListItemProps> = ({
  className,
  reviewText,
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
        <div className='imgWrap h-[50px] w-[50px] overflow-hidden rounded-[10px] bg-background'></div>
        <p className='ml-[10px] text-[14px] font-semibold'>
          &#91;경기&#93; 스타필드 일산
        </p>
      </div>
      <div className='mb-[15px] flex'>
        <DetailRating initialRating={5} />
        <span className='ml-[8px] text-[12px] text-caption'>2024.01.01</span>
      </div>
      <p className='pb-[15px] text-[12px]'>{truncatedText}</p>
      {/* <div className='imgList flex flex-wrap gap-[12px] pb-[40px]'>
        <div className='imgWrap h-[50px] w-[50px] rounded-[10px] border-2 border-border bg-background'></div>
        <div className='imgWrap h-[50px] w-[50px] rounded-[10px] border-2 border-border bg-background'></div>
      </div> */}
    </div>
  );
};

export default ReviewListItem;
