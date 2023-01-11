import React from 'react';
import { Grid, Row, Col } from '@freecodecamp/react-bootstrap';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { createFlashMessage } from '../components/Flash/redux';
import { Loader, Spacer } from '../components/helpers';
// import '../components/CourseCard/courses-card.css';
import CourseCard from '../components/CourseCard/course-card';

import {
  signInLoadingSelector,
  userSelector,
  isSignedInSelector,
  hardGoTo as navigate
} from '../redux';

import { User } from '../redux/prop-types';
import data from '../components/AwsCourses/aws-courses-data.json';

// TODO: update types for actions
interface ShowAwsCoursesProps {
  createFlashMessage: typeof createFlashMessage;
  isSignedIn: boolean;
  navigate: (location: string) => void;
  showLoading: boolean;
  user: User;
  path?: string;
}

type AwsCours = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  learningpath_id: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  display_name: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  thumbnail_url: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  launch_url: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  created_date: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  updated_date: string;
};

type AwsCourses = {
  courses: AwsCours[];
};

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

export function ShowAwsCourses(props: ShowAwsCoursesProps): JSX.Element {
  const { showLoading, isSignedIn } = props;

  const datatMock: AwsCourses = { ...data };

  if (showLoading) {
    return <Loader fullScreen={true} />;
  }

  return (
    <>
      <Helmet title={`AWS Cours | Code Learning Platform`} />
      <Grid fluid={true} className='bg-light'>
        <Spacer size={1} />
        <div>
          <Row className='super-block-intro-page'>
            <Col md={10} mdOffset={1} sm={10} smOffset={1} xs={12}>
              <p className='text-love-light fw-bold'>Cours</p>
              <h1 className='big-heading'>{`AWS Cours`}</h1>
              <Spacer size={1} />
            </Col>
            <Col className='' md={10} mdOffset={1} sm={10} smOffset={1} xs={12}>
              <div className='alert bg-secondary standard-radius-5'>
                <p>
                  {`
                  Ce cours est conçu pour montrer aux participants comment 
                  optimiser l'utilisation du cloud AWS grâce à la compréhension 
                  de ces nombreux services et de leur intégration dans la création 
                  de solutions basées sur le cloud.
                  `}
                </p>
                <Spacer size={1} />
                <p>
                  {`
                  Etant donné que les solutions architecturales peuvent varier selon 
                  le secteur, le type d'application et la taille de l'entreprise, 
                  ce cours met l'accent sur les bonnes pratiques relatives au cloud AWS 
                  afin d'aider les participants à construire des solutions informatiques 
                  optimisées sur AWS. Cette formation présente également de nombreuses études 
                  de cas expliquant comment certains clients AWS ont conçu leurs infrastructures, 
                  mais aussi les stratégies et services qu'ils ont implémentés. 
                  A l'issue de cette formation, vous serez en capacité de créer une grande variété 
                  d'infrastructures en recourant aux différents services vu au travers de ce module.
                  `}
                </p>
              </div>
            </Col>
            <Spacer />
          </Row>
        </div>
      </Grid>

      <Grid fluid={true}>
        <Spacer size={1} />
        <Row>
          <Col md={10} mdOffset={1} sm={10} smOffset={1} xs={12}>
            <h2 className='big-subheading'>{`Parcours d'apprentissage`}</h2>
            <Spacer size={2} />
          </Col>
          <Col className='' md={10} mdOffset={1} sm={12} smOffset={-1} xs={12}>
            <div className='card-course-detail-container'>
              {datatMock.courses.map(cours => {
                return (
                  <CourseCard
                    key={cours.learningpath_id}
                    isAvailable={true}
                    isSignedIn={isSignedIn}
                    title={cours.display_name}
                    buttonText={`Suivre le cours  `}
                    link={`/presentation`}
                  />
                );
              })}
            </div>
          </Col>
        </Row>
      </Grid>
    </>
  );
}

ShowAwsCourses.displayName = 'ShowAwsCourses';

export default connect(mapStateToProps, mapDispatchToProps)(ShowAwsCourses);
