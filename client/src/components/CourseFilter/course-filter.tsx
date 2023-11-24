import React, { useEffect, useState } from 'react';
import './course-filter.css';

import { getExternalResource } from '../../utils/ajax';
import envData from '../../../../config/env.json';

import {
  MoodleCourse,
  MoodleCoursesCatalogue
} from '../../client-only-routes/show-courses';
import { splitArray } from '../helpers';
import sortCourses from '../helpers/sort-course';

type MoodleCourseCategory = {
  id: number;
  name: string;
  idnumber: string;
  description: string;
  descriptionformat: number;
  parent: number;
  sortorder: number;
  coursecount: number;
  visible: number;
  visibleold: number;
  timemodified: number;
  depth: number;
  path: string;
  theme: string;
};

type MoodleCoursesFiltered = {
  courses: MoodleCourse[] | null;
  warnings: [];
};

const { moodleApiBaseUrl, moodleApiToken } = envData;

const CourseFilter = ({
  setMoodleCourses,
  setIsDataOnLoading
}: {
  setMoodleCourses: React.Dispatch<
    React.SetStateAction<MoodleCoursesCatalogue | null | undefined>
  >;
  setIsDataOnLoading: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  const [courseCategories, setCourseCategories] = useState<
    MoodleCourseCategory[] | null
  >();

  const [showSubjectFilter, setShowSubjectFilter] = useState<boolean>(true);

  const [currentCategory, setCurrentCategory] = useState<number | null>(null);

  const getMoodleCourseCategory = async () => {
    const moodleCourseCategories = await getExternalResource<
      MoodleCourseCategory[]
    >(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `${moodleApiBaseUrl}?wstoken=${moodleApiToken}&wsfunction=core_course_get_categories&moodlewsrestformat=json`
    );
    setCourseCategories(moodleCourseCategories);
  };

  const filterByCategory = async (categoryId: number) => {
    setIsDataOnLoading(true);
    const moodleCourseFiltered: MoodleCoursesFiltered | null =
      await getExternalResource<MoodleCoursesFiltered>(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${moodleApiBaseUrl}?wstoken=${moodleApiToken}&wsfunction=core_course_get_courses_by_field&field=category&value=${categoryId}&moodlewsrestformat=json`
      );
    setIsDataOnLoading(false);

    const splitCourses: MoodleCoursesCatalogue | null | undefined =
      moodleCourseFiltered?.courses != null
        ? splitArray<MoodleCourse>(
            moodleCourseFiltered.courses.filter(
              moodleCourse => moodleCourse.visible == 1
            ),
            4
          )
        : null;
    //Order courses by their publication date
    const sortedCourses = sortCourses(splitCourses);

    setMoodleCourses(sortedCourses);
  };

  const getMoodleCourses = async () => {
    setIsDataOnLoading(true);
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
    setIsDataOnLoading(false);

    //Order courses by their publication date
    const sortedCourses = sortCourses(splitCourses);

    if (moodleCatalogue != null) {
      setMoodleCourses(sortedCourses);
    } else {
      setMoodleCourses(null);
    }
  };

  useEffect(() => {
    void getMoodleCourseCategory();
  }, []);

  return (
    <div className='filter-container'>
      <h3 className='main-title-filter'>Filtrer par :</h3>
      <details className='filter-details-container' open>
        <summary
          onClick={() => setShowSubjectFilter(e => !e)}
          className='filter-title-container'
        >
          <p className='filter-title'>Sujets</p>
          {showSubjectFilter == true ? (
            <svg
              width='30px'
              height='30px'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect width='24' height='24' fill='white' />
              <path d='M7 14.5L12 9.5L17 14.5' stroke='#000000' />
            </svg>
          ) : (
            <svg
              width='30px'
              height='30px'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect width='24' height='24' fill='white' />
              <path
                d='M17 9.5L12 14.5L7 9.5'
                stroke='#000000'
                // stroke-linecap='round'
                // stroke-linejoin='round'
              />
            </svg>
          )}
        </summary>
        <ul className=' filter-items-container '>
          <button
            className={`filter-button ${
              currentCategory == null ? 'selected-category' : ''
            }`}
            onClick={() => {
              void getMoodleCourses();
              setCurrentCategory(null);
            }}
          >
            Tous
          </button>
          {courseCategories?.map((element, index) => {
            return (
              <button
                className={`filter-button ${
                  currentCategory == element.id ? 'selected-category' : ''
                }`}
                onClick={() => {
                  void filterByCategory(element.id);
                  setCurrentCategory(element.id);
                }}
                key={index}
              >
                {element.name}
              </button>
            );
          })}
        </ul>
      </details>
    </div>
  );
};

CourseFilter.displayName = 'CourseFilter';
export default CourseFilter;
