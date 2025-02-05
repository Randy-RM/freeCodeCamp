import { useState } from 'react';

import { dataForprogramation } from './ajax';

export const useProgramationCourses = () => {
  const [courses, setCourses] = useState(dataForprogramation);

  const updateProgrammationEnrolement = (courseUrl: string) => {
    setCourses(prevCourses =>
      prevCourses.map(course => {
        if (course.link === courseUrl && course.enrolementCount) {
          return {
            ...course,
            enrolementCount: (course.enrolementCount || 0) + 1
          };
        }
        return course;
      })
    );
  };

  return { courses, updateProgrammationEnrolement };
};
