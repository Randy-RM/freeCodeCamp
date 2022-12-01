import { Grid, Row, Col } from '@freecodecamp/react-bootstrap';
import React from 'react';
import Helmet from 'react-helmet';
// import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import envData from '../../../config/env.json';
import { createFlashMessage } from '../components/Flash/redux';
import { Loader, Spacer } from '../components/helpers';
import About from '../components/settings/about';
import Education from '../components/settings/education';
import WorkExperience from '../components/settings/work-experience';
import DangerZone from '../components/settings/danger-zone';
// import Email from '../components/settings/email';
import Internet from '../components/settings/internet';
import { Themes } from '../components/settings/theme';

import {
  signInLoadingSelector,
  userSelector,
  isSignedInSelector,
  hardGoTo as navigate
} from '../redux';

import { User } from '../redux/prop-types';

import {
  submitNewAbout,
  updateUserFlag,
  verifyCert,
  submitNewEducation,
  submitNewWorkExperience
} from '../redux/settings';

const { apiLocation } = envData;

// TODO: update types for actions
interface ShowSettingsProps {
  createFlashMessage: typeof createFlashMessage;
  isSignedIn: boolean;
  navigate: (location: string) => void;
  showLoading: boolean;
  submitNewAbout: () => void;
  submitNewEducation: () => void;
  submitNewWorkExperience: () => void;
  toggleNightMode: (theme: Themes) => void;
  toggleSoundMode: (sound: boolean) => void;
  updateInternetSettings: () => void;
  updateIsHonest: () => void;
  updatePortfolio: () => void;
  updateQuincyEmail: (isSendQuincyEmail: boolean) => void;
  user: User;
  verifyCert: () => void;
  path?: string;
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
  navigate,
  submitNewAbout,
  submitNewEducation,
  submitNewWorkExperience,
  toggleNightMode: (theme: Themes) => updateUserFlag({ theme }),
  toggleSoundMode: (sound: boolean) => updateUserFlag({ sound }),
  updateInternetSettings: updateUserFlag,
  updateIsHonest: updateUserFlag,
  updatePortfolio: updateUserFlag,
  updateQuincyEmail: (sendQuincyEmail: boolean) =>
    updateUserFlag({ sendQuincyEmail }),
  verifyCert
};

export function ShowSettings(props: ShowSettingsProps): JSX.Element {
  // const { t } = useTranslation();
  const {
    isSignedIn,
    submitNewAbout,
    submitNewEducation,
    submitNewWorkExperience,
    user: {
      // email,
      // isEmailVerified,
      // sendQuincyEmail,
      username,
      about,
      points,
      location,
      name,
      gender,
      codeTime,
      fieldOfStudy,
      levelOfStudy,
      employedWhere,
      sinceWhen,
      position,
      githubProfile,
      linkedin,
      twitter,
      website
    },
    navigate,
    showLoading,
    // updateQuincyEmail,
    updateInternetSettings
  } = props;

  if (showLoading) {
    return <Loader fullScreen={true} />;
  }

  if (!isSignedIn) {
    navigate(`${apiLocation}/signin`);
    return <Loader fullScreen={true} />;
  }

  return (
    <>
      {/* <Helmet title={`${t('buttons.settings')} | Code Learning Plateform`} /> */}
      <Helmet title={`Profil | Code Learning Platform`} />
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
                    {'Informations personnelles'}
                  </h1>
                </div>
              </Col>
              <Col className='' md={8} mdOffset={2} sm={8} smOffset={2} xs={12}>
                <Spacer size={1} />
                <div className='block-ui bg-secondary'>
                  <About
                    about={about}
                    location={location}
                    name={name}
                    gender={gender}
                    codeTime={codeTime}
                    points={points}
                    submitNewAbout={submitNewAbout}
                    username={username}
                  />
                </div>
                <Spacer size={1} />
              </Col>
            </Row>
            <Spacer size={1} />
          </div>
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
                    {'Éducation'}
                  </h1>
                </div>
              </Col>
              <Col className='' md={8} mdOffset={2} sm={8} smOffset={2} xs={12}>
                <Spacer size={1} />
                <div className='block-ui bg-secondary'>
                  <Education
                    fieldOfStudy={fieldOfStudy}
                    levelOfStudy={levelOfStudy}
                    submitNewEducation={submitNewEducation}
                  />
                </div>
                <Spacer size={1} />
              </Col>
            </Row>
            <Spacer size={1} />
          </div>
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
                    {'Expérience professionnelle'}
                  </h1>
                </div>
              </Col>
              <Col className='' md={8} mdOffset={2} sm={8} smOffset={2} xs={12}>
                <Spacer size={1} />
                <div className='block-ui bg-secondary'>
                  <WorkExperience
                    employedWhere={employedWhere}
                    sinceWhen={sinceWhen}
                    position={position}
                    submitNewWorkExperience={submitNewWorkExperience}
                  />
                </div>
                <Spacer size={1} />
              </Col>
            </Row>
            <Spacer size={1} />
          </div>
          {/* <Spacer size={2} />
          <div className=''>
            <Spacer size={1} />
            <Row className='super-block-intro-page'>
              <Col md={8} mdOffset={2} sm={8} smOffset={2} xs={12}>
                <div className=''>
                  <h2
                    className='big-subheading'
                    style={{ overflowWrap: 'break-word' }}
                  >
                    {"Paramètres d'email"}
                  </h2>
                </div>
              </Col>
              <Col className='' md={8} mdOffset={2} sm={8} smOffset={2} xs={12}>
                <Spacer size={1} />
                <div className='block-ui bg-secondary'>
                  <Email
                    email={email}
                    isEmailVerified={isEmailVerified}
                    sendQuincyEmail={sendQuincyEmail}
                    updateQuincyEmail={updateQuincyEmail}
                  />
                </div>
                <Spacer size={1} />
              </Col>
            </Row>
            <Spacer size={1} />
          </div> */}
          <Spacer size={2} />
          <div className=''>
            <Spacer size={1} />
            <Row className='super-block-intro-page'>
              <Col md={8} mdOffset={2} sm={8} smOffset={2} xs={12}>
                <div className=''>
                  <h2
                    className='big-subheading'
                    style={{ overflowWrap: 'break-word' }}
                  >
                    {'Votre présence sur internet'}
                  </h2>
                </div>
              </Col>
              <Col className='' md={8} mdOffset={2} sm={8} smOffset={2} xs={12}>
                <Spacer size={1} />
                <div className='block-ui bg-secondary'>
                  <Internet
                    githubProfile={githubProfile}
                    linkedin={linkedin}
                    twitter={twitter}
                    updateInternetSettings={updateInternetSettings}
                    website={website}
                  />
                </div>
                <Spacer size={1} />
              </Col>
            </Row>
            <Spacer size={1} />
          </div>

          <Spacer />
          <DangerZone />
        </main>
      </Grid>
    </>
  );
}

ShowSettings.displayName = 'ShowSettings';

export default connect(mapStateToProps, mapDispatchToProps)(ShowSettings);
