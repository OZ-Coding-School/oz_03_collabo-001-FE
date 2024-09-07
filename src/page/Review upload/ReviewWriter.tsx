import { useEffect, useState } from 'react';
import axios from 'axios';
import defaultProfile from '../../assets/DefaultProfile.svg';

const ReviewWriter = () => {
  const [profileImage, setProfileImage] = useState(defaultProfile);
  const [userName, setUserName] = useState('작성자');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          'https://api.dogandbaby.co.kr/users/profile/',
          {
            withCredentials: true,
          }
        );

        if (response.data.profile.profile_image) {
          setProfileImage(response.data.profile.profile_image);
        }

        if (response.data.profile.nickname) {
          setUserName(response.data.profile.nickname);
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
        src={profileImage}
        alt='프로필 이미지'
        className='h-[66px] w-[66px] rounded-full object-cover'
      />
      <p className='ml-4'>{userName}</p>
    </div>
  );
};

export default ReviewWriter;
