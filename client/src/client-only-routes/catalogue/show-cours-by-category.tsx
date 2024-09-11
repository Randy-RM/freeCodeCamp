import React, { useEffect, useState } from 'react';
import { Grid } from '@freecodecamp/react-bootstrap';
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from '@reach/router';
import LaptopIcon from '../../assets/images/laptop.svg';
import AlgoIcon from '../../assets/images/algorithmIcon.svg';
import PhBookBookmark from '../../assets/images/ph-book-bookmark-thin.svg';
import LaediesActIcon from '../../assets/images/partners/we-act-logo.png';
import awsLogo from '../../assets/images/aws-logo.png';
import notFound from '../../assets/icons/nofound.svg';

import {
  getRavenResources,
  getRavenPathResources,
  getMoodleCourses,
  getMoodleCourseCategory,
  getAllRessources
} from '../../utils/ajax';
import {
  Loader,
  renderCourseCardSkeletons,
  Spacer
} from '../../components/helpers';
import CourseFilter from '../../components/CourseFilter/course-filter';
import CourseCard from '../../components/CourseCard/course-card';
import PathCard from '../../components/PathCard/path-card';
import {
  convertTime,
  convertTimeForFilter,
  convertTimestampToTime,
  formatDescription,
  getCategoryDescription,
  paginate
} from '../../utils/allFunctions';
import { CoursesProps, MoodleCourse, RavenCourse } from '../show-courses';
import envData from '../../../../config/env.json';
import {
  isSignedInSelector,
  signInLoadingSelector,
  userSelector,
  hardGoTo as navigate
} from '../../redux';
import { User } from '../../redux/prop-types';
import { createFlashMessage } from '../../components/Flash/redux';
import {
  categoryCours,
  changeState,
  coursesMoodle,
  coursesRaven,
  myAllDataCourses,
  pathRaven,
  titleOfCategorieValue,
  valueOfCurrentCategory
} from '../../redux/atoms';

import '../catalogue/show-courses-by-category.css';
import routes from '../../utils/routes';

const mapStateToProps = createSelector(
  signInLoadingSelector,
  userSelector,
  isSignedInSelector,
  (showLoading: boolean, user: User) => ({
    showLoading,
    user
    // isSignedIn
  })
);

const mapDispatchToProps = {
  createFlashMessage,
  navigate
};

