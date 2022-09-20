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
        <h2 className='big-heading'>{`Qu’allez-vous apprendre ?`}</h2>
        <br />
        <p className='text-responsive'>
          {`
          Si vous êtes novice en matière de codage, nous vous recommandons de commencer par le début.
          `}
        </p>
      </div>
      <Row>
        <Spacer />
        <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
          <div className='card-mt-mb'>
            <div className='bg-secondary'>
              <div className='card-details card-height'>
                <div className='card-details-logo'>
                  <img src={HtmlCode} alt='LearnCode' className='img-fluid' />
                </div>
                <h4 className='fw-bold'>{`Responsive Web Design`}</h4>
                <p className='text-responsive'>
                  {`
                Dans cette formation, 
                vous apprendrez les langages que les développeurs 
                utilisent pour créer des pages Web :  HTML (Hypertext Markup Language) 
                pour le contenu, et CSS (Cascading Style Sheets) pour la conception. 
                Enfin, vous apprendrez à créer des pages Web adaptées à différentes 
                tailles d'écran en créant
                `}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
          <div className='card-mt-mb'>
            <div className='bg-secondary'>
              <div className='card-details card-height'>
                <div className='card-details-logo'>
                  <img src={CssCode} alt='LearnCode' className='img-fluid' />
                </div>
                <h4 className='fw-bold'>
                  {`JavaScript Algorithms and Data Structures`}
                </h4>
                <p className='text-responsive'>
                  {`
                Alors que HTML et CSS contrôlent le contenu et le style  d'une page, 
                JavaScript est utilisé pour la rendre interactive. Dans le cadre de 
                la certification JavaScript Algorithm and Data Structures, vous apprendrez 
                les principes fondamentaux de JavaScript, etc.
                `}
                </p>
                <div className='card-outlin-text-right text-love-light fw-semi-bold text-responsive'>
                  Bientôt disponible
                </div>
              </div>
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
