import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import iconHome from '../../assets/Icon/Nav_Bottom/BK_Home.svg';
import iconPlace from '../../assets/Icon/Nav_Bottom/BK_BDplace.svg';
import iconMain from '../../assets/Icon/Nav_Bottom/BK_Main.svg';
import iconMag from '../../assets/Icon/Nav_Bottom/BK_Magazine.svg';
import iconMy from '../../assets/Icon/Nav_Bottom/BK_My.svg';

interface LinkProps {
  link: string;
  img: string;
  text: string;
}

const FooterLink: React.FC<LinkProps> = ({ link, img, text }) => {
  return (
    <Link to={link} className='flex w-1/5 items-center'>
      <div className='w-full text-center'>
        <img
          src={img}
          alt=''
          aria-hidden
          className='mx-auto w-[18px] pt-[3px]'
        />
        <span className='text-[11px]'>{text}</span>
      </div>
    </Link>
  );
};

const FooterGnb = () => {
  return (
    <footer className='fixed bottom-0 left-1/2 flex h-[46px] w-[400px] -translate-x-1/2 bg-white'>
      <FooterLink link='/' img={iconHome} text='홈' />
      <FooterLink link='/' img={iconPlace} text='애개플레이스' />
      <FooterLink link='/' img={iconMain} text='애개육아정보' />
      <FooterLink link='/' img={iconMag} text='애개매거진' />
      <FooterLink link='/mypage' img={iconMy} text='마이' />
    </footer>
  );
};

export default FooterGnb;
