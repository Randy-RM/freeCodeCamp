import React from 'react';
import '../filter/course-filter.css';
import { useRecoilState } from 'recoil';
import {
  MoodleCourse,
  MoodleCourseCategory,
  MoodleCoursesCatalogue
} from '../../../../client-only-routes/show-courses';
import {
  addRavenTokenToLocalStorage,
  generateRavenTokenAcces,
  getAwsCourses,
  getExternalResource,
  getRavenTokenDataFromLocalStorage,
  removeRavenTokenFromLocalStorage,
  RavenTokenData
} from '../../../../utils/ajax';
import envData from '../../../../../../config/env.json';
import { splitArray } from '../../../helpers';
import sortCourses from '../../../helpers/sort-course';
import { tokenRaven } from '../../../../redux/atoms';

type MoodleCoursesFiltered = {
  courses: MoodleCourse[] | null;
  warnings: [];
};
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
};

interface RavenFetchCoursesDto {
  apiKey: string;
  token: string;
  currentPage: number;
  fromDate: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  valid_to: string;
}
const { moodleApiBaseUrl, moodleApiToken, ravenAwsApiKey } = envData;

const CourseFilterList = ({
  courseCategories,
  setMoodleCourses,
  setIsDataOnLoading,
  setRavenCourses,
  setCurrentCategory,
  currentCategory
}: {
  courseCategories: MoodleCourseCategory[] | undefined | null;
  setMoodleCourses: React.Dispatch<
    React.SetStateAction<MoodleCoursesCatalogue | null | undefined>
  >;
  setIsDataOnLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setRavenCourses: React.Dispatch<
    React.SetStateAction<RavenCourse[] | null | undefined>
  >;
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
  currentCategory: string;
}): JSX.Element => {
  const [valueOfToken, SetValueOfToken] = useRecoilState(tokenRaven);

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
  const getRavenResources = async () => {
    setIsDataOnLoading(true);
    await getRavenToken();

    const ravenLocalToken = getRavenTokenDataFromLocalStorage();
    const ravenData: RavenFetchCoursesDto = {
      apiKey: ravenAwsApiKey,
      token: ravenLocalToken?.token || '',
      currentPage: Math.floor(Math.random() * 4) + 1,
      fromDate: '01-01-2023',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      valid_to: '06-24-2024'
    };
    const getReveanCourses = await getAwsCourses(ravenData);
    setRavenCourses(getReveanCourses as RavenCourse[]);
    setIsDataOnLoading(false);
  };

  const getRavenToken = async () => {
    const ravenTokenData = getRavenTokenDataFromLocalStorage();

    if (ravenTokenData === null) {
      // Si aucun token n'existe en local storage, générer un nouveau token
      const generateRavenToken = await generateRavenTokenAcces();

      if (generateRavenToken) {
        addRavenTokenToLocalStorage(generateRavenToken as RavenTokenData);
        SetValueOfToken(generateRavenToken as RavenTokenData);
        return generateRavenToken; // Retourner le nouveau token
      } else {
        SetValueOfToken(null);
        return null; // Retourner null si la génération a échoué
      }
    } else {
      // Vérifier si le token existant a expiré d'une heure ou plus
      const tokenExpirationTime = new Date(ravenTokenData.valid_to);
      const currentTime = new Date();
      // 1 heure en millisecondes
      const oneHourInMillis = 60 * 60 * 1000;
      // Calculer la différence de temps en millisecondes
      const timeDifference =
        tokenExpirationTime.getTime() - currentTime.getTime();

      if (timeDifference <= oneHourInMillis) {
        // Le token a expiré d'une heure ou plus, donc le supprimer et générer un nouveau
        removeRavenTokenFromLocalStorage();
        const generateRavenToken = await generateRavenTokenAcces();

        if (generateRavenToken) {
          addRavenTokenToLocalStorage(generateRavenToken as RavenTokenData);
          SetValueOfToken(generateRavenToken as RavenTokenData);
          return generateRavenToken; // Retourner le nouveau token
        } else {
          SetValueOfToken(null);
          return null; // Retourner null si la génération a échoué
        }
      } else {
        // Le token est encore valide, retourner le token existant
        SetValueOfToken(ravenTokenData);
        return ravenTokenData;
      }
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentCategory(e.currentTarget.textContent as string); // Update active state based on clicked button text
  };
  return (
    <div className='landing-filter-container'>
      <ul className='filter-categories-list'>
        {courseCategories && (
          <>
            <button
              className={`category-title ${
                currentCategory === 'Populaires' ? 'active-button' : ''
              }`}
              onClick={e => {
                handleButtonClick(e);
                setMoodleCourses(null);
                void getRavenResources();
                void getMoodleCourses();
              }}
              disabled={currentCategory === 'Populaires'}
            >
              {'Populaires'}
            </button>

            <button
              className={`category-title ${
                currentCategory === 'AWS' ? 'active-button' : ''
              }`}
              style={{ display: valueOfToken == null ? 'none' : 'block' }}
              onClick={e => {
                handleButtonClick(e);
                setMoodleCourses(null);
                void getRavenResources();
              }}
              disabled={currentCategory === 'AWS'}
            >
              {'AWS'}
            </button>

            {courseCategories?.map((element, index) => {
              return (
                <button
                  className={`category-title ${
                    currentCategory == element?.name ||
                    (element?.name.includes('&amp') &&
                      currentCategory == 'Marketing & Communication')
                      ? 'active-button'
                      : ''
                  }`}
                  onClick={e => {
                    handleButtonClick(e);
                    setRavenCourses(null);
                    void filterByCategory(element?.id);
                  }}
                  key={index}
                  disabled={
                    currentCategory == element?.name ||
                    (element?.name.includes('&amp') &&
                      currentCategory == 'Marketing & Communication')
                  }
                >
                  {element?.name.includes('&amp')
                    ? 'Marketing & Communication'
                    : element?.name}
                </button>
              );
            })}
          </>
        )}
      </ul>
    </div>
  );
};

CourseFilterList.displayName = 'courseFilterListe';
export default CourseFilterList;
