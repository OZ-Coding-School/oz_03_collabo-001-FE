import classNames from 'classnames';
import { GoStarFill } from 'react-icons/go';

interface WritingListItemProps {
  className?: string;
}

const WritingListItem: React.FC<WritingListItemProps> = ({ className }) => {
  const borderClass = classNames({
    'border-t border-border': className !== 'first',
    'items-center py-[10px] flex': true,
  });

  return (
    <div>
      <div className={borderClass}>
        <p className='max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-semibold'>
          유모차 추천해주세요!
        </p>
        <span className='ml-[4px] text-[12px] text-caption'>2024.01.01</span>
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
    </div>
  );
};

export default WritingListItem;
