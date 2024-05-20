import React, { useState } from 'react';
import '../filter/course-filter.css';
import { MoodleCourseCategory } from '../../../../client-only-routes/show-courses';

const CourseFilterList = ({
  courseCategories
}: {
  courseCategories: MoodleCourseCategory[] | undefined | null;
}): JSX.Element => {
  const [activeButton, setActiveButton] = useState<string>('Populaires'); // Initial active button
  console.log('active log', activeButton == 'Populaires');

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveButton(e.currentTarget.textContent as string); // Update active state based on clicked button text
  };
  return (
    <div className='landing-filter-container'>
      <ul className='filter-categories-list'>
        <button
          className={`category-name ${
            activeButton === 'Populaires' ? 'active-button' : ''
          }`}
          onClick={handleButtonClick}
        >
          {'Populaires'}
        </button>
        <button
          className={`category-name ${
            activeButton === 'Programmation' ? 'active-button' : ''
          }`}
          onClick={handleButtonClick}
        >
          {'Programmation'}
        </button>
        <button
          className={`category-name ${
            activeButton === 'AWS' ? 'active-button' : ''
          }`}
          onClick={handleButtonClick}
        >
          {'AWS'}
        </button>
        <button
          className={`category-name ${
            activeButton === ' Marketing digital' ? 'active-button' : ''
          }`}
          onClick={handleButtonClick}
        >
          {' Marketing digital'}
        </button>
        <button
          className={`category-name ${
            activeButton === 'IA' ? 'active-button' : ''
          }`}
          onClick={handleButtonClick}
        >
          {'IA'}
        </button>

        {courseCategories?.map((element, index) => {
          return (
            <button
              className={`category-name ${
                activeButton == element?.name ? 'active-button' : ''
              }`}
              onClick={handleButtonClick}
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
