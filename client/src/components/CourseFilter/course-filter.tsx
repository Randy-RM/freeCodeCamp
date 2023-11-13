import React from 'react';
import './course-filter.css';

const CourseFilter = (): JSX.Element => {
  return (
    <div className='filter-container'>
      <p className='filter-title'>Sujets</p>
      <ul className=' filter-items-container '>
        <li>Internet</li>
        <li>Ordinateur</li>
        <li>Internet</li>
        <li>Ordinateur</li>
        <li>Internet</li>
        <li>Ordinateur</li>
        <li>Internet</li>
        <li>Ordinateur</li>
      </ul>
    </div>
  );
};

CourseFilter.displayName = 'CourseFilter';
export default CourseFilter;
