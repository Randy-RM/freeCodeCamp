import { Grid } from '@freecodecamp/react-bootstrap';
import React from 'react';
import Helmet from 'react-helmet';
// import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

// import envData from '../../../config/env.json';
import { createFlashMessage } from '../components/Flash/redux';
import { Loader, Spacer } from '../components/helpers';
import {
  signInLoadingSelector,
  userSelector,
  isSignedInSelector,
  hardGoTo as navigate
} from '../redux';

import { User } from '../redux/prop-types';

import CoursesList from '../components/Courses/courses-list';

// const { apiLocation } = envData;

// TODO: update types for actions
interface CoursesProps {
  createFlashMessage: typeof createFlashMessage;
  isSignedIn: boolean;
  navigate: (location: string) => void;
  showLoading: boolean;
  user: User;
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
  navigate
};

export function Courses(props: CoursesProps): JSX.Element {
  // const { t } = useTranslation();
  const { isSignedIn, /*navigate,*/ showLoading } = props;

  if (showLoading) {
    return <Loader fullScreen={true} />;
  }

  // if (!isSignedIn) {
  //   navigate(`${apiLocation}/signin`);
  //   return <Loader fullScreen={true} />;
  // }

  return (
    <>
      {/* <Helmet title={`${t('buttons.settings')} | Code Learning Plateform`} /> */}
      <Helmet title={`Nos cours | Code Learning Platform`} />
      <Grid className='bg-light'>
        <main>
          <CoursesList isSignedIn={isSignedIn} />
          <Spacer size={2} />
        </main>
      </Grid>
    </>
  );
}

Courses.displayName = 'Courses';

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
