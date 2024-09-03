import React, { useEffect, useState } from 'react';
import './formation.css';
import { FaAngleDown } from 'react-icons/fa';
import googleLogo from '../../../assets/images/landing/googleLogo.png';
import pythonLogo from '../../../assets/icons/pyton.svg';
import { Image } from '../../../../../tools/ui-components/src/image/image';
import starIcon from '../../../assets/icons/iconeEtoiles.svg';
import clockIcon from '../../../assets/icons/iconeHorloge.svg';

import {
  MoodleCourse,
  MoodleCourseCategory,
  MoodleCoursesCatalogue
} from '../../../client-only-routes/show-courses';
import { getExternalResource } from '../../../utils/ajax';
import { splitArray } from '../../helpers';
import sortCourses from '../../helpers/sort-course';
import CoursesFilterSection from './filter-section';
import envData from './../../../../../config/env.json';

const courses = [
  {
    title: "Fondamentaux de l'IA Google",
    asset: googleLogo,
    time: '3h 20 min',
    stars: {
      rate: '5.0',
      count: '1k'
    }
  },
  {
    title: 'Python pour tous',
    asset: pythonLogo,
    time: '3h 20 min',
    stars: {
      rate: '5.0',
      count: '1k'
    }
  }
];

const { moodleApiBaseUrl, moodleApiToken } = envData;
type RavenCourse = {
  learningobjectid: number;
  name: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  launch_url: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  short_description: string;
  createddate: string;
  updateddate: string;
  contenttype: string;
  duration: string;
};
// interface RavenTokenData {
//   token: string;
//   expiresIn: number;
//   validFrom: string;
//   // eslint-disable-next-line @typescript-eslint/naming-convention
//   valid_to: string;
// }

// interface RavenFetchCoursesDto {
//   apiKey: string;
//   token: string;
//   currentPage: number;
//   fromDate: string;
//   // eslint-disable-next-line @typescript-eslint/naming-convention
//   valid_to: string;
// }

function Formations() {
  const [courseCategories, setCourseCategories] = useState<
    MoodleCourseCategory[] | null
  >();
  const [isDataOnLoading, setIsDataOnLoading] = useState<boolean>(false);
  const [moodleCourses, setMoodleCourses] =
    useState<MoodleCoursesCatalogue | null>();
  const [ravenCourses, setRavenCourses] = useState<
    RavenCourse[] | null | undefined
  >([]);
  const [currentCategory, setCurrentCategory] = useState<string>('popular');

  console.log(moodleCourses, ravenCourses);

  // const getRavenResources = async () => {
  //   await getRavenToken();

  //   const ravenLocalToken = getRavenTokenDataFromLocalStorage();
  //   const ravenData: RavenFetchCoursesDto = {
  //     apiKey: ravenAwsApiKey,
  //     token: ravenLocalToken?.token || '',
  //     currentPage: 1,
  //     fromDate: '01-01-2023',
  //     // eslint-disable-next-line @typescript-eslint/naming-convention
  //     valid_to: '06-24-2024'
  //   };
  //   const getReveanCourses = await getAwsCourses(ravenData);
  //   setRavenCourses(getReveanCourses as RavenCourse[]);
  // };

  // const getRavenToken = async () => {
  //   const ravenLocalToken = getRavenTokenDataFromLocalStorage();

  //   if (ravenLocalToken === null) {
  //     const generateRavenToken = await generateRavenTokenAcces();

  //     if (generateRavenToken) {
  //       addRavenTokenToLocalStorage(generateRavenToken as RavenTokenData);
  //     }
  //   }
  // };

  const getMoodleCourseCategory = async () => {
    const moodleCourseCategories = await getExternalResource<
      MoodleCourseCategory[]
    >(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `${moodleApiBaseUrl}?wstoken=${moodleApiToken}&wsfunction=core_course_get_categories&moodlewsrestformat=json`
    );

    if (moodleCourseCategories) {
      setCourseCategories(
        moodleCourseCategories?.filter(category => category.coursecount > 0)
      );
    }
  };
  const getMoodleCourses = async () => {
    const moodleCatalogue = await getExternalResource<MoodleCourse[]>(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `${moodleApiBaseUrl}?wstoken=${moodleApiToken}&wsfunction=core_course_get_courses&moodlewsrestformat=json`
    );

    const splitCourses: MoodleCoursesCatalogue | null | undefined =
      moodleCatalogue != null
        ? splitArray<MoodleCourse>(
            moodleCatalogue.filter(moodleCourse => {
              return moodleCourse.visible == 1 && moodleCourse.format != 'site';
            }),
            4
          )
        : null;

    //Order courses by their publication date
    const sortedCourses = sortCourses(splitCourses);
    if (moodleCatalogue != null) {
      setMoodleCourses(sortedCourses);
    } else {
      setMoodleCourses(null);
    }
  };

  // const allCourses = [
  //   ...(ravenCourses || []),
  //   ...(moodleCourses?.result ? moodleCourses.result.flat() : [])
  // ];

  // const formatdate = (data: number) => {
  //   return new Date(data * 1000).toLocaleDateString();
  // };

  useEffect(() => {
    void getMoodleCourseCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    void getMoodleCourses();

    const timer = setTimeout(() => {
      if (isDataOnLoading) {
        setIsDataOnLoading(false);
      }
    }, 2000);
    return () => {
      setMoodleCourses(null); // cleanup useEffect to perform a React state update
      setIsDataOnLoading(true); // cleanup useEffect to perform a React state update
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className='formation'>
      <h2 className='formation__title'>
        Découvre les formations gratuites de Kadea{' '}
        <span className='formation__title-rouge'>Online</span>
      </h2>
      <CoursesFilterSection
        courseCategories={courseCategories}
        setCurrentCategory={setCurrentCategory}
        currentCategory={currentCategory}
        setIsDataOnLoading={setIsDataOnLoading}
        setMoodleCourses={setMoodleCourses}
        setRavenCourses={setRavenCourses}
      />
      {/* <div className='formation__button_list'>
        {topics.map((topic, i) => (
          <button className='button-list' key={i.valueOf()}>
            {topic.title}
          </button>
        ))}
      </div> */}
      <div className='trainings-list'>
        {courses.map((course, i) => (
          <div className='training-card' key={i.valueOf()}>
            <div className='training-img'>
              <Image src={course.asset} alt={`${course.title} cover image`} />
            </div>
            <div className='training-details'>
              <h3 className='training-title'>{course.title}</h3>
              <div className='training-stats'>
                <div className='stat'>
                  <Image src={starIcon} alt='Stars icon' />
                  <span>
                    {course.stars.rate} ({course.stars.count})
                  </span>
                </div>
                <div className='stat'>
                  <Image src={clockIcon} alt='Clock icon' />
                  <span>{course.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='more-courses'>
        <span>Plus de cours</span>
        <span className='text-primary'>
          <FaAngleDown />
        </span>
      </div>
    </section>
  );
}

export default Formations;
