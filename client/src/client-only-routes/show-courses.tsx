import { Grid } from '@freecodecamp/react-bootstrap';
import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
// import { useTranslation } from 'react-i18next';PhBookBookmark
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import envData from '../../../config/env.json';
import CourseCard from '../components/CourseCard/course-card';
import LaptopIcon from '../assets/images/laptop.svg';
import AlgoIcon from '../assets/images/algorithmIcon.svg';
import PhBookBookmark from '../assets/images/ph-book-bookmark-thin.svg';

import LaediesActIcon from '../assets/images/partners/ladies-act-logo.png';
import { createFlashMessage } from '../components/Flash/redux';
import {
  Loader,
  Spacer,
  renderCourseCardSkeletons,
  splitArray
} from '../components/helpers';
import {
  signInLoadingSelector,
  userSelector,
  isSignedInSelector,
  hardGoTo as navigate
} from '../redux';

import { User } from '../redux/prop-types';
import { getExternalResource } from '../utils/ajax';

const { moodleApiBaseUrl, moodleApiToken, moodleBaseUrl } = envData;

// TODO: update types for actions
interface CoursesProps {
  createFlashMessage: typeof createFlashMessage;
  isSignedIn: boolean;
  navigate: (location: string) => void;
  showLoading: boolean;
  user: User;
  path?: string;
}

type MoodleCourse = {
  id: number;
  shortname: string;
  categoryid: number;
  categorysortorder: number;
  fullname: string;
  displayname: string;
  summary: string;
};

// type MoodleCoursesCatalogue = {
//   courses: MoodleCourse[];
// };

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

// function splitArray<T>(arrayToSplit: T[], chunkSize: number) {
//   const result: T[][] = [];
//   for (let i = 0; i < arrayToSplit.length; i += chunkSize) {
//     const chunk = arrayToSplit.slice(i, i + chunkSize);
//     result.push(chunk);
//   }
//   return { result: result, size: result.length };
// }

export function Courses(props: CoursesProps): JSX.Element {
  // const { t } = useTranslation();
  const { isSignedIn, /*navigate,*/ showLoading } = props;
  const [moodleCourses, setMoodleCourses] = useState<MoodleCourse[]>();
  const [isDataOnLoading, setIsDataOnLoading] = useState<boolean>(true);

  const getMoodleCourses = async () => {
    const moodleCatalogue = await getExternalResource<MoodleCourse[]>(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `${moodleApiBaseUrl}?wstoken=${moodleApiToken}&wsfunction=core_course_get_courses&moodlewsrestformat=json`
    );
    if (moodleCatalogue != null) {
      setMoodleCourses(moodleCatalogue);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      console.log(splitArray<MoodleCourse>(moodleCatalogue, 4));
    } else {
      setMoodleCourses([]);
    }
  };

  useEffect(() => {
    void getMoodleCourses();
    const timer = setTimeout(() => {
      if (isDataOnLoading) {
        setIsDataOnLoading(false);
      }
    }, 3000);
    return () => {
      setMoodleCourses([]); // cleanup useEffect to perform a React state update
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Helmet title={`Nos cours | Kadea Online`} />
      <Grid className='bg-light'>
        <main>
          <div className=''>
            <Spacer size={1} />
            <div>
              <h2 className='big-subheading'>{`Suis nos cours.`}</h2>
              <p className='text-responsive'>
                {`
          Concentre-toi sur ce qui est nécessaire pour acquérir une compétence spécifique et applicable. 
          Tu seras mieux outillé pour construire une carrière.
          `}
              </p>
            </div>
            <Spacer />
            {!isDataOnLoading ? (
              <div className='card-course-detail-container'>
                <CourseCard
                  icon={LaptopIcon}
                  sponsorIcon={LaediesActIcon}
                  alt=''
                  isAvailable={true}
                  isSignedIn={isSignedIn}
                  title={`Responsive Web Design`}
                  buttonText={`Suivre le cours  `}
                  description={`
                Dans ce cours, tu apprendras les langages que les développeurs 
                utilisent pour créer des pages Web : HTML (Hypertext Markup Language) 
                pour le contenu, et CSS (Cascading Style Sheets) pour la conception. 
                Enfin, tu apprendras à créer des pages Web adaptées à différentes tailles d'écran.
                `}
                />
                <CourseCard
                  icon={AlgoIcon}
                  alt=''
                  isAvailable={true}
                  isSignedIn={isSignedIn}
                  title={`JavaScript Algorithms and Data Structures`}
                  buttonText={`Suivre le cours  `}
                  link={`/learn/javascript-algorithms-and-data-structures`}
                  description={`Alors que HTML et CSS contrôlent le contenu et le style  d'une page, 
                JavaScript est utilisé pour la rendre interactive. Dans le cadre du 
                cours JavaScript Algorithm and Data Structures, tu apprendras 
                les principes fondamentaux de JavaScript, etc.`}
                />
                {moodleCourses &&
                  moodleCourses.length > 0 &&
                  moodleCourses.map((course, index) => {
                    return (
                      <CourseCard
                        key={index + course.id}
                        icon={PhBookBookmark}
                        isAvailable={true}
                        isSignedIn={isSignedIn}
                        sameTab={true}
                        external={true}
                        title={`${course.displayname}`}
                        buttonText={`Suivre le cours  `}
                        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                        link={`${moodleBaseUrl}/course/view.php?id=${course.id}`}
                        description={course.summary}
                      />
                    );
                  })}
              </div>
            ) : (
              <div className='card-course-detail-container'>
                {renderCourseCardSkeletons(6)}
              </div>
            )}
          </div>
          <Spacer size={2} />
        </main>
      </Grid>
    </>
  );
}

Courses.displayName = 'Courses';

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
