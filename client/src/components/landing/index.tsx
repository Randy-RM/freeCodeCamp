import { Grid } from '@freecodecamp/react-bootstrap';
import React, { ReactElement } from 'react';
import Helmet from 'react-helmet';
// import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  userSelector,
  userFetchStateSelector,
  isSignedInSelector
} from '../../redux';

// import AsSeenIn from './components/as-seen-in';
import RegistrationToAcademy from './components/registration-to-academy';
// import LandingTop from './components/landing-top';
// import LandingDetails from './components/landing-details';
// import LandingLearn from './components/landing-learn';
// import LandingGoals from './components/landing-goals';
import WhatCanYouDo from './whatCanYouDo/what-can-you-do';
// import YourCareer from './yourCareer/your-career';
import Hero from './hero/hero';
import StartCOding from './start-coding/start-coding';
import WhatWillYouLearn from './what-will-you-learn/what-will-you-learn';
import HowWillYouLearn from './how-will-you-learn/how-will-you-learn';
import Vodacom from './vodacom-branding-section/vodacom-branding';

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
  // const { t } = useTranslation();

  return (
    <>
      <Helmet>
        {/* <title>{t('metaTags:title')}</title> */}
        <title>{`Apprendre à coder - gratuitement | Code Learning Platform`}</title>
      </Helmet>
      <main className='landing-page bg-light'>
        <Hero pageName={'landing'} isSignedIn={isSignedIn} />
        <Vodacom />

        {/* <div className='bg-secondary'>
          <Grid>
            <LandingTop pageName={'landing'} isSignedIn={isSignedIn} />
          </Grid>
        </div> */}

        <div className='as-seen-in'>
          <Grid>
            <RegistrationToAcademy />
          </Grid>
        </div>

        {/* <Grid>
          <LandingDetails isSignedIn={isSignedIn} />
        </Grid> */}
        <div className='dotted-bg'>
          <Grid>
            <WhatWillYouLearn isSignedIn={isSignedIn} />
          </Grid>
        </div>

        {/* <Grid>
          <LandingLearn />
        </Grid> */}
        <HowWillYouLearn />

        {/* <div className='bg-light-gray'>
          <Grid>
            <WhatCanYouDo />
          </Grid>
        </div> */}
        <div className=''>
          <Grid>
            <WhatCanYouDo />
          </Grid>
        </div>

        <StartCOding isSignedIn={isSignedIn} />

        {/* <div className='as-seen-in'>
          <Grid>
            <YourCareer isSignedIn={isSignedIn} />
          </Grid>
        </div> */}
      </main>
    </>
  );
}

Landing.displayName = 'Landing';
export default connect(mapStateToProps)(Landing);
