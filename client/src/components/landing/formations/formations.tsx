import React from 'react';
import './formation.css';
import { FaAngleDown } from 'react-icons/fa';
import googleLogo from '../../../assets/images/landing/googleLogo.png';
import pythonLogo from '../../../assets/icons/pyton.svg';
import { Image } from '../../../../../tools/ui-components/src/image/image';
import starIcon from '../../../assets/icons/iconeEtoiles.svg';
import clockIcon from '../../../assets/icons/iconeHorloge.svg';

const topics = [
  {
    title: 'Business'
  },
  {
    title: 'Computer Science'
  },
  {
    title: 'Data Science'
  },
  {
    title: 'Health'
  },
  {
    title: 'Information Technology'
  }
];

const courses = [
  {
    title: "Fondamentaux de l'IA Google",
    asset: googleLogo,
    time: '3h 20 min',
    stars: {
      rate: '5.0',
      count: '1k'
    }
  },
  {
    title: 'Python pour tous',
    asset: pythonLogo,
    time: '3h 20 min',
    stars: {
      rate: '5.0',
      count: '1k'
    }
  }
];

function Formations() {
  return (
    <section className='formation'>
      <h2 className='formation__title'>
        Découvre les formations gratuites de Kadea{' '}
        <span className='formation__title-rouge'>Online</span>
      </h2>
      <div className='formation__button_list'>
        {topics.map((topic, i) => (
          <button className='button-list' key={i.valueOf()}>
            {topic.title}
          </button>
        ))}
      </div>
      <div className='trainings-list'>
        {courses.map((course, i) => (
          <div className='training-card' key={i.valueOf()}>
            <div className='training-img'>
              <Image src={course.asset} alt={`${course.title} cover image`} />
            </div>
            <div className='training-details'>
              <h3 className='training-title'>{course.title}</h3>
              <div className='training-stats'>
                <div className='stat'>
                  <Image src={starIcon} alt='Stars icon' />
                  <span>
                    {course.stars.rate} ({course.stars.count})
                  </span>
                </div>
                <div className='stat'>
                  <Image src={clockIcon} alt='Clock icon' />
                  <span>{course.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='more-courses'>
        <span>Plus de cours</span>
        <span className='text-primary'>
          <FaAngleDown />
        </span>
      </div>
    </section>
  );
}

export default Formations;
