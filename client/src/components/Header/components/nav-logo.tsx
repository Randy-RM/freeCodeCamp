import React from 'react';
import Logo from '../../../assets/icons/KDA-logo.webp';

const NavLogo = (): JSX.Element => {
  const kdaLogo: string = Logo as never;
  return (
    <div className='logo'>
      <img src={kdaLogo} alt='Logo' />
    </div>
  );
};

NavLogo.displayName = 'NavLogo';
export default NavLogo;
