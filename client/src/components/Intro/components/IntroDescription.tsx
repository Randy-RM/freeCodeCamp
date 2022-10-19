import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  userSelector,
  userFetchStateSelector,
  isSignedInSelector
} from '../../../redux';
import Map from '../../Map/index';

import { Spacer } from '../../helpers';

import '../intro.css';

type FetchState = {
  pending: boolean;
  complete: boolean;
  errored: boolean;
};

type User = {
  acceptedPrivacyTerms: boolean;
};

const mapStateToProps = createSelector(
  userFetchStateSelector,
  isSignedInSelector,
  userSelector,
  (fetchState: FetchState, isSignedIn, user: User) => ({
    fetchState,
    isSignedIn,
    user
  })
);

type IntroDescriptionProps = {
  isSignedIn?: boolean;
  fetchState: FetchState;
  user: User;
};

function IntroDescription({ isSignedIn }: IntroDescriptionProps): JSX.Element {
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
          
        `}
      </p>
      <Spacer />
      {isSignedIn && (
        <Map
          forLanding={true}
          single={true}
          className='btn-primary link-button'
          text='Lancez-vous maintenant !'
          keyPrefix='landing-details'
        />
      )}
      <Spacer />
    </div>
  );
}

IntroDescription.displayName = 'IntroDescription';
export default connect(mapStateToProps)(IntroDescription);
