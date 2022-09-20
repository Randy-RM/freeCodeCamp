import React from 'react';
import { Spacer } from '../../helpers';

import '../intro.css';
function IntroDescription(): JSX.Element {
  return (
    <div className='intro-description'>
      <Spacer />
      <p>
        {`
          Si vous êtes novice en programmation, nous vous recommandons 
          de commencer par le début et d'obtenir ces certifications dans l'ordre.
        `}
      </p>
      <p>
        {`
          Si vous vous sentez dépassé, c'est normal. La programmation est difficile.
        `}
      </p>
      <p>
        {`
          La pratique est la clé. La pratique, la pratique, la pratique.
        `}
      </p>
      <p>
        {`
          Et ce programme vous donnera des milliers 
          d'heures de pratique de la programmation.
        `}
      </p>
      <p>
        {`
          Si vous voulez obtenir un emploi de développeur ou 
          des clients en freelance, les compétences en programmation 
          ne seront qu'une partie du puzzle. Vous devez également 
          construire votre réseau personnel et votre réputation de développeur.
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
