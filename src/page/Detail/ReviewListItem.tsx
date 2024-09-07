import classNames from 'classnames';
import DetailRating from './DetailRating';
import useTruncatedText from '../../hooks/useTruncatedText';
import Scrollbars from 'react-custom-scrollbars-2';
import default_profile from '../../assets/DefaultProfile.svg';

interface Images {
  url: string;
}

interface ReviewListItemProps {
  id: number;
  className?: string;
  reviewText: string;
  nickname: string;
  profile_img: string;
  rating: number;
  updateDate: string;
  images: Images[];
}

const ReviewListItem: React.FC<ReviewListItemProps> = ({
  id,
  className,
  reviewText,
  nickname,
  profile_img,
  rating,
  updateDate,
  images,
}) => {
  const truncatedText = useTruncatedText(reviewText, 100);

  const borderClass = classNames({
    'border-border border-b': className !== 'noBorder',
    '': true,
  });

  return (
    <div className={borderClass} id={id.toString()}>
      <div className='flex items-center pt-[10px]'>
        <div className='imgWrap h-[23px] w-[23px]'>
          <img
            className='h-[23px] w-[23px] rounded-full'
            src={profile_img || default_profile}
            alt='프로필 이미지'
          />
        </div>
        <p className='ml-[8px] text-[14px] font-semibold'>{nickname}</p>
        <span className='ml-[4px] mr-[8px] text-[10px] text-caption'>
          {updateDate}
        </span>
        <DetailRating initialRating={rating} />
      </div>

      <div>
        <p className='py-[10px] text-[12px]'>{truncatedText}</p>
        {images.length > 0 ? (
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
                    <img
                      src={`${images[i].url}`}
                      alt='이미지'
                      className='h-[115px] w-[115px] object-cover'
                    />
                  </div>
                );
              })}
            </div>
          </Scrollbars>
        ) : (
          <div className='py-4 text-[10px] text-caption opacity-40'>
            이미지를 불러오는데 실패하였습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewListItem;
