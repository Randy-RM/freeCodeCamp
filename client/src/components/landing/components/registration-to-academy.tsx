import { Row } from '@freecodecamp/react-bootstrap';
import React from 'react';
import Link from '../../helpers/link';

const RegistrationToAcademy = (): JSX.Element => {
  return (
    <Row>
      <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        <div>
          <h2 className='big-heading text-ligth'>{`Inscrit toi dans la meilleure école de codage.`}</h2>
          <br />
          <p>
            <div className='text-registration'>
              {`
            Deviens Développeur.se ou Specialiste en 
            Marketing Digital en 9 mois de formation certifiante 
            suivi de 3 à 6 mois de stage, et trouve un emploi dans 
            les meilleurs entreprises nationales et internationales.
            `}
            </div>
          </p>
          <br />
          <div>
            <Link
              to='https://www.kinshasadigital.academy/inscription'
              external={true}
              sameTab={false}
              className='btn-light link-button'
            >
              {'Rejoins notre académie ici'}
            </Link>
          </div>
        </div>
      </div>
    </Row>
  );
};

RegistrationToAcademy.displayName = 'RegistrationToAcademy';
export default RegistrationToAcademy;
