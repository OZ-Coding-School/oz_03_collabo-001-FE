import classNames from 'classnames';
import DetailRating from './DetailRating';
import useTruncatedText from '../../hooks/useTruncatedText';

interface ReviewListItemProps {
  className?: string;
  reviewText: string;
}

const ReviewListItem: React.FC<ReviewListItemProps> = ({
  className,
  reviewText,
}) => {
  // useTruncatedText 훅 사용
  const truncatedText = useTruncatedText(reviewText, 100);

  //첫번째, 마지막 아이템의 경우 하단 border 없앰
  const borderClass = classNames({
    'border-border border-b': className !== 'noBorder',
    '': true,
  });

  return (
    <div className={borderClass}>
      <div className='flex items-center pt-[10px]'>
        <div className='imgWrap h-[23px] w-[23px] rounded-full bg-background'></div>
        <p className='ml-[8px] text-[14px] font-semibold'>애개육아맘</p>
        <span className='ml-[4px] mr-[8px] text-[12px] text-caption'>
          2024.01.01
        </span>
        <DetailRating initialRating={4} />
      </div>

      <div>
        <p className='py-[10px] text-[12px]'>{truncatedText}</p>

        <div className='flex justify-between pb-[30px]'>
          <div className='imgWrap h-[115px] w-[115px] rounded-[10px] border-2 border-border bg-background'></div>
          <div className='imgWrap h-[115px] w-[115px] rounded-[10px] border-2 border-border bg-background'></div>
          <div className='imgWrap h-[115px] w-[115px] rounded-[10px] border-2 border-border bg-background'></div>
        </div>
      </div>
    </div>
  );
};

export default ReviewListItem;
