import classNames from 'classnames';
import useTruncatedText from '../../../hooks/useTruncatedText';

interface WritingListItemProps {
  className?: string;
  boardText: string;
}

const WritingListItem: React.FC<WritingListItemProps> = ({
  className,
  boardText,
}) => {
  const borderClass = classNames({
    'border-t border-border': className !== 'first',
    'items-center py-[10px] flex': true,
  });

  const truncatedText = useTruncatedText(boardText, 210);

  return (
    <div>
      <div className={borderClass}>
        <p className='max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-semibold'>
          유모차 추천해주세요!
        </p>
        <span className='ml-[4px] text-[12px] text-caption'>2024.01.01</span>
      </div>
      <p className='pb-[15px] text-[12px]'>{truncatedText}</p>
    </div>
  );
};

export default WritingListItem;
