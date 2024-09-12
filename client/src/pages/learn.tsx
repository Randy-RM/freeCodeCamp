import { graphql } from 'gatsby';
import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  userFetchStateSelector,
  isSignedInSelector,
  userSelector
} from '../redux';

import '../components/landing/landing.css';
import Landing from '../components/landing';

interface FetchState {
  pending: boolean;
  complete: boolean;
  errored: boolean;
}

interface User {
  name: string;
  username: string;
  completedChallengeCount: number;
}

const mapStateToProps = createSelector(
  userFetchStateSelector,
  isSignedInSelector,
  userSelector,
  (fetchState: FetchState, isSignedIn = true, user: User) => ({
    fetchState,
    isSignedIn,
    user
  })
);

interface Slug {
  slug: string;
}

interface LearnPageProps {
  isSignedIn: true;
  fetchState: FetchState;
  state: Record<string, unknown>;
  user: User;
  data: {
    challengeNode: {
      challenge: {
        fields: Slug;
      };
    };
  };
}

function LearnPage({ isSignedIn }: LearnPageProps) {
  // const { t } = useTranslation();

  console.log(isSignedIn);

  return (
    <LearnLayout>
      {/* <Helmet title={t('metaTags:title')} /> */}
      <Helmet title={`Apprendre à coder - gratuitement | Kadea Online`} />
      <main className='landing-page bg-light'>
        <div className='hero-main-bg'>
          <Grid>
            <Hero />
          </Grid>
        </div>
        <div className=''>
          <Grid>
            <Vodacom />
          </Grid>
        </div>

        <div className='as-seen-in'>
          <Grid>
            <RegistrationToAcademy />
          </Grid>
        </div>

        <div className='dotted-bg'>
          <Grid>
            <WhatWillYouLearn isSignedIn={isSignedIn} />
          </Grid>
        </div>

        <HowWillYouLearn />

        <div className=''>
          <Grid>
            <WhatCanYouDo />
          </Grid>
        </div>

        <StartCOding isSignedIn={isSignedIn} />

        <div className=''>
          <Grid>
            <Partners />
          </Grid>
        </div>
      </main>
    </LearnLayout>
  );
}

LearnPage.displayName = 'LearnPage';

export default connect(mapStateToProps, null)(LearnPage);

export const query = graphql`
  query FirstChallenge {
    challengeNode(challenge: { order: { eq: 0 }, challengeOrder: { eq: 0 } }) {
      challenge {
        fields {
          slug
        }
      }
    }
  }
`;
