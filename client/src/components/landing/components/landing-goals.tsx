// import { Row } from '@freecodecamp/react-bootstrap';
import React from 'react';
// import { Spacer } from '../../helpers';
import './card.css';

function LandingGoals(): JSX.Element {
  return (
    <div className='landing-top'>
      <div>
        <h2 className='big-heading'>{`Que pourrez-vous faire ?`}</h2>
        <br />
      </div>
      <div className=''>
        <div className='card-container'>
          <div className='card-unit-col-4'>
            <div className='card-outlin-border card-py-5'>
              <div className='card-item'>
                <h4 className='fw-bold text-center'>{`Construire une carrière.`}</h4>
              </div>
              <div className='card-item  flexible'>
                <p className='text-responsive text-center'>
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

          <div className='card-unit-col-4'>
            <div className='card-outlin-border card-py-5'>
              <div className='card-item'>
                <h4 className='fw-bold text-center'>{`Acquérir une compétence.`}</h4>
              </div>
              <div className='card-item  flexible'>
                <p className='text-responsive text-center'>
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

          <div className='card-unit-col-4'>
            <div className='card-outlin-border card-py-5'>
              <div className='card-item'>
                <h4 className='fw-bold text-center'>
                  {`
                  Rejoindre la meilleure 
                  école de code en RDC.
                  `}
                </h4>
              </div>
              <div className='card-item  flexible'>
                <p className='text-responsive text-center'>
                  {`
                Trouvez le bon cours et 
                lancez-vous trouvez le bon cours et pratiquez.
                `}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

LandingGoals.displayName = 'LandingGoals';
export default LandingGoals;
