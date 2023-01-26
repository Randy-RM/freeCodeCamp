// import { Row } from '@freecodecamp/react-bootstrap';
import React from 'react';
// import { Spacer } from '../../helpers';
import './partners.css';
import VodacomLogo from '../../../assets/images/partners/vodacom_logo.svg';
import AwsLogo from '../../../assets/images/partners/amazon_web_services_logo.svg';
import GizLogo from '../../../assets/images/partners/giz.png';

function Partners(): JSX.Element {
  return (
    <div className='landing-top'>
      <div>
        <h2 className='big-heading title-color text-center'>{`Nos partenaires`}</h2>
        <br />
      </div>
      <div className=''>
        <div className='partner-card-container'>
          <div className='partner-card-unit-col-4 card-py-5'>
            <div className='partner-card-item  partner-flexible partner-logo-container'>
              <img src={VodacomLogo} alt='Start coding now!' />
            </div>
          </div>

          <div className='partner-card-unit-col-4 card-py-5'>
            <div className='partner-card-item  partner-flexible partner-logo-container'>
              <img src={AwsLogo} alt='Start coding now!' />
            </div>
          </div>

          <div className='partner-card-unit-col-4 card-py-5'>
            <div className='partner-card-item  partner-flexible partner-logo-container'>
              <img src={GizLogo} alt='Start coding now!' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Partners.displayName = 'Partners';
export default Partners;
