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
    <div className='mr-[18px] flex h-[78px] w-[79px] flex-col items-center justify-center'>
      <img
        className='mb-[5px] h-[66px] w-[66px] rounded-full object-cover'
        src={userImg}
        alt='프로필 기본이미지'
      ></img>
      <input
        type='file'
        style={{ display: 'none' }}
        accept='image/jpg,impge/png,image/jpeg'
        name='profile_img'
        onChange={onChange}
        ref={fileInput}
      />
      <button
        className='text-[10px] text-caption underline'
        onClick={handleProfileChange}
      >
        프로필변경
      </button>
    </div>
  );
};

export default ProfilePhotoEdit;
