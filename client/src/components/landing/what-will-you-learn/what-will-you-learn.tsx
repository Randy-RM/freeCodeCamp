import React from 'react';
import { Spacer } from '../../../components/helpers';
import LaptopIcon from '../../../assets/images/laptop.svg';
import AlgoIcon from '../../../assets/images/algorithmIcon.svg';

import './what-will-you-learn.css';
import CourseCard from '../../CourseCard/course-card';

interface LandingDetailsProps {
  isSignedIn?: boolean;
}

const WhatWillYouLearn = ({ isSignedIn }: LandingDetailsProps): JSX.Element => {
  return (
    <div className='landing-top'>
      <div>
        <h2 className='big-heading text-love-light text-center'>{`Que vas-tu apprendre ?`}</h2>
        <br />
        <p className='text-responsive text-center'>
          {`
          Si tu es novice en matière de codage, nous te recommandons de commencer par le début.
          `}
        </p>
      </div>
      <Spacer size={2} />
      <div className='card-course-detail-container'>
        <CourseCard
          icon={LaptopIcon}
          isAvailable={true}
          isSignedIn={isSignedIn}
          description={`
                Dans cette formation, tu apprendras les langages que les développeurs 
                utilisent pour créer des pages Web : HTML (Hypertext Markup Language) 
                pour le contenu, et CSS (Cascading Style Sheets) pour la conception. 
                Enfin, tu apprendras à créer des pages Web adaptées à différentes tailles d'écran.
                `}
          title={`Responsive Web Design`}
        />
        <CourseCard
          icon={AlgoIcon}
          isAvailable={false}
          isSignedIn={isSignedIn}
          description={`Alors que HTML et CSS contrôlent le contenu et le style  d'une page, 
                JavaScript est utilisé pour la rendre interactive. Dans le cadre de 
                la certification JavaScript Algorithm and Data Structures, tu apprendras 
                les principes fondamentaux de JavaScript, etc.`}
          title={`JavaScript Algorithms and Data Structures`}
        />
      </div>
    </div>
  );
};

WhatWillYouLearn.displayName = 'WhatWillYouLearn';
export default WhatWillYouLearn;
