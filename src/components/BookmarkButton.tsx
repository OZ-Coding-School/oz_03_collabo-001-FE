import React from 'react';
import BookmarkLine from '../assets/Icon/BookMark/Bg_BookMark_Line.svg';
import BookmarkFill from '../assets/Icon/BookMark/Bg_BookMark_Fill.svg';
import axios from 'axios';
import { toast } from 'react-toastify';
import useBookmarkStore from '../store/useBookmarkStore';
import useAuthStore from '../store/useAuthStore';

interface BookmarkButtonProps {
  placeId: number;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ placeId }) => {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarkStore();
  const { isAuthenticated } = useAuthStore();

  const handleBookmarkToggle = async () => {
    if (!isAuthenticated) {
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
      return;
    }

    try {
      if (isBookmarked(placeId)) {
        await axios.delete(
          `https://api.dogandbaby.co.kr/places/${placeId}/bookmark/`,
          {
            withCredentials: true,
          }
        );

        console.log('북마크 삭제 완료');

        removeBookmark(placeId);
      } else {
        await axios.post(
          `https://api.dogandbaby.co.kr/places/${placeId}/bookmark/`,
          {},
          {
            withCredentials: true,
          }
        );

        console.log('북마크 추가 완료');

        addBookmark(placeId);
      }
    } catch (error) {
      console.error('북마크 저장 실패:', error);

      toast.error('북마크 저장에 실패했습니다.', {
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
        src={isBookmarked(placeId) ? BookmarkFill : BookmarkLine}
        alt='북마크 아이콘'
        className='h-5'
        aria-hidden
      />
    </button>
  );
};

export default BookmarkButton;
