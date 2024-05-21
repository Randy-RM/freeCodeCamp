import React, { useState } from 'react';
import '../filter/course-filter.css';
import {
  MoodleCourse,
  MoodleCourseCategory,
  MoodleCoursesCatalogue
} from '../../../../client-only-routes/show-courses';
import { getExternalResource } from '../../../../utils/ajax';
import envData from '../../../../../../config/env.json';
import { splitArray } from '../../../helpers';
import sortCourses from '../../../helpers/sort-course';

type MoodleCoursesFiltered = {
  courses: MoodleCourse[] | null;
  warnings: [];
};
const { moodleApiBaseUrl, moodleApiToken } = envData;

const CourseFilterList = ({
  courseCategories,
  setMoodleCourses,
  setIsDataOnLoading
}: {
  courseCategories: MoodleCourseCategory[] | undefined | null;
  setMoodleCourses: React.Dispatch<
    React.SetStateAction<MoodleCoursesCatalogue | null | undefined>
  >;
  setIsDataOnLoading: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  const [currentCategory, setCurrentCategory] = useState<string>('Populaires'); // Initial active button

  console.log('active log', currentCategory == 'Populaires');
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

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentCategory(e.currentTarget.textContent as string); // Update active state based on clicked button text
  };
  return (
    <div className='landing-filter-container'>
      <ul className='filter-categories-list'>
        <button
          className={`category-name ${
            currentCategory === 'Populaires' ? 'active-button' : ''
          }`}
          onClick={handleButtonClick}
        >
          {'Populaires'}
        </button>
        <button
          className={`category-name ${
            currentCategory === 'Programmation' ? 'active-button' : ''
          }`}
          onClick={handleButtonClick}
        >
          {'Programmation'}
        </button>
        <button
          className={`category-name ${
            currentCategory === 'AWS' ? 'active-button' : ''
          }`}
          onClick={handleButtonClick}
        >
          {'AWS'}
        </button>

        {courseCategories?.map((element, index) => {
          return (
            <button
              className={`category-name ${
                currentCategory == element?.name ? 'active-button' : ''
              }`}
              onClick={() => {
                handleButtonClick;
                void filterByCategory(element?.id);
              }}
              key={index}
            >
              {element?.name}
            </button>
          );
        })}
      </ul>
    </div>
  );
};

CourseFilterList.displayName = 'courseFilterListe';
export default CourseFilterList;
