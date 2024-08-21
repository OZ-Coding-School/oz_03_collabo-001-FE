import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import BKiconHome from '../../assets/Icon/Nav_Bottom/BK_Home.png';
import BKiconPlace from '../../assets/Icon/Nav_Bottom/BK_BDplace.png';
import BKiconMain from '../../assets/Icon/Nav_Bottom/BK_Main.png';
import BKiconMag from '../../assets/Icon/Nav_Bottom/BK_Magazine.png';
import BKiconMy from '../../assets/Icon/Nav_Bottom/BK_My.png';
import ORiconHome from '../../assets/Icon/Nav_Bottom/OR_Home.png';
import ORiconPlace from '../../assets/Icon/Nav_Bottom/OR_BDplace.png';
import ORiconMain from '../../assets/Icon/Nav_Bottom/OR_Main.png';
import ORiconMag from '../../assets/Icon/Nav_Bottom/OR_Magazine.png';
import ORiconMy from '../../assets/Icon/Nav_Bottom/OR_My.png';

interface LinkProps {
  link: string;
  BKimg: string;
  ORimg: string;
  text: string;
}

const FooterLink: React.FC<LinkProps> = ({ link, BKimg, ORimg, text }) => {
  const location = useLocation();
  const isActive = location.pathname === link;

  return (
    <Link
      to={link}
      className={twMerge(
        'flex w-1/5 items-center',
        isActive ? '!font-semibold text-primary' : ''
      )}
    >
      <div className='w-full text-center'>
        <img
          src={isActive ? ORimg : BKimg}
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
    <footer className='fixed bottom-0 left-1/2 z-50 flex h-[46px] w-[400px] -translate-x-1/2 bg-white'>
      <FooterLink link='/' BKimg={BKiconHome} ORimg={ORiconHome} text='홈' />
      <FooterLink
        link='/bdPlaceHome'
        BKimg={BKiconPlace}
        ORimg={ORiconPlace}
        text='애개플레이스'
      />
      <FooterLink
        link='/bdInfo'
        BKimg={BKiconMain}
        ORimg={ORiconMain}
        text='애개육아정보'
      />
      <FooterLink
        link='/bdMag'
        BKimg={BKiconMag}
        ORimg={ORiconMag}
        text='애개매거진'
      />
      <FooterLink
        link='/mypage'
        BKimg={BKiconMy}
        ORimg={ORiconMy}
        text='마이페이지'
      />
    </footer>
  );
};

export default FooterGnb;
