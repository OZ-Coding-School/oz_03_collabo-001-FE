import classNames from 'classnames';
import DetailRating from './DetailRating';
import useTruncatedText from '../../hooks/useTruncatedText';
import Scrollbars from 'react-custom-scrollbars-2';

interface Images {
  url: string;
}

interface ReviewListItemProps {
  className?: string;
  reviewText: string;
  rating: number;
  images: Images[];
  nickname: string;
}

const ReviewListItem: React.FC<ReviewListItemProps> = ({
  className,
  reviewText,
  images,
  rating,
  nickname,
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
        <p className='ml-[8px] text-[14px] font-semibold'>{nickname}</p>
        <span className='ml-[4px] mr-[8px] text-[12px] text-caption'>
          2024.01.01
        </span>
        <DetailRating initialRating={rating} />
      </div>

      <div>
        <p className='py-[10px] text-[12px]'>{truncatedText}</p>
        {images.length !== 0 ? (
          <Scrollbars
            style={{ width: '100%', height: '115px', marginBottom: '20px' }}
            autoHide
          >
            <div className='flex gap-[7px]'>
              {images.map((_, i) => {
                return (
                  <div
                    className='imgWrap h-[115px] w-[115px] flex-shrink-0 overflow-hidden rounded-[10px] border-2 border-border bg-background'
                    key={i}
                  >
                    {/* <p>{images[i].url}</p> */}
                    <img
                      src={`${images[i].url}`}
                      alt=''
                      className='h-[115px] w-[115px] object-cover'
                    />
                  </div>
                );
              })}
            </div>
          </Scrollbars>
        ) : null}
      </div>
    </div>
  );
};

export default ReviewListItem;
