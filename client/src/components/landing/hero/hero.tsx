// import { Row } from '@freecodecamp/react-bootstrap';
import React from 'react';
import envData from '../../../../../config/env.json';
// import { Spacer } from '../../helpers';
import Map from '../../Map/index';
import Illustration from '../../../assets/images/hero-img.png';
import './hero-style.css';

const { apiLocation } = envData;

interface HeroProps {
  pageName: string;
  isSignedIn?: boolean;
}
function Hero({ pageName, isSignedIn }: HeroProps): JSX.Element {
  return (
    <div className='main-container'>
      <div className='second-container'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='dotted-background'></div>
            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12  first-section__content_text'>
              <h1 className='h1' data-test-label={`${pageName}-header`}>
                {`Apprends à coder et maximise tes chances d'être admis dans la
                meilleure école de codage.`}
              </h1>
              <br />
              <p className='text-light'>
                {`
            Concentre-toi sur ce qui est nécessaire 
            pour acquérir une compétence spécifique et applicable. 
            Tu seras mieux outillé pour construire une carrière.
            `}
              </p>
              <br />
              <div>
                {isSignedIn ? (
                  <Map
                    forLanding={true}
                    single={true}
                    className='section-btn'
                    text='Lance-toi'
                    keyPrefix='landing-top'
                  />
                ) : (
                  <a href={`${apiLocation}/signin`} className='section-btn'>
                    {'Lance-toi'}
                  </a>
                )}
              </div>
            </div>
            <br />
            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12 image-container'>
              <img
                src={Illustration}
                className='img-fluid'
                alt='illustration persons learning'
              />
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

Hero.displayName = 'Hero';
export default Hero;
