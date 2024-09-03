/* eslint-disable jsx-a11y/no-autofocus */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';

interface NicknameEditProps {
  nickname: string;
}

const NicknameEdit: React.FC<NicknameEditProps> = ({ nickname }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(nickname);
  const [inputValue, setInputValue] = useState(nickname);

  const handleEditClick = async () => {
    if (isEditing) {
      try {
        setName(inputValue);
        sessionStorage.setItem('nickname', inputValue);

        await axios.post(
          'http://127.0.0.1:8000/users/mypage/update-name/',
          {
            nickname: inputValue,
          },
          { withCredentials: true }
        );
      } catch (error) {
        console.error('서버에 닉네임 변경 실패:', error);
        toast.error('닉네임 변경 실패!', {
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
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        setName(inputValue);
        sessionStorage.setItem('nickname', inputValue);
        setIsEditing(false);

        await axios.post(
          'http://127.0.0.1:8000/users/mypage/update-name/',
          {
            nickname: inputValue,
          },
          { withCredentials: true }
        );
      } catch (error) {
        console.error('서버에 닉네임 저장 실패:', error);
        toast.error('닉네임 변경 실패!', {
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
    }
  };

  useEffect(() => {
    const savedName = sessionStorage.getItem('nickname');
    if (savedName) {
      setName(savedName);
      setInputValue(savedName);
    } else {
      setName(nickname);
    }
  }, [nickname]);

  return (
    <div className='flex justify-center'>
      <div className='h-[24px] w-[201px] text-[18px] font-bold'>
        {isEditing ? (
          <input
            type='text'
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={twMerge(
              'h-[24px] w-full text-[18px] font-bold focus:outline-none',
              isEditing
                ? 'rounded-[5px] border border-[#f2f2f2]'
                : 'border-none bg-transparent'
            )}
            autoFocus
            maxLength={10}
          />
        ) : (
          name
        )}
      </div>
      <button
        className='flex h-[24px] w-[45px] items-center justify-center text-[10px] text-caption underline'
        onClick={handleEditClick}
      >
        {isEditing ? '저장' : '이름변경'}
      </button>
    </div>
  );
};

export default NicknameEdit;
