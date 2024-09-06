import { useEffect, useState } from 'react';
import axios from 'axios';
import defaultProfile from '../../assets/DefaultProfile.svg';

const ReviewWriter = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/users/profile/',
          {
            withCredentials: true,
          }
        );
        if (response.data.profile_image) {
          setProfileImage(response.data.profile_image);
        }
        if (response.data.name) {
          // 작성자 이름을 추출하여 상태에 저장
          setUserName(response.data.name);
        }
      } catch (error) {
        console.error('사용자 프로필을 가져오는 데 실패했습니다.', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className='flex h-[80px] w-full items-center bg-[white] p-4'>
      <img
        src={profileImage || defaultProfile}
        alt='프로필 이미지'
        className='h-[66px] w-[66px] rounded-full object-cover'
      />
      <p className='ml-4'>{userName || '작성자 '}</p>
    </div>
  );
};

export default ReviewWriter;
