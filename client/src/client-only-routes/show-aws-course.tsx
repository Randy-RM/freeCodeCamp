import React from 'react';
import { useParams } from '@reach/router';
import { Grid, Row } from '@freecodecamp/react-bootstrap';
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
import datas from '../components/Presentation/video-data.json';

// TODO: update types for actions
interface ShowAwsCourseProps {
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

export function ShowAwsCourse(props: ShowAwsCourseProps): JSX.Element {
  // const { t } = useTranslation();
  const { showLoading } = props;
  const params: string = useParams();
  const [selectedVideo, setSelectedVideo] = React.useState(datas.videos[0]);

  if (showLoading) {
    return <Loader fullScreen={true} />;
  }

  console.log('params : ', params);

  return (
    <>
      <Helmet title={`Tableau de bord | Code Learning Platform`} />
      <Grid fluid={false} className='bg-light'>
        <Row>
          <div className='col-lg-8 col-md-8 col-sm-12 col-xs-12'>
            <div>
              <Spacer size={1} />
              <VideoPlayer videoLink={selectedVideo?.videoUrl} />
              <Spacer size={1} />
            </div>
          </div>
          <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
            <div>
              <Spacer size={1} />
              <VideoList
                setSelectedVideo={setSelectedVideo}
                id={0}
                videoTitle={''}
                videoTime={''}
              />
              <Spacer size={1} />
            </div>
          </div>
        </Row>
        <Spacer size={1} />
      </Grid>
    </>
  );
}

ShowAwsCourse.displayName = 'ShowAwsCourse';

export default connect(mapStateToProps, mapDispatchToProps)(ShowAwsCourse);
