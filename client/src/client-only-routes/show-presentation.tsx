import React from 'react';
import '../components/Presentation/video-player.css';
import Helmet from 'react-helmet';
// import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

//import envData from '../../../config/env.json';
import { createFlashMessage } from '../components/Flash/redux';
import { Loader, Spacer } from '../components/helpers';
import VideoList from '../components/Presentation/video-list';
import VideoPlayer from '../components/Presentation/video-player';

import {
  signInLoadingSelector,
  userSelector,
  isSignedInSelector,
  hardGoTo as navigate
} from '../redux';

import { User } from '../redux/prop-types';

// TODO: update types for actions
interface ShowPresentationProps {
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

export function ShowPresentation(props: ShowPresentationProps): JSX.Element {
  // const { t } = useTranslation();
  const { showLoading } = props;

  if (showLoading) {
    return <Loader fullScreen={true} />;
  }

  return (
    <>
      <Helmet title={`Tableau de bord | Code Learning Platform`} />
      {/* <Grid fluid={true} className='bg-light'> */}
      <Spacer size={1} />
      <div className='video-player-container'>
        <VideoPlayer />
        <VideoList />
      </div>
      <Spacer size={1} />
      {/* </Grid> */}
    </>
  );
}

ShowPresentation.displayName = 'ShowPresentation';

export default connect(mapStateToProps, mapDispatchToProps)(ShowPresentation);
