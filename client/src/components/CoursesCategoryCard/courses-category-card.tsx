import React, { useRef, useState } from 'react';
import { Link } from '@reach/router';

/**
 * Supprime les balises HTML d'une chaîne et retourne uniquement le texte.
 * @param {string} html - La chaîne HTML à nettoyer.
 * @return {string} - Le texte nettoyé sans balises HTML.
 */
// const stripHtmlTags = (html: string): string => {
//   const doc = new DOMParser().parseFromString(html, 'text/html');
//   return doc.body.textContent || '';
// };

import './courses-category-card.css';
import devIcon from '../../assets/icons/dev-icon.svg';
import programmationIcon from '../../assets/icons/programation.png';
import marketingIcone from '../../assets/icons/marketing.png';
import itelligenceIcone from '../../assets/icons/bureaut.svg';
import bureautiqueIcone from '../../assets/icons/computer.svg';

import {
  addRavenTokenToLocalStorage,
  generateRavenTokenAcces,
  getAwsCourses,
  getAwsPath,
  getExternalResource,
  getRavenTokenDataFromLocalStorage
} from '../../utils/ajax';
import envData from '../../../../config/env.json';
import {
  MoodleCourse,
  MoodleCourseCategory,
  MoodleCoursesCatalogue,
  RavenCourse,
  RavenFetchCoursesDto
} from '../../client-only-routes/show-courses';
import { splitArray } from '../helpers';
import sortCourses from '../helpers/sort-course';

interface CourseFilterProps {
  screenWidth: number;
  setRavenCourses: React.Dispatch<
    React.SetStateAction<RavenCourse[] | null | undefined>
  >;
  setMoodleCourses: React.Dispatch<
    React.SetStateAction<MoodleCoursesCatalogue | null | undefined>
  >;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDataOnLoading: React.Dispatch<React.SetStateAction<boolean>>;
  courseCategories: MoodleCourseCategory[] | null | undefined;
  currentCategory: number | null;
  setCurrentCategory: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setRavenPath: React.Dispatch<React.SetStateAction<RavenCourse[] | null>>;
  getRavenResourcesPath: RavenFetchCoursesDto;
}

// interface Course {
//   // eslint-disable-next-line @typescript-eslint/naming-convention
//   learningobject_id: number;
//   // eslint-disable-next-line @typescript-eslint/naming-convention
//   launch_url: string;
//   // eslint-disable-next-line @typescript-eslint/naming-convention
//   updated_date: string;
//   // eslint-disable-next-line @typescript-eslint/naming-convention
//   display_name: string;
//   // eslint-disable-next-line @typescript-eslint/naming-convention
//   short_description: string;
// }

interface RavenTokenData {
  apiKey: string;
  token: string;
  currentPage: 1;
  fromDate: '01-01-2023';
  // eslint-disable-next-line @typescript-eslint/naming-convention
  valid_to: '06-24-2024';
}

const { moodleApiBaseUrl, moodleApiToken, ravenAwsApiKey } = envData;

