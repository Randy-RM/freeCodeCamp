import React from 'react';
import { ProgressBar } from '@freecodecamp/react-bootstrap';
import './dashboard.css';

interface CoursCardProgressProps {
  challengeCount: number;
  completedChallengeCount: number;
  coursName: string;
  superBlockPath: string;
}

export function CoursCardProgress(props: CoursCardProgressProps): JSX.Element {
  const { challengeCount, completedChallengeCount, coursName } = props;

  const percentageCompleted: number =
    completedChallengeCount && challengeCount
      ? Math.floor((completedChallengeCount / challengeCount) * 100)
      : 0;

  return (
    <>
      <div className='cours-card-progress bg-light p-4'>
        <small className='text-love-light fw-bold'>
          Cours
          <br />
        </small>
        <div className='cours-card-content'>
          <div className='cours-card-content-left'>
            <h3 className='display-inlin'>{coursName}</h3>
          </div>
          <div className='cours-card-content-right hide-on-mobile'>
            <small>
              <span className='cours-card-progress-btn'>
                Continuer le cours
              </span>
            </small>
          </div>
        </div>
        <div>
          <small className='fw-bold'>
            {`${percentageCompleted}% ${
              percentageCompleted === 0 || percentageCompleted === 1
                ? 'achevé'
                : 'achevés'
            }`}
            <br />
          </small>
          <ProgressBar now={percentageCompleted} animated={'true'} />
        </div>
        <div className='show-on-mobile'>
          <small>
            <span className='cours-card-progress-btn'>Continuer le cours</span>
          </small>
        </div>
      </div>
    </>
  );
}

CoursCardProgress.displayName = 'CoursCardProgress';

export default CoursCardProgress;
