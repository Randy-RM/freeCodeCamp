import React from 'react';
import { withTranslation } from 'react-i18next';
import { ProgressBar } from '@freecodecamp/react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { createSelector } from 'reselect';
import { completedChallengesSelector, executeGA } from '../../redux/index';
import { CompletedChallenge } from '../../redux/prop-types';
import {
  makeExpandedBlockSelector,
  toggleBlock
} from '../../templates/Introduction/redux/index';
import './dashboard.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapStateToProps = (state: unknown, ownProps: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const expandedSelector = makeExpandedBlockSelector(ownProps.blockDashedName);

  return createSelector(
    expandedSelector,
    completedChallengesSelector,
    (isExpanded: boolean, completedChallenges: CompletedChallenge[]) => ({
      isExpanded,
      completedChallengeIds: completedChallenges.map(({ id }) => id)
    })
  )(state as Record<string, unknown>);
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ toggleBlock, executeGA }, dispatch);

interface CoursCardProgressProps {
  percentageCompleted: number;
  coursName: string[];
}

export function CoursCardProgress(props: CoursCardProgressProps): JSX.Element {
  const { percentageCompleted, coursName } = props;

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(CoursCardProgress));
