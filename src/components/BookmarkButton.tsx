import React from 'react';
import BookmarkLine from '../assets/Icon/BookMark/Bg_BookMark_Line.svg';
import BookmarkFill from '../assets/Icon/BookMark/Bg_BookMark_Fill.svg';

interface BookmarkButtonProps {
  placeId: string;
  isBookmarked: boolean; // 프롭스로 isBookmarked를 추가
  onToggle: () => void;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  isBookmarked,
  onToggle,
}) => {
  return (
    <button type='button' aria-label='북마크하기' onClick={onToggle}>
      <img
        src={isBookmarked ? BookmarkFill : BookmarkLine}
        alt='북마크 아이콘'
        className='h-5'
        aria-hidden
      />
    </button>
  );
};

export default BookmarkButton;
