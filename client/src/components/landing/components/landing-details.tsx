import React from 'react';
import envData from '../../../../../config/env.json';
import { Spacer } from '../../helpers';
import Map from '../../Map/index';
import HtmlCode from '../../../assets/images/html.png';
import CssCode from '../../../assets/images/css.png';
import './card-details.css';

const { apiLocation } = envData;

interface LandingDetailsProps {
  isSignedIn?: boolean;
}
function LandingDetails({ isSignedIn }: LandingDetailsProps): JSX.Element {
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
      <Spacer />
      <div className=''>
        <div className='card-container'>
          <div className='card-unit'>
            <div className='bg-secondary card-py-5'>
              <div className='card-details-logo'>
                <img src={HtmlCode} alt='LearnCode' className='img-fluid' />
              </div>
              <div className='card-item'>
                <h4 className='fw-bold'>{`Responsive Web Design`}</h4>
              </div>
              <div className='card-item  flexible'>
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
              <div className='card-footer'>
                <span className='pull fw-semi-bold'>
                  <small>300 Heurs</small>
                </span>
                <div className='push'>
                  {isSignedIn ? (
                    <Map
                      forLanding={true}
                      single={true}
                      className='btn-primary link-button'
                      text='Débuter le Cours'
                      keyPrefix='landing-details'
                    />
                  ) : (
                    <a
                      href={`${apiLocation}/signin`}
                      className='btn-primary link-button'
                    >
                      {'Débuter le Cours'}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='card-unit'>
            <div className='bg-secondary card-py-5'>
              <div className='card-details-logo'>
                <img src={CssCode} alt='LearnCode' className='img-fluid' />
              </div>
              <div className='card-item flexible'>
                <h4 className='fw-bold'>
                  {`JavaScript Algorithms and Data Structures`}
                </h4>
              </div>
              <div className='card-item  flexible'>
                <p className='text-responsive'>
                  {`
                Alors que HTML et CSS contrôlent le contenu et le style  d'une page, 
                JavaScript est utilisé pour la rendre interactive. Dans le cadre de 
                la certification JavaScript Algorithm and Data Structures, vous apprendrez 
                les principes fondamentaux de JavaScript, etc.
                `}
                </p>
                <br />
              </div>
              <div className='card-footer'>
                <span className='push text-love-light fw-semi-bold text-responsive'>
                  Bientôt disponible
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

LandingDetails.displayName = 'LandingDetails';
export default LandingDetails;
