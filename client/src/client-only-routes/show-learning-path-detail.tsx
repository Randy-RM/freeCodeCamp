import React, { useState, useEffect } from 'react';
import { useParams } from '@reach/router';
import { Grid, Row, Col } from '@freecodecamp/react-bootstrap';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getExternalResource } from '../utils/ajax';

import { createFlashMessage } from '../components/Flash/redux';
import {
  Loader,
  Spacer,
  renderCourseCardSkeletons
} from '../components/helpers';
import CourseCard from '../components/CourseCard/course-card';
import PhBookBookmark from '../assets/images/ph-book-bookmark-thin.svg';

import {
  signInLoadingSelector,
  userSelector,
  isSignedInSelector,
  hardGoTo as navigate
} from '../redux';

import { User } from '../redux/prop-types';
import envData from '../../../config/env.json';

const { apiLocation, moodleBaseUrl, moodleApiBaseUrl, moodleApiToken } =
  envData;

// TODO: update types for actions
interface ShowLearningPathDetailProps {
  createFlashMessage: typeof createFlashMessage;
  isSignedIn: boolean;
  navigate: (location: string) => void;
  showLoading: boolean;
  user: User;
  path?: string;
  location?: { state: { description: string } };
}

type MoodleCourse = {
  id: number;
  shortname: string;
  categoryid: number;
  categorysortorder: number;
  fullname: string;
  displayname: string;
  summary: string;
  visible: number;
};

type MoodleCoursesCatalogue = {
  courses: MoodleCourse[];
};

const mapStateToProps = createSelector(
  signInLoadingSelector,
  userSelector,
  isSignedInSelector,
  (showLoading: boolean, user: User, isSignedIn) => ({
    showLoading,
    user,
    isSignedIn
  })
);

const mapDispatchToProps = {
  createFlashMessage,
  navigate
};

