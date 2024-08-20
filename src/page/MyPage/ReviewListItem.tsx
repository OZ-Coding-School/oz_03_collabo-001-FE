import classNames from 'classnames';
import { GoStarFill } from 'react-icons/go';

interface ReviewListItemProps {
  className?: string;
}

const ReviewListItem: React.FC<ReviewListItemProps> = ({ className }) => {
  const borderClass = classNames({
    'border-t border-border': className !== 'first',
    'items-center py-[10px] flex': true,
  });

  return (
    <div>
      <div className={borderClass}>
        <div className='imgWrap h-[50px] w-[50px] overflow-hidden rounded-[10px] bg-background'></div>
        <p className='ml-[10px] text-[14px] font-semibold'>
          &#91;경기&#93; 스타필드 일산
        </p>
      </div>
      <div className='mb-[15px] flex'>
        <div className='flex gap-[4px]'>
          <GoStarFill className='font-[12px] text-[#fddf02]' />
          <GoStarFill className='font-[12px] text-[#fddf02]' />
          <GoStarFill className='font-[12px] text-[#fddf02]' />
          <GoStarFill className='font-[12px] text-[#fddf02]' />
        </div>
        <span className='ml-[8px] text-[12px] text-caption'>2024.01.01</span>
      </div>
      <p className='pb-[15px] text-[12px]'>
        친절하고 좋아요 아이들이랑 강아지랑 놀께 많아요 친절하고 좋아요
        아이들이랑 강아지랑 놀께 많아요친절하고 좋아요 아이들이랑 강아지랑 놀께
        많아요친절하고 좋아요 아이들이랑 강아지랑 놀께 많아요친절하고 좋아요
        아이들이랑 강아지랑 놀께 많아요친절하고 좋아요 아이들이랑 강아지랑 놀께
        많아요친절하고 좋아요 아이들이랑 강아지랑 놀께 많아요친절하고 좋아요
        아이들이랑 강아지랑 놀께 많아요친절하고 좋아요 아이들이랑 강아지랑 놀께
        많아요
      </p>
      {/* <div className='imgList flex flex-wrap gap-[12px] pb-[40px]'>
        <div className='imgWrap h-[50px] w-[50px] rounded-[10px] border-2 border-border bg-background'></div>
        <div className='imgWrap h-[50px] w-[50px] rounded-[10px] border-2 border-border bg-background'></div>
      </div> */}
    </div>
  );
};

export default ReviewListItem;
