import React from 'react';
import Link from '../helpers/link';
import { Spacer } from '../helpers';
import Facebook from '../../assets/icons/facebook-square-brands-light.svg';
import Twitter from '../../assets/icons/twitter-square-brands-light.svg';
import Linkedin from '../../assets/icons/linkedin-brands-light.svg';
import Instagram from '../../assets/icons/instagram-square-brands-light.svg';
import FooterLogo from './footer-logo';
import './footer.css';

function Footer(): JSX.Element {
  return (
    <footer className='bg-dark-gray'>
      <div className='footer-container'>
        <Spacer />
        <div className='row d-flex justify-content-center'>
          <div className='col-lg-2 col-md-3 col-sm-3 col-xs-6 d-flex justify-content-center'>
            <Link className='link-logo' to='/'>
              <FooterLogo />
            </Link>
          </div>
        </div>
        <Spacer />
        <div className='row text-center'>
          <div className='col-12'>
            <p>
              <span className='fw-bold text-light'>Texaf Digital Campus</span>
              <br />
              <span className='fw-semi-bold text-light'>
                Concession COTEX N° 63 Avenue Colonel Mondjiba
              </span>
              <br />
              <span className='fw-semi-bold text-light'>
                Commune de Ngaliema - Kinshasa
              </span>
              <br />
            </p>
          </div>
        </div>
        <div className='row text-center d-flex justify-content-center'>
          <div className='col-lg-3 col-md-3 col-sm-6 col-xs-6 d-flex justify-content-center'>
            <div className='footer-icon'>
              <img src={Facebook} alt='facebook' />
            </div>
            <div className='footer-icon'>
              <img src={Linkedin} alt='Linkedin' />
            </div>
            <div className='footer-icon'>
              <img src={Twitter} alt='Twitter' />
            </div>
            <div className='footer-icon'>
              <img src={Instagram} alt='Instagram' />
            </div>
          </div>
        </div>
        <Spacer />
      </div>
    </footer>
  );
}

Footer.displayName = 'Footer';
export default Footer;