function CourseByCatalogue(props: CoursesProps): JSX.Element {
  const { showLoading } = props;
  const [isDataOnLoading, setIsDataOnLoading] = useState<boolean>(true);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [currentPage, setCurrentpage] = useState<number>(1);

  const [screenWidth, setScreenWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 900
  );

  const [showMessage, setShowMessage] = useState(false);

  const navigated = useNavigate();

  //gestion des states avec recoil(voir doc recoil state manager)
  const [valueOfCurrentCategorie, SetValueOfCurrentCategory] = useRecoilState(
    valueOfCurrentCategory
  );
  const [ressourcesData, setRessourceDatas] = useRecoilState(myAllDataCourses);
  const valueOfTitleCategorie = useRecoilValue(titleOfCategorieValue);
  // const allDataofCourses = useRecoilValue(allDataCourses);
  const setDataMoodle = useSetRecoilState(coursesMoodle);
  const setDataRaven = useSetRecoilState(coursesRaven);
  const setDataRavenPath = useSetRecoilState(pathRaven);
  const showMoodleCategory = useRecoilValue(categoryCours);
  const [changeStateValue, setChangeStateValue] = useRecoilState(changeState);

  const currentUrl = window.location.href;

  const { moodleBaseUrl } = envData;
  useEffect(() => {
    setIsDataOnLoading(true);

    void getMoodleCourses();
    void getRavenResources(currentPage);
    void getRavenPathResources(currentPage);
    void getMoodleCourseCategory();
    void getAllRessources(currentPage);

    const timer = setTimeout(() => {
      if (isDataOnLoading) {
        // setIsDataOnLoading(false);
      }
    }, 2000);
    return () => {
      setDataMoodle(null);
      setIsDataOnLoading(true);
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCourses = async () => {
    setIsDataOnLoading(true);

    try {
      setRessourceDatas([]);
      const currentPage = 1; // ou la page courante

      const courses = await getAllRessources(currentPage);

      // Séparer les cours Raven et Moodle
      const ravenCourses = courses
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        .flatMap(course => (Array.isArray(course) ? course : [course]))
        .filter(course => 'launch_url' in course) as RavenCourse[];
      const moodleCourses = courses
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        .flatMap(course => (Array.isArray(course) ? course : []))
        .filter(course => !('launch_url' in course)) as MoodleCourse[];

      let filteredRavenCourses = ravenCourses;
      let filteredMoodleCourses = moodleCourses;

      if (valueOfCurrentCategorie === -2) {
        // Filtre par langue
        const filterByEnglish = currentUrl.includes('English');
        const filterByFrench = currentUrl.includes('French');

        if (filterByEnglish || filterByFrench) {
          filteredRavenCourses = filteredRavenCourses.filter(course => {
            const courseLanguage = course.category?.[0]?.tags?.[0]?.title;
            return (
              (filterByEnglish && courseLanguage === 'English') ||
              (filterByFrench && courseLanguage === 'French')
            );
          });

          filteredMoodleCourses = filteredMoodleCourses.filter(course => {
            const courseLanguage = course.langue; // Adapter pour Moodle
            return (
              (filterByEnglish && courseLanguage === 'English') ||
              (filterByFrench && courseLanguage === 'French')
            );
          });
        }

        // Filtre par type de cours
        const filterByParcours = currentUrl.includes('Parcours');
        const filterByCours = currentUrl.includes('Cours');

        if (filterByParcours || filterByCours) {
          filteredRavenCourses = filteredRavenCourses.filter(course => {
            return (
              // eslint-disable-next-line @typescript-eslint/naming-convention
              (filterByParcours && course.long_description) ||
              // eslint-disable-next-line @typescript-eslint/naming-convention
              (filterByCours && !course.long_description)
            );
          });

          filteredMoodleCourses = filteredMoodleCourses.filter(course => {
            return (
              (filterByParcours && course.type === 'parcours') ||
              (filterByCours && course.type === 'cours')
            );
          });
        }

        // Filtre par niveau
        const filterByDebutant = currentUrl.includes('Débutant');
        const filterByIntermediaire = currentUrl.includes('Interm%C3%A9diaire');
        const filterByAvance = currentUrl.includes('Avanc%C3%A9');

        if (filterByDebutant || filterByIntermediaire || filterByAvance) {
          filteredRavenCourses = filteredRavenCourses.filter(course => {
            return (
              // eslint-disable-next-line @typescript-eslint/naming-convention
              (filterByDebutant && course.skill_level === 'Fundamental') ||
              (filterByIntermediaire &&
                // eslint-disable-next-line @typescript-eslint/naming-convention
                course.skill_level === 'Intermediate') ||
              // eslint-disable-next-line @typescript-eslint/naming-convention
              (filterByAvance && course.skill_level === 'Advanced')
            );
          });

          filteredMoodleCourses = filteredMoodleCourses.filter(course => {
            return (
              (filterByDebutant && course.level === 'debutant') ||
              (filterByIntermediaire && course.level === 'Intermediate') ||
              (filterByAvance && course.level === 'Advanced')
            );
          });
        }

        // Filtrer par durée
        if (currentUrl.includes('dur%C3%A9e')) {
          const filterLessThan1Hour = currentUrl.includes('dur%C3%A9e=%3E1h');
          const filterBetween1And5Hours =
            currentUrl.includes('dur%C3%A9e=1%3E5h');
          const filterUpTo5Hours = currentUrl.includes('%3E1h%2C1%3E5h');
          const filterMoreThan5Hours = currentUrl.includes('dur%C3%A9e=%3E5h');

          filteredRavenCourses = filteredRavenCourses.filter(course => {
            const courseHours = convertTimeForFilter(parseInt(course.duration));
            return (
              (filterLessThan1Hour && courseHours < 60) ||
              (filterBetween1And5Hours &&
                courseHours >= 60 &&
                courseHours <= 300) ||
              (filterUpTo5Hours && courseHours <= 300) ||
              (filterMoreThan5Hours && courseHours > 300)
            );
          });

          filteredMoodleCourses = filteredMoodleCourses.filter(course => {
            const courseHours = convertTimeForFilter(course.duration);
            return (
              (filterLessThan1Hour && courseHours < 60) ||
              (filterBetween1And5Hours &&
                courseHours >= 60 &&
                courseHours <= 300) ||
              (filterUpTo5Hours && courseHours <= 300) ||
              (filterMoreThan5Hours && courseHours > 300)
            );
          });
        }

        // Mise à jour des données affichées
        setRessourceDatas([...filteredRavenCourses]);
      } else if (valueOfCurrentCategorie === null) {
        setRessourceDatas([...ravenCourses, ...moodleCourses]);
      } else {
        // Filtrage supplémentaire basé sur d'autres critères
        setRessourceDatas(filteredMoodleCourses);
      }

      setIsDataOnLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  console.log(currentUrl);

  useEffect(() => {
    void fetchCourses();
    setChangeStateValue(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueOfCurrentCategorie, changeStateValue]);

  useEffect(() => {
    setCurrentpage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueOfCurrentCategorie, currentUrl]);

  const {
    paginatedData,
    totalPages,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    currentPage: page
  } = paginate(ressourcesData, currentPage);

  useEffect(() => {
    if (screenWidth > 990) setShowFilter(true);
    else setShowFilter(false);
  }, [screenWidth]);

  useEffect(() => {
    SetValueOfCurrentCategory(valueOfCurrentCategorie);
  }, [valueOfCurrentCategorie, SetValueOfCurrentCategory]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (ressourcesData.length == 0 && showMessage) {
        setShowMessage(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUrl, valueOfCurrentCategorie]);

  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
      showFilter && setScreenWidth(window.innerWidth);
    });
  }

  //gestion de la pagination pour l'affichage des cours
  const onNavigateForward = () => {
    if (currentPage < totalPages && currentPage > 0) {
      setCurrentpage(currentPage + 1);
      setIsDataOnLoading(!isDataOnLoading);
    } else {
      setCurrentpage(currentPage);
    }
  };

  const onNavigueteBackward = () => {
    if (currentPage > 1) {
      setCurrentpage(currentPage - 1);
      setIsDataOnLoading(!isDataOnLoading);
    } else {
      setCurrentpage(currentPage);
    }
  };

  if (showLoading) {
    return <Loader fullScreen={true} />;
  }

  return (
    <>
      <Helmet title={`Nos cours | Kadea Online`} />
      <Grid className='bg-light'>
        <main>
          <div className=''>
            <Spacer size={1} />

            <button
              onClick={() => {
                setShowFilter(e => !e);
              }}
              className='show-filter-button '
            >
              <span>Filtrer</span>
              <svg
                width='20px'
                height='20px'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                className=''
              >
                <g>
                  <path fill='none' d='M0 0h24v24H0z' />
                  <path d='M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z' />
                </g>
              </svg>
            </button>

            <div className={'card-filter-container '}>
              {showFilter && (
                <div className=''>
                  <CourseFilter
                    setRavenPath={setDataRavenPath}
                    screenWidth={screenWidth}
                    setRavenCourses={setDataRaven}
                    setMoodleCourses={setDataMoodle}
                    setShowFilter={setShowFilter}
                    setIsDataOnLoading={setIsDataOnLoading}
                    courseCategories={showMoodleCategory}
                    currentCategory={valueOfCurrentCategorie}
                    setCurrentCategory={SetValueOfCurrentCategory}
                    setCurrentPage={setCurrentpage}
                  />
                </div>
              )}

              <div
                className={`card-courses-detail-container ${
                  showFilter ? 'hidden_all_container' : ''
                }`}
              >
                <div>
                  <h2 className=' catalog-title'>
                    <span className='catalog'>Catalogue</span> /
                    <span className='catalog-title_space'>
                      {valueOfTitleCategorie}
                    </span>
                  </h2>
                </div>
                <Spacer />

                <div className='card__courses__description'>
                  <h3>Decouvrez le parcours {valueOfTitleCategorie}</h3>
                  <p>{getCategoryDescription(valueOfTitleCategorie)}</p>
                </div>
                <div className='course__number'>
                  <p>Parcourir le catalogue complet</p>
                  <span>
                    {(() => {
                      if (isDataOnLoading) {
                        return '';
                      }

                      if (valueOfCurrentCategorie === -1) {
                        return '2 cours';
                      } else if (valueOfCurrentCategorie === -2) {
                        const lunchUrlCoursesCount = paginatedData.filter(
                          course => course['launch_url']
                        ).length;
                        return lunchUrlCoursesCount > 0
                          ? `${lunchUrlCoursesCount} cours`
                          : '';
                      } else {
                        const categoryCoursesCount = paginatedData.filter(
                          course =>
                            course.categoryid === valueOfCurrentCategorie
                        ).length;
                        return categoryCoursesCount > 0
                          ? `${categoryCoursesCount} cours`
                          : '';
                      }
                    })()}
                  </span>
                </div>
                {showMessage && ressourcesData.length == 0 ? (
                  <div className='no-courses'>
                    <img src={notFound} alt='Aucun cours disponible' />
                    <p>Aucun cours disponible pour le filtre sélectionné.</p>
                    <p>
                      Nous travaillons activement pour ajouter de nouveaux cours
                      dans cette catégorie. Restez à l&apos;écoute !
                    </p>
                    <button
                      onClick={() => {
                        void navigated(routes.catalogue.index);
                      }}
                    >
                      Visitez le catalogue
                    </button>
                  </div>
                ) : (
                  <div className='card-course-detail-container'>
                    {paginatedData.length > 0 ||
                    valueOfCurrentCategorie === -1 ? (
                      <>
                        {currentPage === 1 && valueOfCurrentCategorie === -1 && (
                          <>
                            <CourseCard
                              level='Débutant'
                              language='French'
                              icon={LaptopIcon}
                              sponsorIcon={LaediesActIcon}
                              alt=''
                              isAvailable={true}
                              title='Responsive Web Design'
                              buttonText='Suivre le cours'
                              link='/learn/responsive-web-design/'
                              description={`
                    Ce cours t'apprend les langages HTML pour le contenu et CSS pour la conception, ainsi que la création de pages Web adaptatives pour différentes tailles d'écran.
                  `}
                            />
                            <CourseCard
                              level='Débutant'
                              language='French'
                              icon={AlgoIcon}
                              alt=''
                              isAvailable={true}
                              title='JavaScript Algorithms and Data Structures'
                              buttonText='Suivre le cours'
                              link='/learn/javascript-algorithms-and-data-structures'
                              description={`
                    Ce cours t'enseigne les bases de JavaScript pour rendre les pages interactives, ainsi que les algorithmes et structures de données en JavaScript., etc.
                  `}
                            />
                          </>
                        )}
                        {(valueOfCurrentCategorie === -2 ||
                          valueOfCurrentCategorie === 11 ||
                          valueOfCurrentCategorie === 13 ||
                          valueOfCurrentCategorie === 14) &&
                        paginatedData.length > 0
                          ? paginatedData.map((course, index) => {
                              if ('launch_url' in course) {
                                const courseTyped = course as RavenCourse; // Typage pour les cours Raven
                                const firstCategory = courseTyped.category?.[0];
                                const language =
                                  firstCategory?.tags?.[0]?.title || 'Unknown';

                                if (valueOfCurrentCategorie === -2) {
                                  if (courseTyped.long_description) {
                                    return (
                                      <PathCard
                                        language={language}
                                        key={courseTyped.name}
                                        icon={awsLogo}
                                        isAvailable={true}
                                        title={`${index + 1}. ${
                                          courseTyped.name
                                        }`}
                                        buttonText='Suivre le parcours'
                                        link={courseTyped.launch_url}
                                        description={formatDescription(
                                          courseTyped.long_description
                                        )}
                                        duration={convertTime(
                                          courseTyped.duration
                                        )}
                                        level={
                                          courseTyped.skill_level ===
                                          'Fundamental'
                                            ? 'Débutant'
                                            : ''
                                        }
                                      />
                                    );
                                  } else {
                                    return (
                                      <CourseCard
                                        level={
                                          courseTyped.skill_level ===
                                          'Fundamental'
                                            ? 'Débutant'
                                            : ''
                                        }
                                        language={language}
                                        key={index.toString()}
                                        icon={awsLogo}
                                        isAvailable={true}
                                        title={`${index + 1}. ${
                                          courseTyped.name
                                        }`}
                                        buttonText='Suivre le cours'
                                        link={courseTyped.launch_url}
                                        description={formatDescription(
                                          courseTyped.short_description
                                        )}
                                        duration={convertTime(
                                          courseTyped.duration
                                        )}
                                      />
                                    );
                                  }
                                } else {
                                  return null;
                                }
                              } else {
                                const courseTyped = course as MoodleCourse; // Typage pour les cours Moodle
                                if (
                                  courseTyped.categoryid ===
                                  valueOfCurrentCategorie
                                ) {
                                  return (
                                    <CourseCard
                                      language={courseTyped.langue}
                                      level={courseTyped.level}
                                      key={`${index}-${courseTyped.id}`}
                                      icon={PhBookBookmark} // Remplacer par le chemin réel de l'image
                                      isAvailable={courseTyped.visible === 1}
                                      title={courseTyped.displayname}
                                      buttonText='Suivre le cours'
                                      link={`${moodleBaseUrl}/course/view.php?id=${courseTyped.id}`}
                                      description={courseTyped.summary}
                                      duration={convertTimestampToTime(
                                        courseTyped.duration
                                      )}
                                    />
                                  );
                                } else {
                                  return null;
                                }
                              }
                            })
                          : ''}
                      </>
                    ) : (
                      renderCourseCardSkeletons(6)
                    )}
                  </div>
                )}

                <div className='pagination-container'>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className='pagination-chevron'
                    onClick={() => onNavigueteBackward()}
                  />
                  <span className='pagination__number'>
                    {currentPage}/{totalPages > 0 ? totalPages : 1}
                  </span>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className='pagination-chevron'
                    onClick={() => onNavigateForward()}
                  />
                </div>
                <Spacer size={2} />
              </div>
            </div>
          </div>
        </main>
      </Grid>
    </>
  );
}
CourseByCatalogue.displayName = 'Courses';

export default connect(mapStateToProps, mapDispatchToProps)(CourseByCatalogue);
