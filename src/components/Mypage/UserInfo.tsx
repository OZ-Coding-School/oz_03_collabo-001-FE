import React, { useState } from 'react';
import defaultProfile from '../../assets/DefaultProfile.svg';

const UserInfo: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className='bg-white flex justify-center'>
      {isLoggedIn ? (
        //로그인상태
        <div className='rounded-10px flex h-[119px] w-[360px] items-center border-[0.5px] border-[#b3b3b3] px-[15px] py-[20px]'>
          <div className='mr-[18px] flex h-[78px] w-[79px] flex-col items-center justify-center'>
            <img
              className='mb-[5px] h-[66px] w-[66px]'
              src={defaultProfile}
              alt='프로필 기본이미지'
            ></img>
            <p className='text-[10px] text-caption underline'>프로필변경</p>
          </div>
          <div>
            <div className='flex justify-center'>
              <div className='h-[24px] w-[201px] text-[18px] font-bold'>
                작성자이름(별명)
              </div>
              <p className='flex h-[24px] w-[45px] items-center justify-center text-[10px] text-caption underline'>
                이름변경
              </p>
            </div>
            <div className='mt-[5px] text-[12px] text-caption'>
              12345@naver.com(계정정보)
            </div>
          </div>
        </div>
      ) : (
        //비로그인 상태
        <div className='rounded-10px flex h-[119px] w-[360px] items-center border-[0.5px] border-[#b3b3b3] px-[15px] py-[20px]'>
          <button className='text-[18px] font-bold'>로그인하기</button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
