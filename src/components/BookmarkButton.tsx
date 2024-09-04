import React, { useEffect, useState } from 'react';
import BookmarkLine from '../assets/Icon/BookMark/Bg_BookMark_Line.svg';
import BookmarkFill from '../assets/Icon/BookMark/Bg_BookMark_Fill.svg';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useBookmarkStore } from '../store/bookmarkStore';

interface BookmarkButtonProps {
  placeId: number;
  isBookmarked: boolean;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  placeId,
  isBookmarked,
}) => {
  const {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked: isBookmarkedInStore,
  } = useBookmarkStore();
  const [isBookmarkedState, setIsBookmarkedState] = useState(isBookmarked);

  const handleBookmarkToggle = async () => {
    try {
      if (isBookmarkedState) {
        await axios.delete(
          `http://127.0.0.1:8000/places/${placeId}/bookmark/`,
          {
            withCredentials: true,
          }
        );
        console.log('북마크 삭제 완료');
        removeBookmark(placeId);
      } else {
        await axios.post(
          `http://127.0.0.1:8000/places/${placeId}/bookmark/`,
          {},
          {
            withCredentials: true,
          }
        );
        console.log('북마크 저장 완료');
        addBookmark(placeId);
      }
      setIsBookmarkedState(!isBookmarkedState);
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

  useEffect(() => {
    setIsBookmarkedState(isBookmarkedInStore(placeId));
  }, [bookmarks, placeId, isBookmarkedInStore]);

  return (
    <button
      type='button'
      aria-label='북마크하기'
      onClick={handleBookmarkToggle}
    >
      <img
        src={isBookmarkedState ? BookmarkFill : BookmarkLine}
        alt='북마크 아이콘'
        className='h-5'
        aria-hidden
      />
    </button>
  );
};

export default BookmarkButton;
