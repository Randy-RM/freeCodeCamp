import React, { useState } from 'react';
import Link from '../../../helpers/link';
import KDALogo from '../../../../assets/images/kda_logo.png';
import CloseButton from '../../../../assets/images/close.png';
import './banner.css';

function Banner(): JSX.Element {
  const [showBanner, setShowBanner] = useState<boolean>(true);

  function handleClose() {
    setShowBanner(false);
  }

  return (
    <div className='elearning-banner-section'>
      <div
        className={
          showBanner
            ? 'elearning-banner container remove-container'
            : 'close-alert'
        }
      >
        <div className='banner-first-div baner-rigth-margin'>
          {' '}
          <img src={KDALogo} alt='Logo KDA' />
          <div className='banner-first-div-text'>
            <span className=''>Inscris-toi</span> dans la meilleure école de
            codage.
          </div>
        </div>
        <div className='banner-second-div baner-rigth-margin'>
          Deviens Développeur.se ou Specialiste en Marketing Digital en 9 mois
          de formation certifiante suivi de 3 à 6 mois de stage, et trouve un
          emploi dans les meilleurs entreprises nationales et internationales.
        </div>
        <div className='banner-third-div baner-rigth-margin'>
          <Link
            className='link-logo'
            to='https://www.kinshasadigital.academy/inscription'
            external={true}
            sameTab={false}
          >
            <button
              type='button'
              className='btn elearning-inscription-button btn-sm'
            >
              Rejoins notre académie
            </button>
          </Link>
        </div>
        <div className='banner-fourth-div'>
          <img
            src={CloseButton}
            alt='Fermer'
            className=''
            onClick={handleClose}
            role='presentation'
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
