import React from 'react';
import './vodacom-branding.css';
import VodacomLogo from '../../../assets/images/vodacom_logo.png';

function VodacomBranding() {
  return (
    <div className='vodacom-section'>
      <div className='container'>
        <div className='vodacom-content'>
          <div className='vodacom-logo'>
            <img src={VodacomLogo} alt='vodacom logo' />
          </div>
          <div className='text-light'>
            Programme en
            <br />
            partenariat avec
            <br />
            <span className='vodacom-typography'>vodacom</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VodacomBranding;
