import { Row } from '@freecodecamp/react-bootstrap';
import React from 'react';
import { Spacer } from '../../helpers';
import './card-outline.css';

function LandingGoals(): JSX.Element {
  return (
    <div className='landing-top landing-goals-pt-pb'>
      <div>
        <h2 className='big-heading'>{`Que pourrez-vous faire ?`}</h2>
      </div>
      <Row>
        <Spacer />
        <div className='col-lg-4 col-md-4 col-sm-4 col-xs-12'>
          <div className='card-outlin-border card-mt-mb'>
            <div className='card-outlin card-outlin-height'>
              <h4 className='fw-bold card-outlin-text'>{`Construire une carrière`}</h4>
              <p className='text-responsive card-outlin-text'>
                {`
                Nos offres sont complètes.
                Avec tout ce dont vous avez
                besoin pour construire votre
                carrière.
                `}
              </p>
            </div>
          </div>
        </div>
        <div className='col-lg-4 col-md-4 col-sm-4 col-xs-12'>
          <div className='card-outlin-border card-mt-mb'>
            <div className='card-outlin card-outlin-height'>
              <h4 className='fw-bold card-outlin-text'>{`Acquérir une compétence`}</h4>
              <p className='text-responsive card-outlin-text'>
                {`
                Concentrez-vous sur ce qui est 
                nécessaire pour acquérir 
                une compétence spécifique
                et applicable.
                `}
              </p>
            </div>
          </div>
        </div>
        <div className='col-lg-4 col-md-4 col-sm-4 col-xs-12'>
          <div className='card-outlin-border card-mt-mb'>
            <div className='card-outlin card-outlin-height'>
              <h4 className='fw-bold card-outlin-text'>
                {`
                  Rejoindre la meilleure 
                  école de code en RDC
                `}
              </h4>
              <p className='text-responsive card-outlin-text'>
                {`
                Trouvez le bon cours et 
                lancez-vous trouvez le bon cours et pratiquez.
                `}
              </p>
            </div>
          </div>
        </div>
        <Spacer size={2} />
      </Row>
    </div>
  );
}

LandingGoals.displayName = 'LandingGoals';
export default LandingGoals;
