import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

const NicknameEdit: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [inputValue, setInputValue] = useState(name);

  const handleEditClick = async () => {
    if (isEditing) {
      try {
        // 현재 편집 중일 때 버튼을 누르면 저장
        setName(inputValue);
        sessionStorage.setItem('nickname', inputValue);

        await axios.post('http://127.0.0.1:8000/users/mypage/update-name/', {
          nickname: inputValue,
        });
      } catch (error) {
        console.error('서버에 닉네임 저장 실패:', error);
        // 실패 시 처리할 로직 (예: 에러 메시지 표시)
      }
    }
    setIsEditing(!isEditing); // 편집 모드 토글
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        setName(inputValue); // 엔터를 누르면 저장
        sessionStorage.setItem('nickname', inputValue);
        setIsEditing(false); // 편집 모드 종료

        // 서버에 저장 요청
        await axios.post('http://127.0.0.1:8000/users/mypage/update-name/', {
          nickname: inputValue,
        });
      } catch (error) {
        console.error('서버에 닉네임 저장 실패:', error);
        // 실패 시 처리할 로직
      }
    }
  };
  useEffect(() => {
    const savedName = sessionStorage.getItem('nickname');
    if (savedName) {
      setName(savedName);
      setInputValue(savedName);
    } else {
      setName('작성자이름(별명)'); // 기본값
    }
  }, []);

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
