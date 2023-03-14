import React, { useEffect, useState } from 'react';
import './courses-card.css';
import CourseCard from '../CourseCard/course-card';
import LaptopIcon from '../../assets/images/laptop.svg';
import AlgoIcon from '../../assets/images/algorithmIcon.svg';
import CloudShield from '../../assets/images/cloudShield.svg';
import PhBookBookmark from '../../assets/images/ph-book-bookmark-thin.svg';
import LaediesActIcon from '../../assets/images/partners/ladies-act-logo.png';
import { Spacer } from '../helpers';
import envData from '../../../../config/env.json';
import { getExternalCoursesCatalog } from '../../utils/ajax';

const { moodleApiBaseUrl, moodleApiToken } = envData;
interface CoursesListProps {
  isSignedIn?: boolean;
}
type MoodleCourse = {
  id: number;
  name: string;
  description: string;
  coursecount: number;
  visible: number;
};

const CoursesList = ({ isSignedIn }: CoursesListProps): JSX.Element => {
  const [moodleCoursesCategories, setMoodleCoursesCategories] =
    useState<MoodleCourse[]>();
  const getMoodleCoursesCategories = async () => {
    const moodleCategoriesCatalogue = await getExternalCoursesCatalog<
      MoodleCourse[]
    >(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `${moodleApiBaseUrl}?wstoken=${moodleApiToken}&wsfunction=core_course_get_categories&moodlewsrestformat=json`
    );
    if (moodleCategoriesCatalogue != null) {
      setMoodleCoursesCategories(moodleCategoriesCatalogue);
    } else {
      setMoodleCoursesCategories([]);
    }
  };

  useEffect(() => {
    void getMoodleCoursesCategories();
  }, []);

  return (
    <div className='landing-top'>
      <div>
        <h2 className='big-heading'>{`Suis nos cours.`}</h2>
        <br />
        <p className='text-responsive'>
          {`
          Concentre-toi sur ce qui est nécessaire pour acquérir une compétence spécifique et applicable. 
          Tu seras mieux outillé pour construire une carrière.
          `}
        </p>
      </div>
      <Spacer />
      <div className='card-course-detail-container'>
        <CourseCard
          icon={LaptopIcon}
          sponsorIcon={LaediesActIcon}
          alt=''
          isAvailable={true}
          isSignedIn={isSignedIn}
          title={`Responsive Web Design`}
          buttonText={`Suivre le cours  `}
          description={`
                Dans cette formation en ligne, tu apprendras les langages que les développeurs 
                utilisent pour créer des pages Web : HTML (Hypertext Markup Language) 
                pour le contenu, et CSS (Cascading Style Sheets) pour la conception. 
                Enfin, tu apprendras à créer des pages Web adaptées à différentes tailles d'écran.
                `}
        />
        <CourseCard
          icon={AlgoIcon}
          alt=''
          isAvailable={false}
          isSignedIn={isSignedIn}
          title={`JavaScript Algorithms and Data Structures`}
          description={`Alors que HTML et CSS contrôlent le contenu et le style  d'une page, 
                JavaScript est utilisé pour la rendre interactive. Dans le cadre de 
                la certification JavaScript Algorithm and Data Structures, tu apprendras 
                les principes fondamentaux de JavaScript, etc.`}
        />
      </div>
      <Spacer />
      <div>
        <h2 className='big-heading'>{`Nos parcours.`}</h2>
        <br />
        <p className='text-responsive'>
          {`
          Nos parcours te permettent d’apprendre par la pratique. Tu gagneras donc un véritable savoir-faire.
          `}
        </p>
      </div>
      <Spacer />
      <div className='card-course-detail-container'>
        <CourseCard
          icon={CloudShield}
          alt=''
          isAvailable={false}
          isSignedIn={isSignedIn}
          title={`Parcours AWS`}
          buttonText={`Suivre le cours  `}
          link={`/aws-courses`}
          description={`Ce parcours est conçu pour montrer aux participants comment 
                  optimiser l'utilisation du cloud AWS grâce à la compréhension 
                  de ces nombreux services et de leur intégration dans la création 
                  de solutions basées sur le cloud.`}
        />

        {moodleCoursesCategories &&
          moodleCoursesCategories.length >= 0 &&
          moodleCoursesCategories.map((category, index) => {
            return (
              <>
                <CourseCard
                  key={category.id + index}
                  icon={PhBookBookmark}
                  isAvailable={category.visible == 1}
                  isSignedIn={isSignedIn}
                  title={category.name.replace(/&amp;/g, 'et')}
                  buttonText={`Suivre le parcours  `}
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  link={`/learning-path/${category.name
                    .replace(/ /g, '-')
                    .replace(/&amp;/g, 'et')}/${category.id}`}
                  description={category.description}
                />
              </>
            );
          })}
      </div>
    </div>
  );
};

CoursesList.displayName = 'CoursesList';
export default CoursesList;
