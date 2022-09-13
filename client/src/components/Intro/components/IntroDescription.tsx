import React from 'react';
import { Spacer } from '../../helpers';

import '../intro.css';
function IntroDescription(): JSX.Element {
  return (
    <div className='intro-description'>
      <h1>
        {`
        Bienvenue sur Code Learning Platform !
        `}
      </h1>
      <Spacer />
      <p>
        {`
          Si vous êtes novice en programmation, nous vous recommandons 
          de commencer par le début et de parcourir nos formations dans l'ordre.
        `}
      </p>
      <p>
        {`
          La pratique est la clé. Et ce programme vous donnera 
          des milliers d'heures de pratique de la programmation.
        `}
      </p>
      <p>
        {`
          Si vous voulez obtenir un emploi de développeur ou 
          des clients en freelance, les compétences en 
          programmation sont nécessaire.
        `}
      </p>
      <p>
        {`
          
        `}
      </p>
    </div>
  );
}

IntroDescription.displayName = 'IntroDescription';

export default IntroDescription;
