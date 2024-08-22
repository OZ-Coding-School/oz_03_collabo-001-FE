// import axios from 'axios';
import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

const UserNameEditor = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [inputValue, setInputValue] = useState(name);

  // 컴포넌트가 마운트될 때 서버에서 닉네임을 불러옴
  //   useEffect(() => {
  //     axios
  //       .get('/api/username')
  //       .then((response) => {
  //         setName(response.data.name);
  //         setInputValue(response.data.name);
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching the nickname:', error);
  //       });
  //   }, []);

  const handleEditClick = () => {
    if (isEditing) {
      // 현재 편집 중일 때 버튼을 누르면 저장
      setName(inputValue);
      sessionStorage.setItem('nickname', inputValue);
    }
    setIsEditing(!isEditing); // 편집 모드 토글
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setName(inputValue); // 엔터를 누르면 저장
      sessionStorage.setItem('nickname', inputValue);
      setIsEditing(false); // 편집 모드 종료
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
  //서버랑 같이사용시
  //   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //     if (e.key === 'Enter') {
  //       axios.post('/api/username', { name: inputValue })
  //         .then(() => {
  //           setName(inputValue);
  //           setIsEditing(false); // 편집 모드 종료
  //         })
  //         .catch(error => {
  //           console.error('Error updating the nickname:', error);
  //         });
  //     }
  //   };

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

export default UserNameEditor;
