import { Grid, Row, Col } from '@freecodecamp/react-bootstrap';
import React from 'react';
import Helmet from 'react-helmet';
// import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import envData from '../../../config/env.json';
import { createFlashMessage } from '../components/Flash/redux';
import { Loader, Spacer } from '../components/helpers';
import CoursCardProgress from '../components/Dashboard/cours-card-progress';

import {
  signInLoadingSelector,
  userSelector,
  isSignedInSelector,
  hardGoTo as navigate
} from '../redux';

import { User } from '../redux/prop-types';

const { apiLocation } = envData;

// TODO: update types for actions
interface ShowDashboardProps {
  createFlashMessage: typeof createFlashMessage;
  isSignedIn: boolean;
  navigate: (location: string) => void;
  showLoading: boolean;
  user: User;
}

const mapStateToProps = createSelector(
  signInLoadingSelector,
  userSelector,
  isSignedInSelector,
  (showLoading: boolean, user: User, isSignedIn) => ({
    showLoading,
    user,
    isSignedIn
  })
);

const mapDispatchToProps = {
  createFlashMessage,
  navigate
};

export function ShowDashboard(props: ShowDashboardProps): JSX.Element {
  // const { t } = useTranslation();
  const { isSignedIn, user, navigate, showLoading } = props;

  if (showLoading) {
    return <Loader fullScreen={true} />;
  }

  if (!isSignedIn) {
    navigate(`${apiLocation}/signin`);
    return <Loader fullScreen={true} />;
  }

  return (
    <>
      {console.log(user)}
      {/* <Helmet title={`${t('buttons.settings')} | Code Learning Plateform`} /> */}
      <Helmet title={`Tableau de bord | Code Learning Platform`} />
      <Grid fluid={true} className='bg-light'>
        <main>
          <Spacer size={2} />
          <div className=''>
            <Spacer size={1} />
            <Row className='super-block-intro-page'>
              <Col md={8} mdOffset={2} sm={8} smOffset={2} xs={12}>
                <div className=''>
                  <h1
                    className='big-subheading'
                    style={{ overflowWrap: 'break-word' }}
                  >
                    {'Mes cours'}
                  </h1>
                </div>
              </Col>
              <Col className='' md={8} mdOffset={2} sm={8} smOffset={2} xs={12}>
                <Spacer size={1} />
                <div className='block-ui bg-secondary'>
                  <CoursCardProgress
                    percentageCompleted={50}
                    coursName='Responsive web design'
                  />
                </div>
                <Spacer size={1} />
              </Col>
            </Row>
            <Spacer size={1} />
          </div>
          <Spacer size={2} />
        </main>
      </Grid>
    </>
  );
}

ShowDashboard.displayName = 'ShowDashboard';

export default connect(mapStateToProps, mapDispatchToProps)(ShowDashboard);
