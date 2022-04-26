import { Row } from '@freecodecamp/react-bootstrap';
import React from 'react';
import { Spacer } from '../../helpers';
import HtmlCode from '../../../assets/images/html.png';
import CssCode from '../../../assets/images/css.png';
import './card.css';

function LandingDetails(): JSX.Element {
  return (
    <div className='landing-top'>
      <div>
        <h2 className='big-heading'>{`Vue d'ensemble`}</h2>

        <p className='text-responsive'>
          {`
          Dans cette certification Responsive Web Design, vous apprendrez 
          les langages que les développeurs utilisent pour créer des pages Web.
          `}
        </p>
      </div>
      <Row>
        <Spacer />
        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
          <div className='bg-secondary card-mt-mb'>
            <div className='card-details'>
              <div className='card-details-logo'>
                <img src={HtmlCode} alt='LearnCode' className='img-fluid' />
              </div>
              <h4 className='fw-bold'>
                HTML <br />
                <br /> (Hypertext Markup Language)
              </h4>
              <p className='text-responsive'>
                {`
                un langage de programmation web permettant 
                d’ajouter du contenu sur une page web et qui 
                est à la base de la création de site web. 
                Le code HTML va permettre de définir le contenu 
                affiché sur une page à partir d’un navigateur.
                `}
              </p>
            </div>
          </div>
        </div>
        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
          <div className='bg-secondary card-mt-mb'>
            <div className='card-details'>
              <div className='card-details-logo'>
                <img src={CssCode} alt='LearnCode' className='img-fluid' />
              </div>
              <h4 className='fw-bold'>
                CSS <br />
                <br /> (Cascading Style Sheets)
              </h4>
              <p className='text-responsive'>
                {`
                un langage de programmation web permettant 
                la mise en forme de fichiers et de pages HTML. 
                Les styles permettent de définir des règles appliquées
                à un ou plusieurs documents HTML. 
                Ces règles portent sur les polices de caractères, etc.
                `}
              </p>
            </div>
          </div>
        </div>
        <Spacer />
      </Row>
    </div>
  );
}

LandingDetails.displayName = 'LandingDetails';
export default LandingDetails;
