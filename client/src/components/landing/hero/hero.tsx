// import { Row } from '@freecodecamp/react-bootstrap';
import React from 'react';
// import envData from '../../../../../config/env.json';
// import { Spacer } from '../../helpers';
// import Map from '../../Map/index';
// import LearnCode from '../../../assets/images/hero-img.png';
import './hero-style.css';
import { useNavigate } from '@reach/router';

// const { apiLocation } = envData;

// interface HeroProps {
//   pageName: string;
//   isSignedIn?: boolean;
// }
function Hero(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className='hero__main'>
      <div>
        <section className='hero__main__section'>
          <h1 className='hero__section__title'>
            Forme toi <strong className=''>Gratuitement</strong> En lingne
          </h1>
          <p className='hero__main__section-p'>
            Découvre les métiers du numérique avec nos formations gratuites.
          </p>
          <button
            className='hero__section__button'
            onClick={() => void navigate('/catalogue')}
          >
            Choisis ta formation
          </button>
        </section>
      </div>
    </div>
  );
}

Hero.displayName = 'Hero';
export default Hero;
