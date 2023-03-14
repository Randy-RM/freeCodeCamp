import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Grid } from '@freecodecamp/react-bootstrap';
import { getExternalCoursesCatalog } from '../utils/ajax';
import { createFlashMessage } from '../components/Flash/redux';
import { Loader, Spacer } from '../components/helpers';
// import '../components/CourseCard/courses-card.css';
import CloudShield from '../assets/images/cloudShield.svg';
import PhBookBookmark from '../assets/images/ph-book-bookmark-thin.svg';
import CourseCard from '../components/CourseCard/course-card';

import {
  signInLoadingSelector,
  userSelector,
  isSignedInSelector,
  hardGoTo as navigate
} from '../redux';

import { User } from '../redux/prop-types';
import envData from '../../../config/env.json';

const { moodleApiBaseUrl, moodleApiToken } = envData;

// TODO: update types for actions
interface ShowLearningPathProps {
  createFlashMessage: typeof createFlashMessage;
  isSignedIn: boolean;
  navigate: (location: string) => void;
  showLoading: boolean;
  user: User;
  path?: string;
  location?: { state: { description: string } };
}

type MoodleCourse = {
  id: number;
  name: string;
  description: string;
  coursecount: number;
  visible: number;
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

export function ShowLearningPath(props: ShowLearningPathProps): JSX.Element {
  const { showLoading, isSignedIn } = props;
  const [moodleCoursesCategories, setMoodleCoursesCategories] =
    useState<MoodleCourse[]>();
  const getMoodleCoursesCategories = async () => {
    const moodleCategoriesCatalogue = await getExternalCoursesCatalog<
      MoodleCourse[]
    >(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `${moodleApiBaseUrl}?wstoken=${moodleApiToken}&wsfunction=core_course_get_categories&moodlewsrestformat=json`
    );
    if (moodleCategoriesCatalogue != null) {
      setMoodleCoursesCategories(moodleCategoriesCatalogue);
    } else {
      setMoodleCoursesCategories([]);
    }
  };

  useEffect(() => {
    void getMoodleCoursesCategories();
  }, []);

  if (showLoading) {
    return <Loader fullScreen={true} />;
  }

  return (
    <>
      <Helmet title={`AWS Cours | Kadea Online`} />
      <Grid className='bg-light'>
        <div className='landing-top'>
          <div>
            <h2 className='big-heading'>{`Nos parcours.`}</h2>
            <br />
            <p className='text-responsive'>
              {`
          Nos parcours te permettent d’apprendre par la pratique. Tu gagneras donc un véritable savoir-faire.
          `}
            </p>
          </div>
          <Spacer />
          <div className='card-course-detail-container'>
            <CourseCard
              icon={CloudShield}
              alt=''
              isAvailable={false}
              isSignedIn={isSignedIn}
              title={`Parcours AWS`}
              buttonText={`Suivre le cours  `}
              link={`/aws-courses`}
              description={`Ce parcours est conçu pour montrer aux participants comment 
                  optimiser l'utilisation du cloud AWS grâce à la compréhension 
                  de ces nombreux services et de leur intégration dans la création 
                  de solutions basées sur le cloud.`}
            />

            {moodleCoursesCategories &&
              moodleCoursesCategories.length >= 0 &&
              moodleCoursesCategories.map((category, index) => {
                return (
                  <>
                    <CourseCard
                      key={category.id + index}
                      icon={PhBookBookmark}
                      isAvailable={category.visible == 1}
                      isSignedIn={isSignedIn}
                      title={category.name.replace(/&amp;/g, 'et')}
                      buttonText={`Suivre le parcours  `}
                      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                      link={`/learning-path/${category.name
                        .replace(/ /g, '-')
                        .replace(/&amp;/g, 'et')}/${category.id}`}
                      description={category.description}
                    />
                  </>
                );
              })}
          </div>
        </div>
      </Grid>
    </>
  );
}

ShowLearningPath.displayName = 'ShowLearningPath';

export default connect(mapStateToProps, mapDispatchToProps)(ShowLearningPath);
