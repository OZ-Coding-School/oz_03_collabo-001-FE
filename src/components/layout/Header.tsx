import { Link } from 'react-router-dom';
import Logo from '../../assets/Icon/Main/OR_Main_TextLogo.svg';

const Header = () => {
  return (
    <header className='flex h-[60px] items-center justify-center bg-white'>
      <h1>
        <Link to='/'>
          <img
            src={Logo}
            alt='애개육아고수 홈'
            aria-hidden
            className='w-[160px]'
          />
        </Link>
      </h1>
    </header>
  );
};

export default Header;
