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
      if (inputValue === name) {
        setIsEditing(false);
        return;
      }

      if (inputValue === '') {
        setIsEditing(false);
        return;
      }

      try {
        const response = await axios.post(
          `https://api.dogandbaby.co.kr/users/mypage/update-name/?name=${inputValue}`,
          {},
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setName(inputValue);
          setIsEditing(false);
        } else if (response.status === 212) {
          toast.error('중복된 닉네임 입니다!', {
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
        setInputValue(name);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputValue === name) {
        setIsEditing(false);
        return;
      }

      try {
        await axios.post(
          `https://api.dogandbaby.co.kr/users/mypage/update-name/?name=${inputValue}`,
          {},
          {
            withCredentials: true,
          }
        );

        setName(inputValue);
        setIsEditing(false);
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
        setInputValue(name);
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
    <div className='flex items-center justify-between'>
      <div className='h-[24px] text-[18px] font-bold'>
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
        className='flex h-[24px] w-[45px] items-center justify-center text-[10px] text-caption hover:underline'
        onClick={handleEditClick}
      >
        {isEditing ? '저장' : '이름변경'}
      </button>
    </div>
  );
};

export default NicknameEdit;
