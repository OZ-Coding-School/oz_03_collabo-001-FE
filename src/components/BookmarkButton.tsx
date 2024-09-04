import React, { useState } from 'react';
import BookmarkLine from '../assets/Icon/BookMark/Bg_BookMark_Line.svg';
import BookmarkFill from '../assets/Icon/BookMark/Bg_BookMark_Fill.svg';
import axios from 'axios';
import { toast } from 'react-toastify';

interface BookmarkButtonProps {
  placeId: number;
  isBookmarkedInitially: boolean;
  onBookmarkChange?: (placeId: number) => void;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  placeId,
  isBookmarkedInitially,
  onBookmarkChange,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(isBookmarkedInitially);

  const handleBookmarkToggle = async () => {
    try {
      if (isBookmarked) {
        // 북마크 제거 요청
        await axios.delete(
          `http://127.0.0.1:8000/places/${placeId}/bookmark/`,
          { withCredentials: true }
        );
        setIsBookmarked(false);
      } else {
        await axios.post(
          `http://127.0.0.1:8000/places/${placeId}/bookmark/`,
          {},
          { withCredentials: true }
        );
        setIsBookmarked(true);
      }

      if (onBookmarkChange) {
        onBookmarkChange(placeId);
      }
    } catch (error) {
      console.error('북마크 처리 실패:', error);
      toast.error('로그인 후 사용해 주세요!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  return (
    <button
      type='button'
      aria-label='북마크하기'
      onClick={handleBookmarkToggle}
    >
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
