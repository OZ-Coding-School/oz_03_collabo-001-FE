import React from 'react';
import sharp from '../../assets/Icon/Detail_Icon/Sharp.svg';
import tag from '../../assets/Icon/Detail_Icon/Tag.svg';
import mapMark from '../../assets/Icon/Detail_Icon/MapMark.svg';
import copy from '../../assets/Icon/Detail_Icon/Copy.svg';

const ShopDetailData: React.FC = () => {
  return (
    <div className='flex h-[90px] flex-col justify-center border-b-[0.5px] border-t-[0.5px] border-border bg-white text-[#808080]'>
      <div className='flex h-[18px] items-center pr-[12px]'>
        <img
          src={sharp}
          alt='#아이콘'
          className='ml-[10px] mr-[5px] h-[15px] w-[15px]'
        />
        <div className='mr-[5px] h-[18px] w-[354px] text-[13px]'>
          3~5살 어린이, 소형견에게 추천해요
        </div>
      </div>

      <div className='my-[5px] flex h-[18px] items-center pr-[12px]'>
        <img
          src={tag}
          alt='태그아이콘'
          className='ml-[10px] mr-[5px] h-[16px] w-[16px]'
        />
        <div className='mr-[5px] h-[18px] w-[300px] text-[13px]'>
          1시간 : 대인 6000원, 소인 3000원, 반려견 2000원
        </div>
        <button className='h-[18px] w-[52px] rounded-[5px] border-[0.5px] border-[#666666] text-[9px]'>
          가격더보기
        </button>
      </div>

      <div className='flex h-[18px] items-center pr-[12px]'>
        <img
          src={mapMark}
          alt='맵마크아이콘'
          className='ml-[10px] mr-[5px] h-[16px] w-[16px]'
        />
        <div className='h-[18px] w-[280px] text-[13px]'>
          경기도 고양시 일산동구 정발산동 145-4번지
        </div>
        <img
          src={copy}
          alt='복사아이콘'
          className='mx-[5px] h-[14px] w-[14px]'
        />
        <button className='h-[18px] w-[52px] rounded-[5px] border-[0.5px] border-[#666666] text-[9px]'>
          지도보기
        </button>
      </div>
    </div>
  );
};

export default ShopDetailData;
