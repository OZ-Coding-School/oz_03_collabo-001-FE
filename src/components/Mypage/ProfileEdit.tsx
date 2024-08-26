import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import defaultProfile from '../../assets/DefaultProfile.svg';
import axios from 'axios';

const ProfilePhotoEdit: React.FC = () => {
  const [userImg, setUserImg] = useState<string>(defaultProfile);
  const [file, setFile] = useState<File | null>(null);
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

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          const imgDataUrl = reader.result as string;

          if (imgDataUrl.length > 5000000) {
            alert('이미지 크기가 너무 큽니다. 다른 이미지를 선택해 주세요.');
            return;
          }

          try {
            setUserImg(imgDataUrl);
            sessionStorage.setItem('profileImg', imgDataUrl);
          } catch (error) {
            console.error('세션 저장소에 저장 실패:', error);
          }
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

  const uploadProfilePhoto = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('profile_img', file);

      try {
        const response = await axios.post(
          '/api/upload-profile-photo',
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
    }
  };

  const handleProfileChange = () => {
    handleButtonClick();
    if (file) {
      uploadProfilePhoto();
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
        onClick={handleProfileChange}
      >
        프로필변경
      </button>
    </div>
  );
};

export default ProfilePhotoEdit;
