import React from 'react';

const PhotoUpload: React.FC = () => {
  return (
    <div className='h-[416px] bg-white'>
      {/* 사진등록부분 */}
      <div className='h-[334px] space-y-[8px] px-[12px] py-[15px]'>
        <div className='h-[40px] content-end text-[14px] font-semibold'>
          사진을 등록해주세요.
        </div>
        <div className='flex h-[14px] items-center text-[12px] text-[#808080]'>
          최대 5장까지 등록가능합니다.(*최소 1장 필수등록)
        </div>
        {/* 네모칸 1번째  */}
        <div className='flex space-x-[19px]'>
          <div className='flex h-[113px] w-[113px] items-center justify-center rounded-[6px] border border-[#e1e1e1] bg-[#fafafa]'>
            <div className='flex h-[16px] w-[81px] items-center justify-center text-[20px] text-[#afafaf]'>
              +
            </div>
          </div>
          <div className='flex h-[113px] w-[113px] items-center justify-center rounded-[6px] border border-[#e1e1e1] bg-[#fafafa]'>
            <div className='flex h-[16px] w-[81px] items-center justify-center text-[20px] text-[#afafaf]'>
              +
            </div>
          </div>
          <div className='flex h-[113px] w-[113px] items-center justify-center rounded-[6px] border border-[#e1e1e1] bg-[#fafafa]'>
            <div className='flex h-[16px] w-[81px] items-center justify-center text-[20px] text-[#afafaf]'>
              +
            </div>
          </div>
        </div>
        {/* 네모칸 2번째 줄 */}
        <div className='flex space-x-[19px]'>
          <div className='flex h-[113px] w-[113px] items-center justify-center rounded-[6px] border border-[#e1e1e1] bg-[#fafafa]'>
            <div className='flex h-[16px] w-[81px] items-center justify-center text-[20px] text-[#afafaf]'>
              +
            </div>
          </div>
          <div className='flex h-[113px] w-[113px] items-center justify-center rounded-[6px] border border-[#e1e1e1] bg-[#fafafa]'>
            <div className='flex h-[16px] w-[81px] items-center justify-center text-[20px] text-[#afafaf]'>
              +
            </div>
          </div>
        </div>
      </div>
      {/* 등록버튼부분 */}
      <div className='mb-[10px] h-[72px] px-[12px] pb-[10px] pt-[20px]'>
        <button className='h-[42px] w-[376px] rounded-[4px] bg-primary text-sm font-medium text-white'>
          등록
        </button>
      </div>
    </div>
  );
};

export default PhotoUpload;
