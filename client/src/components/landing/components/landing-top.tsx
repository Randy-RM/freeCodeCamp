import { Row } from '@freecodecamp/react-bootstrap';
import React from 'react';
import envData from '../../../../../config/env.json';
import { Spacer } from '../../helpers';
import Map from '../../Map/index';
import LearnCode from '../../../assets/images/learn-code.png';

const { apiLocation } = envData;

interface LandingTopProps {
  pageName: string;
  isSignedIn?: boolean;
}
function LandingTop({ pageName, isSignedIn }: LandingTopProps): JSX.Element {
  return (
    <div className='landing-top'>
      <Spacer size={2} />
      <Row>
        <Spacer />
        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
          <div className=''>
            <img src={LearnCode} alt='LearnCode' className='img-fluid' />
          </div>
        </div>
        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
          <div className='landing-top-content'>
            <h1 className='big-heading' data-test-label={`${pageName}-header`}>
              {'Responsive Web Design'}
            </h1>
            <p className='hero-text'>
              {`
            Trouvez le bon cours et lancez-vous !!!
            Concentrez-vous sur ce qui est nécessaire pour acquérir 
            une compétence spécifique et applicable.
            Vous serez mieux outillé pour construire une carrière.
            `}
            </p>
            <div>
              {isSignedIn ? (
                <Map
                  forLanding={true}
                  single={true}
                  className='btn-primary link-button'
                  text='Lancez-vous'
                  keyPrefix='landing-top'
                />
              ) : (
                <a
                  href={`${apiLocation}/signin`}
                  className='btn-primary link-button'
                >
                  {'Lancez-vous'}
                </a>
              )}
            </div>
          </div>
        </div>
        <Spacer />
      </Row>
      <Spacer />
    </div>
  );
}

LandingTop.displayName = 'LandingTop';
export default LandingTop;
