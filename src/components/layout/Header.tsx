import React from 'react';
import Logo from '../../assets/Icon/Main/OR_Main_TextLogo.svg';

const Header = () => {
  return (
    <header className='bg-white flex h-[60px] items-center justify-center'>
      <h1>
        <a href='#'>
          <img
            src={Logo}
            alt='애개육아고수 홈'
            aria-hidden
            className='w-[160px]'
          />
        </a>
      </h1>
    </header>
  );
};

export default Header;
