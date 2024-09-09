import React from 'react';
import classNames from 'classnames';

interface BDInfoPopularItemProps {
  className?: string;
}

const BDInfoPopularItem: React.FC<BDInfoPopularItemProps> = ({ className }) => {
  const borderClass = classNames({
    'border-b border-border': className !== 'last',
    'flex items-center py-[15px]': true,
  });

  return (
    <div className={borderClass}>
      <span className='h-[16px] w-[16px] rounded-[10px] bg-primary text-center text-[10px] leading-[16px] text-white'>
        1
      </span>
      <div className='imgWrap ml-[8px] h-[47px] w-[47px] rounded-[10px] bg-background'></div>
      <div className='ml-[8px]'>
        <p className='text-[14px] font-semibold'>강아지털 이대로 괜찮을까요?</p>
        <p className='text-[12px]'>너무 고민하지마세요.</p>
        <div className='text-[12px]'>
          <span>글쓴이</span>
          <span className='ml-[10px] text-caption'>2024.01.01</span>
        </div>
      </div>
    </div>
  );
};

export default BDInfoPopularItem;