export function ShowLearningPathDetail(
  props: ShowLearningPathDetailProps
): JSX.Element {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { showLoading, isSignedIn, location } = props;
  const params: Record<string, undefined> = useParams();
  const [moodleCourses, setMoodleCourses] = useState<MoodleCourse[]>();
  const [isDataOnLoading, setIsDataOnLoading] = useState<boolean>(true);

  const categoryName: string | undefined =
    'category' in params ? params.category : '';
  const categoryId: string | undefined =
    'categoryId' in params ? params.categoryId : '';

  const getMoodleCourses = async () => {
    const moodleCatalogue = await getExternalResource<MoodleCoursesCatalogue>(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `${moodleApiBaseUrl}?wstoken=${moodleApiToken}&wsfunction=core_course_get_courses_by_field&field=category&value=${categoryId}&moodlewsrestformat=json`
    );
    if (moodleCatalogue != null) {
      setMoodleCourses(
        moodleCatalogue.courses.filter(moodleCourse => {
          return moodleCourse.visible == 1;
        })
      );
    } else {
      setMoodleCourses([]);
    }
  };

  useEffect(() => {
    void getMoodleCourses();
    const timer = setTimeout(() => {
      if (isDataOnLoading) {
        setIsDataOnLoading(false);
      }
    }, 3000);
    return () => {
      setMoodleCourses([]); // cleanup useEffect to perform a React state update
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (showLoading) {
    return <Loader fullScreen={true} />;
  }

  if (!isSignedIn) {
    navigate(`${apiLocation}/signin`);
    return <Loader fullScreen={true} />;
  }

  // Définir un type pour les clés valides de courseDescriptions
  type CourseCategory =
    | 'Développement Web'
    | 'Design'
    | 'Bureautique'
    | 'Marketing'
    | 'Communication'
    | 'artificielle';

  const courseDescriptions: Record<CourseCategory, string> = {
    'Développement Web': `
    Dans ce parcours, tu apprendras les langages que les développeurs 
    utilisent pour créer des pages Web : HTML (Hypertext Markup Language) 
    pour le contenu, et CSS (Cascading Style Sheets) pour la conception. 
    Ensuite, tu apprendras à créer des pages Web adaptées à différentes tailles d'écran et
    enfin, Tu vas utiliser le JavaScript pour rendre tes sites interactifs. 
    Tu apprendras les Algorithm, Data Structures, et les principes fondamentaux du langage de programmation JavaScript.
  `,
    Design: `
    Dans ce parcours, tu apprendras les principes fondamentaux du design, y compris la typographie, la théorie des couleurs, et la mise en page.
    Tu utiliseras des outils tels que Figma et Adobe XD pour créer des maquettes et des prototypes de haute qualité. 
    En outre, tu apprendras à collaborer avec des développeurs pour transformer tes conceptions en produits réels.
  `,
    Bureautique: `
    Notre parcours complet de bureautique vous accompagne pas à pas, du niveau débutant à expert, pour maîtriser Word, Excel, PowerPoint, Outlook et OneNote. Grâce à nos cours en ligne interactifs et à nos exercices pratiques, vous acquerrez les compétences nécessaires pour créer des documents impeccables, analyser des données complexes et gérer efficacement votre boîte mail. À la fin de ce parcours, vous serez certifié et prêt à relever tous les défis de votre vie professionnelle.
  `,
    Marketing: `
    Notre parcours complet vous offre une formation pratique et intensive aux outils et techniques les plus efficaces du marketing digital. Vous apprendrez à créer une stratégie de contenu engageante, à optimiser votre site web pour les moteurs de recherche, à gérer votre communauté sur les réseaux sociaux et à mesurer la performance de vos campagnes. À l'issue de cette formation, vous serez capable de développer votre propre business en ligne ou de piloter les actions marketing d'une entreprise.
  `,
    Communication: `
    Dans ce parcours, vous apprendrez les techniques de communication efficaces pour transmettre des messages clairs et percutants. Vous découvrirez comment créer des présentations impactantes, gérer les relations publiques et utiliser les médias sociaux pour améliorer votre visibilité. Vous développerez des compétences pour communiquer avec divers publics et dans différents contextes professionnels.
  `,
    artificielle: `
    Ce parcours vous plongera dans l'univers fascinant de l'intelligence artificielle. Vous apprendrez les bases des algorithmes d'apprentissage automatique, le traitement du langage naturel, et la reconnaissance d'images. Vous explorerez des outils comme TensorFlow et PyTorch pour créer et entraîner des modèles d'IA. À la fin de ce parcours, vous serez capable de mettre en œuvre des solutions d'IA innovantes dans divers contextes.
  `
  };

  function getDescriptionByCategory(categoryName: string | null): string {
    const lowerCategoryName = categoryName?.toLowerCase() || '';

    if (lowerCategoryName.includes('marketing')) {
      return courseDescriptions['Marketing'];
    } else if (lowerCategoryName.includes('communication')) {
      return courseDescriptions['Communication'];
    } else if (lowerCategoryName.includes('artificielle')) {
      return courseDescriptions['artificielle'];
    } else {
      const validCategoryName = categoryName as CourseCategory;
      return courseDescriptions[validCategoryName] || '.';
    }
  }

  return (
    <>
      <Helmet
        title={`${
          categoryName ? categoryName.replace(/-/g, ' ') : ''
        } | Kadea Online`}
      />
      <Grid fluid={false} className='bg-light'>
        <Spacer size={1} />
        <div>
          <Row className='super-block-intro-page'>
            <Col md={12} sm={12} xs={12}>
              <p className='text-love-light fw-bold'>Parcours</p>
              <h1 className='big-heading'>
                {categoryName ? categoryName.replace(/-/g, ' ') : ''}
              </h1>
              <Spacer size={1} />
            </Col>
            <Col className='' md={12} sm={12} xs={12}>
              <div className='alert bg-secondary standard-radius-5'>
                {/* {location && location.state && location.state.description && (
                  <div
                    className='text-responsive'
                    dangerouslySetInnerHTML={{
                      __html: location.state.description
                    }}
                  >ma</div>
                )} */}
                <p className='parcours-description'>
                  {getDescriptionByCategory(categoryName || '')}
                </p>
              </div>
            </Col>
            <Spacer />
          </Row>
        </div>
      </Grid>

      <Grid fluid={false}>
        <Spacer size={1} />
        <Row>
          <Col md={12} sm={12} xs={12}>
            <h2 className='big-subheading'>{`Cours`}</h2>
            <Spacer size={2} />
          </Col>
          <Col className='' md={12} sm={12} xs={12}>
            {!isDataOnLoading ? (
              <div>
                {moodleCourses && moodleCourses.length > 0 ? (
                  <div className='card-course-detail-container'>
                    {moodleCourses.map((course, index) => {
                      return (
                        <CourseCard
                          key={index + course.id}
                          icon={PhBookBookmark}
                          isAvailable={course.visible == 1}
                          isSignedIn={isSignedIn}
                          sameTab={true}
                          external={true}
                          title={`${course.displayname}`}
                          buttonText={`Suivre le cours  `}
                          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                          link={`${moodleBaseUrl}/course/view.php?id=${course.id}`}
                          description={course.summary}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <>
                    <div className='block-ui bg-secondary'>
                      <p className='h3'>{`Aucun cours pour l'instant`}</p>
                    </div>
                    <Spacer size={1} />
                  </>
                )}
              </div>
            ) : (
              <div className='card-course-detail-container'>
                {renderCourseCardSkeletons(6)}
              </div>
            )}
          </Col>
        </Row>
      </Grid>
    </>
  );
}

ShowLearningPathDetail.displayName = 'ShowLearningPathDetail';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowLearningPathDetail);
