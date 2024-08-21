import { Outlet } from 'react-router-dom';
import FooterGnb from './FooterGnb';

const FooterOnlyLayout = () => {
  return (
    <>
      <section>
        <Outlet />
      </section>
      <FooterGnb />
    </>
  );
};

export default FooterOnlyLayout;
