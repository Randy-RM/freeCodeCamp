// import { Row } from '@freecodecamp/react-bootstrap';
import React from 'react';
// import envData from '../../../../../config/env.json';
// import { Spacer } from '../../helpers';
// import Map from '../../Map/index';
import Illustration from '../../../assets/images/illustrationFirstSection.svg';
import './hero-style.css';

// const { apiLocation } = envData;

// interface HeroProps {
//   pageName?: string;
//   isSignedIn?: boolean;
// }
function Hero(): JSX.Element {
  return (
    <div className='main-container'>
      <div className='second-container'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12  first-section__content_text'>
              <h1 className='h1'>
                {`
                Apprenez à coder et maximisez vos chances d'être admis dans la
                meilleure école de codage.
                `}
              </h1>
              <p>
                Concentrez-vous sur ce qui est nécessaire pour acquérir une
                compétence spécifique et applicable. Vous serez mieux outillé
                pour construire une carrière.
              </p>
              <button type='button' className='btn btn-primary section-btn'>
                Lancez-vous
              </button>
            </div>
            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12 image-container'>
              <img
                src={Illustration}
                className='img-fluid'
                alt='illustration persons learning'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Hero.displayName = 'Hero';
export default Hero;
