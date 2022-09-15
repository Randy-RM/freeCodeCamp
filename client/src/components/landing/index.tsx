import { Grid } from '@freecodecamp/react-bootstrap';
import React, { ReactElement } from 'react';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  userSelector,
  userFetchStateSelector,
  isSignedInSelector
} from '../../redux';

import AsSeenIn from './components/as-seen-in';
import LandingTop from './components/landing-top';
import LandingDetails from './components/landing-details';
import LandingLearn from './components/landing-learn';
import LandingGoals from './components/landing-goals';

import './landing.css';

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

type LearnLayoutProps = {
  isSignedIn?: boolean;
  fetchState: FetchState;
  user: User;
  children?: React.ReactNode;
};

function Landing({ isSignedIn }: LearnLayoutProps): ReactElement {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('metaTags:title')}</title>
      </Helmet>
      <main className='landing-page bg-light'>
        <div className='bg-secondary'>
          <Grid>
            <LandingTop pageName={'landing'} isSignedIn={isSignedIn} />
          </Grid>
        </div>
        <Grid>
          <LandingDetails />
        </Grid>
        <Grid>
          <LandingLearn />
        </Grid>

        <div className='bg-beige'>
          <Grid>
            <LandingGoals />
          </Grid>
        </div>

        <Grid fluid={true}>
          <AsSeenIn isSignedIn={isSignedIn} />
        </Grid>
      </main>
    </>
  );
}

Landing.displayName = 'Landing';
export default connect(mapStateToProps)(Landing);
