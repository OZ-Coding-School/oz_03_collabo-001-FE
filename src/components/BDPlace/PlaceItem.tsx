import { useState } from 'react';
import BookmarkLine from '../../assets/Icon/BookMark/BookMark_Line.svg';
import BookmarkFill from '../../assets/Icon/BookMark/Bookmark_Fill.svg';
import Location from '../../assets/Location.svg';
import Star from '../../assets/star.svg';

const PlaceItem = () => {
  const [BookMark, setBookMark] = useState(false);
  return (
    <div className='flex items-center border-b border-border bg-white p-[10px]'>
      <div className='imgWrap h-[70px] w-[119px] rounded-lg bg-background'></div>

      <div className='ml-[12px] grow p-[8px]'>
        <ul>
          <li className='relative mb-[4px] text-[14px] font-semibold'>
            <p>&#91;경기&#93; 스타필드 일산</p>
            <button
              type='button'
              aria-label='북마크하기'
              className='absolute right-0 top-0'
              onClick={() => {
                setBookMark(!BookMark);
              }}
            >
              <img
                src={BookMark ? BookmarkFill : BookmarkLine}
                alt='북마크 아이콘'
                aria-hidden
              />
            </button>
          </li>
          <li className='mb-[4px] flex'>
            <img src={Location} alt='' aria-hidden />
            <span className='ml-[4px] text-[12px] font-medium text-caption'>
              경기 고양시 덕양구 고양대로 1955
            </span>
          </li>
          <li className='flex'>
            <img src={Star} alt='별점' aria-hidden />
            <span aria-label='별점' className='ml-[4px] text-[12px]'>
              4.8
            </span>
            <span
              aria-label='후기 갯수'
              className='ml-[4px] text-[12px] text-caption'
            >
              &#40;3&#41;
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PlaceItem;
