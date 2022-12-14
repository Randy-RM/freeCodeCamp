import React from 'react';
import envData from '../../../../../config/env.json';
import { Spacer } from '../../../components/helpers';
import Map from '../../Map/index';
import LaptopIcon from '../../../assets/images/laptop.svg';
import AlgoIcon from '../../../assets/images/algorithmIcon.svg';
import PlayIcon from '../../../assets/images/play.svg';

import './what-will-you-learn.css';

const { apiLocation } = envData;
interface LandingDetailsProps {
  isSignedIn?: boolean;
}

const WhatWillYouLearn = ({ isSignedIn }: LandingDetailsProps): JSX.Element => {
  return (
    <div className='landing-top'>
      <div>
        <h2 className='big-heading text-love-light text-center'>{`Que vas-tu apprendre ?`}</h2>
        <br />
        <p className='text-responsive text-center'>
          {`
          Si tu es novice en matière de codage, nous te recommandons de commencer par le début.
          `}
        </p>
      </div>
      <Spacer size={2} />
      <div className=''>
        <div className='card-course-detail-container'>
          <div className='card-course-detail-back standard-radius-5 card-outlin-border bg-light'>
            <div className='card-course-detail-unit position-relative'>
              <div className='card-outlin-border bg-light standard-radius-5'>
                <div className='card-course-detail-header hide-small'>
                  <div className='card-course-detail-logo push'>
                    <img
                      src={LaptopIcon}
                      alt='LearnCode'
                      className='img-fluid'
                    />
                  </div>
                </div>
                <div className='card-course-detail-item'>
                  <h4 className='fw-bold text-love-light card-title-w60'>
                    {`Responsive`}
                    <br />
                    {`Web Design`}
                  </h4>
                </div>
                <div className='card-course-detail-item  flexible'>
                  <p className='text-responsive'>
                    {`
                Dans cette formation, tu apprendras les langages que les développeurs 
                utilisent pour créer des pages Web : HTML (Hypertext Markup Language) 
                pour le contenu, et CSS (Cascading Style Sheets) pour la conception. 
                Enfin, tu apprendras à créer des pages Web adaptées à différentes tailles d'écran.
                `}
                  </p>
                </div>
                <div className='card-course-detail-footer'>
                  <div className='push'>
                    {isSignedIn ? (
                      <Map
                        forLanding={true}
                        single={true}
                        className='link-course text-love-light fw-semi-bold text-responsive'
                        keyPrefix='landing-details'
                      >
                        <div className='row-link'>
                          <div className='row-link-text'>
                            {'Suivre le cours  '}
                          </div>
                          <div>
                            <img
                              src={PlayIcon}
                              alt='Laptop icon'
                              className='play'
                            />
                          </div>
                        </div>
                      </Map>
                    ) : (
                      <a
                        href={`${apiLocation}/signin`}
                        className='link-course text-love-light fw-semi-bold text-responsive'
                      >
                        <div className='row-link'>
                          <div className='row-link-text'>
                            {'Suivre le cours  '}
                          </div>
                          <div>
                            <img
                              src={PlayIcon}
                              alt='Laptop icon'
                              className='play'
                            />
                          </div>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='card-course-detail-back standard-radius-5 card-outlin-border bg-light'>
            <div className='card-course-detail-unit position-relative'>
              <div className='card-outlin-border bg-light standard-radius-5'>
                <div className='card-course-detail-header hide-small'>
                  <div className='card-course-detail-logo push'>
                    <img src={AlgoIcon} alt='LearnCode' className='img-fluid' />
                  </div>
                </div>
                <div className='card-course-detail-item'>
                  <h4 className='fw-bold text-love-light card-title-w60'>
                    {`JavaScript Algorithms`}
                    <br />
                    {`and Data Structures`}
                  </h4>
                </div>
                <div className='card-course-detail-item  flexible'>
                  <p className='text-responsive'>
                    {`
                Alors que HTML et CSS contrôlent le contenu et le style  d'une page, 
                JavaScript est utilisé pour la rendre interactive. Dans le cadre de 
                la certification JavaScript Algorithm and Data Structures, tu apprendras 
                les principes fondamentaux de JavaScript, etc.
                `}
                  </p>
                </div>
                <div className='card-course-detail-footer'>
                  <span className='push text-love-light fw-semi-bold text-responsive'>
                    Bientôt disponible
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

WhatWillYouLearn.displayName = 'WhatWillYouLearn';
export default WhatWillYouLearn;
