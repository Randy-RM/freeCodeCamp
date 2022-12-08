import React from 'react';
import Logo from '../../../assets/images/code-learning-platform-logo.svg';

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
