import React from 'react';
import './courses-card.css';
import CourseCard from '../CourseCard/course-card';
import LaptopIcon from '../../assets/images/laptop.svg';
import AlgoIcon from '../../assets/images/algorithmIcon.svg';
import { Spacer } from '../helpers';

interface CoursesListProps {
  isSignedIn?: boolean;
}
const CoursesList = ({ isSignedIn }: CoursesListProps): JSX.Element => {
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
          isAvailable={true}
          isSignedIn={isSignedIn}
          title={`Responsive Web Design`}
          buttonText={`Suivre le cours  `}
          description={`
                Dans cette formation, tu apprendras les langages que les développeurs 
                utilisent pour créer des pages Web : HTML (Hypertext Markup Language) 
                pour le contenu, et CSS (Cascading Style Sheets) pour la conception. 
                Enfin, tu apprendras à créer des pages Web adaptées à différentes tailles d'écran.
                `}
        />
        <CourseCard
          icon={AlgoIcon}
          isAvailable={false}
          isSignedIn={isSignedIn}
          title={`JavaScript Algorithms and Data Structures`}
          description={`Alors que HTML et CSS contrôlent le contenu et le style  d'une page, 
                JavaScript est utilisé pour la rendre interactive. Dans le cadre de 
                la certification JavaScript Algorithm and Data Structures, tu apprendras 
                les principes fondamentaux de JavaScript, etc.`}
        />
        <CourseCard
          isAvailable={false}
          isSignedIn={isSignedIn}
          title={`AWS Cours`}
          buttonText={`Suivre le cours  `}
          link={`/aws-courses`}
          description={`Ce cours est conçu pour montrer aux participants comment 
                  optimiser l'utilisation du cloud AWS grâce à la compréhension 
                  de ces nombreux services et de leur intégration dans la création 
                  de solutions basées sur le cloud.`}
        />
      </div>
    </div>
  );
};

CoursesList.displayName = 'CoursesList';
export default CoursesList;
