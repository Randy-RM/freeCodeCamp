import { Grid } from '@freecodecamp/react-bootstrap';
import { graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import LearnLayout from '../components/layouts/learn';

import {
  userFetchStateSelector,
  isSignedInSelector,
  userSelector
} from '../redux';

import AsSeenIn from '../components/landing/components/as-seen-in';
import LandingTop from '../components/landing/components/landing-top';
import LandingDetails from '../components/landing/components/landing-details';
import LandingLearn from '../components/landing/components/landing-learn';
import LandingGoals from '../components/landing/components/landing-goals';

import '../components/landing/landing.css';

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
  (fetchState: FetchState, isSignedIn: boolean, user: User) => ({
    fetchState,
    isSignedIn,
    user
  })
);

interface Slug {
  slug: string;
}

interface LearnPageProps {
  isSignedIn: boolean;
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
  const { t } = useTranslation();

  return (
    <LearnLayout>
      <Helmet title={t('metaTags:title')} />
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
