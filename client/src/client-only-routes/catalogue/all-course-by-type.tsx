import React from 'react';

import { RavenCourse, MoodleCourse } from '../show-courses';
import { ProgramationCourses } from '../../utils/ajax';
import { renderCourseCardSkeletons } from '../../components/helpers';

import SwhowIaCourses from './show-ia-courses';
import ShowOnlyRavenCouses from './show-only-raven-courses';
import ShowProgrammationCourses from './show-programmation-courses';
import ShowOnlyMoodleCourses from './show-only-moodle-courses';

// Unification des types pour les cours
type Course = RavenCourse | MoodleCourse | ProgramationCourses;

interface CourseListProps {
  courses: Course[]; // Tableau contenant différents types de cours
  valueOfUrl: string; // Url de la catégorie pour filtrer les cours
}

const CourseList: React.FC<CourseListProps> = ({ courses, valueOfUrl }) => {
  if (courses.length === 0) {
    return <div>{renderCourseCardSkeletons(6)}</div>;
  }

  // Gestion des cours de Programmation
  if (valueOfUrl === 'programmation') {
    return <ShowProgrammationCourses courses={courses} />;
  }

  // Gestion des cours Amazon Web Services (RavenCourses)
  if (valueOfUrl === 'amazon web service') {
    return <ShowOnlyRavenCouses courses={courses} />;
  }

  // Gestion des cours Intelligence Artificielle
  if (
    valueOfUrl === 'Intelligence%20 %20artificielle' ||
    valueOfUrl === 'intelligence artificielle'
  ) {
    return <SwhowIaCourses courses={courses} />;
  }

  // Gestion des cours Moodle
  return <ShowOnlyMoodleCourses courses={courses} />;
};

export default CourseList;
