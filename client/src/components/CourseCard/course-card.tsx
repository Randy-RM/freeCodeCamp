import React from 'react';
import envData from '../../../../config/env.json';
import PlayIcon from '../../assets/images/play.svg';

import Map from '../Map/index';
import { Link } from '../helpers';

import './course-card.css';

const { apiLocation } = envData;

interface LandingDetailsProps {
  isSignedIn?: boolean;
  isAvailable: boolean;
  description?: string;
  title: string;
  icon?: string;
  sponsorIcon?: string;
  alt?: string;
  buttonText?: string;
  link?: string;
}

const CourseCard = ({
  isSignedIn,
  isAvailable,
  description,
  title,
  icon,
  sponsorIcon,
  alt,
  buttonText,
  link
}: LandingDetailsProps): JSX.Element => {
  return (
    <div className='card-course-detail-back standard-radius-5 card-outlin-border bg-light'>
      <div className='card-course-detail-unit position-relative'>
        <div className='card-outlin-border bg-light standard-radius-5'>
          <div className='card-course-detail-header'>
            {sponsorIcon && (
              <div className='card-course-detail-logo-sponsor pull'>
                <img src={sponsorIcon} alt='' className='img-fluid' />
              </div>
            )}
            <div className='card-course-detail-logo push hide-small'>
              <img src={icon} alt={alt} className='img-fluid' />
            </div>
          </div>
          <div className='card-course-detail-item'>
            <h4 className='fw-bold text-love-light'>{title}</h4>
          </div>
          <div className='card-course-detail-item  flexible'>
            <p className='text-responsive'>{description}</p>
          </div>
          <div className='card-course-detail-footer'>
            <div className='push'>
              {isAvailable ? (
                isSignedIn ? (
                  <>
                    {link ? (
                      <Link
                        to={link}
                        className='link-course text-love-light fw-semi-bold text-responsive'
                      >
                        <div className='row-link'>
                          <div className='row-link-text'>{buttonText}</div>
                          <div>
                            <img
                              src={PlayIcon}
                              alt='Laptop icon'
                              className='play'
                            />
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <Map
                        forLanding={true}
                        single={true}
                        className='link-course text-love-light fw-semi-bold text-responsive'
                        keyPrefix='landing-details'
                      >
                        <div className='row-link'>
                          <div className='row-link-text'>{buttonText}</div>
                          <div>
                            <img
                              src={PlayIcon}
                              alt='Laptop icon'
                              className='play'
                            />
                          </div>
                        </div>
                      </Map>
                    )}
                  </>
                ) : (
                  <a
                    href={`${apiLocation}/signin`}
                    className='link-course text-love-light fw-semi-bold text-responsive'
                  >
                    <div className='row-link'>
                      <div className='row-link-text'>{buttonText}</div>
                      <div>
                        <img
                          src={PlayIcon}
                          alt='Laptop icon'
                          className='play'
                        />
                      </div>
                    </div>
                  </a>
                )
              ) : (
                <span className='push text-love-light fw-semi-bold text-responsive'>
                  Bientôt disponible
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CourseCard.displayName = 'CourseCard';
export default CourseCard;