const CoursesCategoryCard = ({
  setRavenCourses,
  setMoodleCourses,
  setIsDataOnLoading,
  courseCategories,
  setRavenPath,
  setCurrentCategory,
  setCurrentPage
}: CourseFilterProps): JSX.Element => {
  const containerRef1 = useRef<HTMLDivElement>(null);
  const [isSelected, setIsSelected] = useState<number | null>(null);

  const scrollAmount = 320; // Adjust based on card width and gap
  // const categoryDescrTitle = 'développement';

  const scrollLeft = (containerRef: React.RefObject<HTMLDivElement>) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = (containerRef: React.RefObject<HTMLDivElement>) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  const filterByCategory = async (categoryId: number) => {
    setIsDataOnLoading(true);
    const moodleCourseFiltered: { courses: MoodleCourse[] | null } | null =
      await getExternalResource<{ courses: MoodleCourse[] | null }>(
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
    const sortedCourses = sortCourses(splitCourses);

    setMoodleCourses(sortedCourses);
  };

  const getMoodleCourses = async () => {
    setIsDataOnLoading(true);
    const moodleCatalogue = await getExternalResource<MoodleCourse[]>(
      `${moodleApiBaseUrl}?wstoken=${moodleApiToken}&wsfunction=core_course_get_courses&moodlewsrestformat=json`
    );

    const splitCourses: MoodleCoursesCatalogue | null =
      moodleCatalogue != null
        ? splitArray<MoodleCourse>(
            moodleCatalogue.filter(moodleCourse => {
              return moodleCourse.visible == 1 && moodleCourse.format != 'site';
            }),
            4
          )
        : null;
    setIsDataOnLoading(false);

    const sortedCourses = sortCourses(splitCourses);

    if (moodleCatalogue != null) {
      setMoodleCourses(sortedCourses);
    } else {
      setMoodleCourses(null);
    }

    console.log(moodleCatalogue);
  };

  const getRavenCourses = async () => {
    await getRavenToken();

    const ravenLocalToken = getRavenTokenDataFromLocalStorage();
    const ravenData = {
      apiKey: ravenAwsApiKey,
      token: ravenLocalToken?.token || '',
      currentPage: 1,
      fromDate: '01-01-2023',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      valid_to: '06-24-2024'
    };
    setIsDataOnLoading(true);
    const courses = (await getAwsCourses(ravenData)) as RavenCourse[];
    if (courses && courses.length !== 0) {
      setRavenCourses(courses);
      setIsDataOnLoading(false);
    }
  };

  const getRavenResourcesPath = async () => {
    await getRavenToken();

    const ravenLocalToken = getRavenTokenDataFromLocalStorage();
    const ravenData = {
      apiKey: ravenAwsApiKey,
      token: ravenLocalToken?.token || '',
      currentPage: 1,
      fromDate: '01-01-2023',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      valid_to: '06-24-2024'
    };
    setIsDataOnLoading(true);
    const courses = (await getAwsPath(ravenData)) as RavenCourse[];
    if (courses && courses.length !== 0) {
      setRavenPath(courses);
      setIsDataOnLoading(false);
    }
  };

  const getRavenToken = async () => {
    const ravenLocalToken = getRavenTokenDataFromLocalStorage();

    if (ravenLocalToken === null) {
      const generateRavenToken = await generateRavenTokenAcces();

      if (typeof generateRavenToken && generateRavenToken !== null) {
        const token = generateRavenToken as RavenTokenData;
        addRavenTokenToLocalStorage({ token });
      }
    }
  };

  const handleCategoryClick = (categoryId: number) => {
    setIsSelected(categoryId);
    setCurrentCategory(categoryId);
    setCurrentPage(1); // Retour à la première page à chaque fois que la catégory change
    setIsDataOnLoading(true);

    if (categoryId === -1) {
      setMoodleCourses(null);
      setRavenCourses(null);
      setRavenPath(null);
      void filterByCategory(categoryId);
    } else if (categoryId === -2) {
      setMoodleCourses(null);
      void getRavenCourses();
      void getRavenResourcesPath();
    } else if (categoryId !== null) {
      void filterByCategory(categoryId);
      setRavenCourses(null);
      setRavenPath(null);
    } else {
      void getMoodleCourses();
      setRavenCourses(null);
      setRavenPath(null);
    }
  };

  //selectionne une catégorie par rapport à la catégorie passée en simulant le clic sur le clavier
  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLHeadingElement>,
    categoryId: number
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleCategoryClick(categoryId);
    }
  };

  // const isDateWithin30Days = (dateString: string | number) => {
  //   const currentDate = new Date();
  //   const date = new Date(dateString);
  //   const differenceInTime = currentDate.getTime() - date.getTime();
  //   const differenceInDays = differenceInTime / (1000 * 3600 * 24); // Convertir en jours
  //   return differenceInDays < 180;
  // };

  // icons.ts
  const getCourseIcon = (courseName: string): string => {
    if (courseName.includes('Marketing')) {
      return marketingIcone;
    } else if (courseName.includes('Bureautique')) {
      return bureautiqueIcone;
    } else if (courseName.includes('artificielle')) {
      return itelligenceIcone;
    } else {
      return devIcon;
    }
  };

  return (
    <div className='main'>
      <div className='categories-wrapper'>
        <p className='tendance'>Sujets tendance</p>

        <div className='chevron'>
          <button
            className='scroll-button left'
            onClick={() => scrollLeft(containerRef1)}
          >
            ‹
          </button>
          <button
            className='scroll-button right'
            onClick={() => scrollRight(containerRef1)}
          >
            ›
          </button>
        </div>
        <div className='categories-container' ref={containerRef1}>
          <div className={`category-card `}>
            <span className='card-title'>Explorer tout</span>
            <div className='card-content'>
              <button
                className='category-name'
                onClick={() => handleCategoryClick(-1)}
                onKeyPress={event => handleKeyPress(event, -1)}
                tabIndex={0} // Makes the element focusable
              >
                Programmation
              </button>
              <img src={programmationIcon} className='img-icon' alt='icon' />
            </div>
          </div>
          <div className='category-card'>
            <span className='card-title '>Explorer tout</span>
            <div className='card-content'>
              <button
                className='category-name'
                onClick={() => handleCategoryClick(-2)}
                // onKeyPress={event => handleKeyPress(event, -2)}
                tabIndex={0} // Makes the element focusable
              >
                Amazon Web Service
              </button>
              <img src={devIcon} className='img-icon' alt='icon' />
            </div>
          </div>
          {courseCategories?.map(categorie => (
            <div
              key={categorie.id}
              className={`category-card ${
                isSelected === categorie.id ? 'selecte__card category-card' : ''
              }`}
            >
              <span className='card-title'>Explorer tout</span>
              <div className='card-content'>
                <button
                  className='category-name'
                  onClick={() => handleCategoryClick(categorie.id)}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-return,
                  onKeyPress={event => handleKeyPress(event, categorie.id)}
                  tabIndex={0} // rendre l'élément focusable via le clavier et l'inclure dans la tabulation
                >
                  {categorie.name.includes('amp')
                    ? 'Marketing & Communication'
                    : categorie.name.includes('artificielle')
                    ? 'Intelligence Artificielle'
                    : categorie.name}
                </button>
                <img
                  src={getCourseIcon(categorie.name)}
                  className='img-icon'
                  alt={`${categorie.name} icon`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='categories-container-banner'>
        <Link to='/learning-path/developpement-web' className='link-reset'>
          <div>
            <h2 className='ti'>Nouveau Parcours</h2>
          </div>
          <h2 className='path-title'>Découvre le parcours Programmation</h2>
          <p className='path-description'>
            {/* {getDescriptionByCategory(categoryDescrTitle || '')}  on utilisera cette ligne lorsque l'on voudra que les shrot description viennent tous de la structure des données*/}
            Dans ce parcours, tu apprendras à créer des pages Web avec HTML pour
            le contenu, CSS pour la conception, et JavaScript pour rendre les
            sites interactifs. Tu découvriras également les algorithmes, les
            structures de données, et les bases du langage JavaScript.
          </p>
        </Link>
      </div>
    </div>
  );
};

CoursesCategoryCard.displayName = 'coursesCategoryCard';
export default CoursesCategoryCard;
