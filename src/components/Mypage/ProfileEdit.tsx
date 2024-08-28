import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import defaultProfile from '../../assets/DefaultProfile.svg';
import axios from 'axios';

const ProfilePhotoEdit: React.FC = () => {
  const [userImg, setUserImg] = useState<string>(defaultProfile);
  const [, setFile] = useState<File | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);

  // 페이지가 로드될 때 sessionStorage에서 이미지 로드
  useEffect(() => {
    const savedImg = sessionStorage.getItem('profileImg');
    if (savedImg) {
      setUserImg(savedImg);
    } else {
      setUserImg(defaultProfile); // 기본 프로필 이미지를 설정
    }
  }, []);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = async () => {
        if (reader.readyState === 2) {
          const imgDataUrl = reader.result as string;

          if (imgDataUrl.length > 5000000) {
            alert('이미지 크기가 너무 큽니다. 다른 이미지를 선택해 주세요.');
            return;
          }

          setUserImg(imgDataUrl);
          sessionStorage.setItem('profileImg', imgDataUrl);

          await uploadProfilePhoto(selectedFile);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleButtonClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const uploadProfilePhoto = async (selectedFile: File) => {
    const formData = new FormData();
    formData.append('profile_img', selectedFile);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/users/mypage/update-image/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        console.log('업로드 성공');
      } else {
        console.log('업로드 실패');
      }
    } catch (error) {
      console.log('업로드 실패');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='mr-[18px] flex h-[66px] w-[79px] flex-col items-center justify-center'>
        <div className='relative h-[66px] w-[66px]'>
          <img
            className='absolute inset-0 h-full w-full rounded-full object-cover'
            src={userImg}
            alt='프로필 이미지'
          />
          <input
            type='file'
            className='absolute inset-0 cursor-pointer opacity-0'
            accept='image/jpg,image/png,image/jpeg'
            name='profile_img'
            onChange={onChange}
            ref={fileInput}
          />
        </div>
      </div>
      <button
        className='mr-[18px] mt-[10px] w-[79px] text-[10px] text-caption underline'
        onClick={handleButtonClick}
      >
        프로필변경
      </button>
    </div>
  );
};

export default ProfilePhotoEdit;
