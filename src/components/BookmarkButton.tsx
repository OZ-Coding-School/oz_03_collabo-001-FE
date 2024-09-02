import React, { useState } from 'react';
import BookmarkLine from '../assets/Icon/BookMark/Bg_BookMark_Line.svg';
import BookmarkFill from '../assets/Icon/BookMark/Bg_BookMark_Fill.svg';
import axios from 'axios';
import { toast } from 'react-toastify';
import useVerify from '../hooks/useVerify';
import useAuthStore from '../store/authStore';

interface BookmarkButtonProps {
  placeId: string;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ placeId }) => {
  const [bookMark, setBookMark] = useState(false);
  const { checkLoginStatus } = useVerify();
  const { isAuthenticated } = useAuthStore();

  const handleBookmarkToggle = async () => {
    if (!isAuthenticated)
      return toast.error('로그인 후 사용해주세요!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

    try {
      await checkLoginStatus();
      setBookMark(true);

      await axios.post(
        `http://127.0.0.1:8000/places/${placeId}/bookmark/`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      setBookMark(false);
      console.error('북마크 저장 실패:', error);

      toast.error('로그인 상태를 확인해주세요!', {
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
        src={bookMark ? BookmarkFill : BookmarkLine}
        alt='북마크 아이콘'
        className='h-5'
        aria-hidden
      />
    </button>
  );
};

export default BookmarkButton;
