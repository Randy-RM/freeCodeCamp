import React from 'react';
import CourseCard from '../../components/CourseCard/course-card';
import PathCard from '../../components/PathCard/path-card';
import { RavenCourse, MoodleCourse } from '../show-courses';
import { ProgramationCourses } from '../../utils/ajax';
import { renderCourseCardSkeletons } from '../../components/helpers';
import AlgoIcon from '../../assets/images/algorithmIcon.svg';
import PhBookBookmark from '../../assets/images/ph-book-bookmark-thin.svg';
import LaediesActIcon from '../../assets/images/partners/we-act-logo.png';
import awsLogo from '../../assets/images/aws-logo.png';
import {
  convertTime,
  convertTimestampToTime,
  formatDescription
} from '../../utils/allFunctions';
import envData from '../../../../config/env.json';
import { allQuery } from '../../utils/routes';
import SwhowIaCourses from './show-ia-courses';

// Unification des types pour les cours
type Course = RavenCourse | MoodleCourse | ProgramationCourses;

interface CourseListProps {
  courses: Course[]; // Tableau contenant différents types de cours
  valueOfUrl: string; // Url de la catégorie pour filtrer les cours
}
const { moodleBaseUrl } = envData;

const CourseList: React.FC<CourseListProps> = ({ courses, valueOfUrl }) => {
  return (
    <div className='card-course-detail-container'>
      {courses.length === 0
        ? renderCourseCardSkeletons(6)
        : courses.map((course, index) => {
            // Gestion des cours de Programmation
            if (valueOfUrl === 'programmation') {
              const courseList = course as ProgramationCourses;
              return (
                <CourseCard
                  key={index}
                  level={courseList.level}
                  language={courseList.language}
                  icon={
                    courseList.sponsorIcon === 'AlgoIcon'
                      ? AlgoIcon
                      : LaediesActIcon
                  }
                  alt={courseList.alt}
                  isAvailable={courseList.isAvailable}
                  title={courseList.title}
                  buttonText='Suivre le cours'
                  link={courseList.link}
                  description={courseList.description}
                />
              );
            }

            // Gestion des cours Amazon Web Services (RavenCourses)
            if (valueOfUrl === 'amazon web service') {
              const courseTyped = course as RavenCourse;
              const firstCategory = courseTyped.category?.[0];
              const language = firstCategory?.tags?.[0]?.title || 'Unknown';

              if (courseTyped.long_description) {
                return (
                  <PathCard
                    key={courseTyped.name}
                    language={language}
                    icon={awsLogo}
                    isAvailable={true}
                    title={`${index + 1}. ${courseTyped.name}`}
                    buttonText='Suivre le parcours'
                    link={courseTyped.launch_url}
                    description={formatDescription(
                      courseTyped.long_description
                    )}
                    duration={convertTime(courseTyped.duration)}
                    level={
                      courseTyped.skill_level === 'Fundamental'
                        ? allQuery.value.level.debutant
                        : ''
                    }
                  />
                );
              } else {
                return (
                  <CourseCard
                    key={index.toString()}
                    level={
                      courseTyped.skill_level === 'Fundamental'
                        ? allQuery.value.level.debutant
                        : ''
                    }
                    language={language}
                    icon={awsLogo}
                    isAvailable={true}
                    title={`${index + 1}. ${courseTyped.name}`}
                    buttonText='Suivre le cours'
                    link={courseTyped.launch_url}
                    description={formatDescription(
                      courseTyped.short_description
                    )}
                    duration={convertTime(courseTyped.duration)}
                  />
                );
              }
            }
            if (
              valueOfUrl === 'Intelligence%20 %20artificielle' ||
              valueOfUrl === 'intelligence artificielle'
            ) {
              return (
                <SwhowIaCourses courses={courses} valueOfUrl={valueOfUrl} />
              );
            }
            // Gestion des cours Moodle
            const courseTyped = course as MoodleCourse;
            return (
              <CourseCard
                key={index}
                language={courseTyped.langue}
                level={courseTyped.level}
                icon={PhBookBookmark}
                isAvailable={courseTyped.visible === 1}
                title={courseTyped.displayname}
                buttonText='Suivre le cours'
                link={`${moodleBaseUrl}/course/view.php?id=${courseTyped.id}`}
                description={courseTyped.summary}
                duration={convertTimestampToTime(courseTyped.duration)}
              />
            );
          })}
    </div>
  );
};

export default CourseList;
