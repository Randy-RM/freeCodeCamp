import React from 'react';
import './formation.css';
import { useNavigate } from '@reach/router';
import logo_google from '../../../assets/images/landing/googleLogo.png';
import logo_python from '../../../assets/icons/pyton.svg';

import etoile_avis from '../../../assets/icons/iconeEtoiles.svg';
import orloge from '../../../assets/icons/iconeHorloge.svg';
import routes from '../../../utils/routes';

function Formations() {
  const navigate = useNavigate();
  return (
    <section className='formation'>
      <h2 className='formation__title'>
        Découvre les formations gratuites de Kadea{' '}
        <span className='formation__title-rouge'>Online</span>
      </h2>
      <div className='formation__button_list'>
        <button
          className='button-list'
          onClick={() => void navigate(routes.catalogue.index)}
        >
          Business
        </button>
        <button
          className='button-list'
          onClick={() => void navigate(routes.catalogue.aws)}
        >
          AWS
        </button>
        <button
          className='button-list'
          onClick={() => void navigate(routes.catalogue.index)}
        >
          Healt
        </button>
        <button
          className='button-list'
          onClick={() => void navigate(routes.catalogue.programmation)}
        >
          Computer Science
        </button>
        <button
          className='button-list'
          onClick={() => void navigate(routes.catalogue.programmation)}
        >
          Data Science
        </button>

        <button
          className='button-list'
          onClick={() => void navigate(routes.catalogue.programmation)}
        >
          Information Technology
        </button>
      </div>
      <div className='course__cards-button'>
        <div className='card__first_course'>
          <div className='first__course-border'>
            <img src={logo_google} alt='' />
          </div>
          <button
            className='card__course__article'
            onClick={() => void navigate(routes.catalogue.programmation)}
          >
            <h3 className='course__article-title'>
              Fondamentaux de l’IA Google
            </h3>
            <div className='course__article-sumury'>
              <div className='article-sumury-card'>
                <img src={etoile_avis} alt='' className='article_sumury-img' />
                <p className='article_sumury-text'>5.0(1k avis)</p>
              </div>
              <div className='article-sumury-card'>
                <img src={orloge} alt='' className='article_sumury-img' />
                <p className='article_sumury-text'>3h20 min</p>
              </div>
            </div>
          </button>
        </div>
        <div className='card__first_course'>
          <div className='first__course-border'>
            <img src={logo_python} alt='' />
          </div>
          <button
            className='card__course__article'
            onClick={() => void navigate(routes.catalogue.programmation)}
          >
            <h3 className='course__article-title'>Python pour tous</h3>
            <div className='course__article-sumury'>
              <div className='article-sumury-card'>
                <img src={etoile_avis} alt='' className='article_sumury-img' />
                <p className='article_sumury-text'>5.0(1k avis)</p>
              </div>
              <div className='article-sumury-card'>
                <img src={orloge} alt='' className='article_sumury-img' />
                <p className='article_sumury-text'>3h 20 min</p>
              </div>
            </div>
          </button>
        </div>
      </div>
      <button className='formation__plus_de_cours'>Plus des cours</button>
    </section>
  );
}

export default Formations;
