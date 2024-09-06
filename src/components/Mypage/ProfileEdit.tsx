import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import defaultProfile from '../../assets/DefaultProfile.svg';
import axios from 'axios';
import { toast } from 'react-toastify';

interface ProfilePhotoEditProps {
  profile_image: string | null;
}

const ProfilePhotoEdit: React.FC<ProfilePhotoEditProps> = ({
  profile_image,
}) => {
  const [userImg, setUserImg] = useState<string>(
    profile_image || defaultProfile
  );
  const [prevImg, setPrevImg] = useState<string>(
    profile_image || defaultProfile
  );
  const [, setFile] = useState<File | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const savedImg = sessionStorage.getItem('profileImg');
    if (savedImg) {
      setUserImg(savedImg);
    } else if (profile_image) {
      if (profile_image.length > 5000000) {
        toast.error('프로필 용량 문제로 기본 이미지로 대체됩니다.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          style: { fontSize: '10px' },
        });

        setUserImg(defaultProfile);
      }
      setUserImg(profile_image);
    } else {
      setUserImg(defaultProfile);
    }

    setPrevImg(profile_image || defaultProfile);
  }, [profile_image]);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = async () => {
        if (reader.readyState === 2) {
          const imgDataUrl = reader.result as string;

          if (imgDataUrl.length > 5000000) {
            toast.error('이미지 용량이 큽니다. 다른 이미지를 등록해주세요.', {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
              style: { fontSize: '10px' },
            });
            return;
          }

          setUserImg(imgDataUrl);
          sessionStorage.setItem('profileImg', imgDataUrl);

          const success = await uploadProfilePhoto(selectedFile);
          if (!success) {
            setUserImg(prevImg);
            sessionStorage.setItem('profileImg', prevImg);
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

  const uploadProfilePhoto = async (selectedFile: File) => {
    const formData = new FormData();
    formData.append('profile_image', selectedFile);

    try {
      const response = await axios.post(
        'https://api.dogandbaby.co.kr/users/mypage/update-image/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success('이미지 변경 완료!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        return true;
      }
    } catch (error) {
      console.error('업로드 실패', error);
      toast.error('프로필 변경 실패!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return false;
    }
  };

  return (
    <div className='flex w-[70px] flex-col items-center justify-center'>
      <div className='flex h-[66px] flex-col items-center justify-center'>
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
        className='mt-[10px] text-[10px] text-caption underline'
        onClick={handleButtonClick}
      >
        프로필변경
      </button>
    </div>
  );
};

export default ProfilePhotoEdit;
