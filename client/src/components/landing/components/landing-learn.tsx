import { Row } from '@freecodecamp/react-bootstrap';
import React from 'react';
import { Spacer } from '../../helpers';
import HtmlCode from '../../../assets/images/bi-bar-chart.png';
import CssCode from '../../../assets/images/bx-code-block.png';
import './card-outline.css';

function LandingLearn(): JSX.Element {
  return (
    <div className='landing-top'>
      <div>
        <h2 className='big-heading'>{`Comment allez-vous apprendre ?`}</h2>
      </div>
      <Row>
        <Spacer />
        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
          <div className='card-outlin-border card-mt-mb'>
            <div className='card-outlin'>
              <div className='card-learn-logo'>
                <img src={HtmlCode} alt='LearnCode' className='img-fluid' />
              </div>
              <h4 className='fw-bold card-outlin-text'>{`Étape par étape`}</h4>
              <p className='text-responsive card-outlin-text'>
                {`
                Suivez notre parcours étape par étape 
                et développez vos compétences.
                `}
              </p>
            </div>
          </div>
        </div>
        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
          <div className='card-outlin-border card-mt-mb'>
            <div className='card-outlin'>
              <div className='card-learn-logo'>
                <img src={CssCode} alt='LearnCode' className='img-fluid' />
              </div>
              <h4 className='fw-bold card-outlin-text'>{`Interactif`}</h4>
              <p className='text-responsive card-outlin-text'>
                {`
                Apprenez et interagissez directement sur 
                notre éditeur de code en ligne.
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

LandingLearn.displayName = 'LandingLearn';
export default LandingLearn;
