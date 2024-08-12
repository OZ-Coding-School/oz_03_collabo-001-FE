import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import iconHome from '../../assets/Icon/Nav_Bottom/BK_Home.svg';
import iconPlace from '../../assets/Icon/Nav_Bottom/BK_BDplace.svg';
import iconMain from '../../assets/Icon/Nav_Bottom/BK_Main.svg';
import iconMag from '../../assets/Icon/Nav_Bottom/BK_Magazine.svg';
import iconMy from '../../assets/Icon/Nav_Bottom/BK_My.svg';

interface LinkProps {
  img: string;
  text: string;
}

const FooterLink: React.FC<LinkProps> = ({ img, text }) => {
  return (
    <Link to='/' className='flex w-1/5 items-center'>
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
    <footer className='bg-white fixed bottom-0 left-1/2 flex h-[46px] w-[400px] -translate-x-1/2'>
      <FooterLink img={iconHome} text='홈' />
      <FooterLink img={iconPlace} text='애개플레이스' />
      <FooterLink img={iconMain} text='애개육아정보' />
      <FooterLink img={iconMag} text='애개매거진' />
      <FooterLink img={iconMy} text='마이' />
    </footer>
  );
};

export default FooterGnb;
