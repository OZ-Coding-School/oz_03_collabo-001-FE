/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import sharp from '../../assets/Icon/Detail_Icon/Sharp.svg';
import tag from '../../assets/Icon/Detail_Icon/Tag.svg';
import mapMark from '../../assets/Icon/Detail_Icon/MapMark.svg';
import copy from '../../assets/Icon/Detail_Icon/Copy.svg';
import { toast } from 'react-toastify';

interface ShopDetailDataProps {
  tags: string;
  price: string;
  link: string;
  address: string;
}

const ShopDetailData: React.FC<ShopDetailDataProps> = ({
  tags,
  price,
  link,
  address,
}) => {
  const handleLinkPlace = () => {
    if (link === null) {
      toast.error('해당 장소의 링크가 없습니다.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    window.open(link, '_blank');
  };

  const handleMapPlace = () => {
    if (address === null) {
      toast.error('해당 장소의 주소가 없습니다.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    window.open(`https://map.naver.com/p/search/${address}`, '_blank');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      toast.success('주소 복사에 성공했습니다.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (err) {
      console.error('복사 실패:', err);
      toast.error('주소 복사에 실패했습니다.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  return (
    <div className='flex h-[90px] flex-col justify-center gap-1 border-b-[0.5px] border-t-[0.5px] border-border bg-white px-[12px] text-[#808080]'>
      <div className='flex h-[15px] items-center'>
        <img src={sharp} alt='#아이콘' className='mr-[5px] h-[15px] w-[15px]' />
        <span className='max-w-[350px] overflow-hidden text-ellipsis whitespace-nowrap text-[13px]'>
          {tags}
        </span>
      </div>
      <div className='flex h-[15px] items-center justify-between'>
        <div className='flex items-center'>
          <img
            src={tag}
            alt='태그아이콘'
            className='mr-[5px] h-[15px] w-[15px]'
          />
          <span className='max-w-[260px] overflow-hidden text-ellipsis whitespace-nowrap text-[13px]'>
            {price}
          </span>
        </div>
        <button
          onClick={handleLinkPlace}
          className='w-[52px] rounded-[5px] border-[0.5px] border-[#666666] text-[9px]'
        >
          가격더보기
        </button>
      </div>
      <div className='flex h-[15px] items-center justify-between'>
        <div className='flex items-center'>
          <img
            src={mapMark}
            alt='맵마크아이콘'
            className='mr-[5px] h-[15px] w-[15px]'
          />
          <div className='max-w-[260px] overflow-hidden text-ellipsis whitespace-nowrap text-[13px]'>
            {address}
          </div>
        </div>
        <div className='flex items-center'>
          <img
            src={copy}
            alt='복사아이콘'
            className='mx-[5px] h-[15px] w-[15px] cursor-pointer'
            onClick={handleCopy}
          />
          <button
            onClick={handleMapPlace}
            className='w-[52px] rounded-[5px] border-[0.5px] border-[#666666] text-[9px]'
          >
            지도보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopDetailData;
