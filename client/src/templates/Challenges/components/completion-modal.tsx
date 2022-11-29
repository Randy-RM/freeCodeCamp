/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Button, Modal } from '@freecodecamp/react-bootstrap';
import { useStaticQuery, graphql } from 'gatsby';
import { noop } from 'lodash-es';
import React, { Component } from 'react';
import { TFunction, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createSelector } from 'reselect';

import { dasherize } from '../../../../../utils/slugs';
import { isProject } from '../../../../utils/challenge-types';
import Login from '../../../components/Header/components/Login';
import {
  isSignedInSelector,
  executeGA,
  allowBlockDonationRequests
  // eslint-disable-next-line import/no-duplicates
} from '../../../redux';

import {
  AllChallengeNode,
  ChallengeFiles,
  User
} from '../../../redux/prop-types';

import {
  closeModal,
  submitChallenge,
  completedChallengesIds,
  isCompletionModalOpenSelector,
  successMessageSelector,
  challengeFilesSelector,
  challengeMetaSelector
} from '../redux';
// eslint-disable-next-line import/no-duplicates
import { userSelector } from '../../../redux';
import { Link } from '../../../components/helpers';
import CompletionModalBody from './completion-modal-body';

import './completion-modal.css';

const mapStateToProps = createSelector(
  challengeFilesSelector,
  challengeMetaSelector,
  completedChallengesIds,
  isCompletionModalOpenSelector,
  isSignedInSelector,
  successMessageSelector,
  userSelector,
  (
    challengeFiles: ChallengeFiles,
    {
      title,
      id,
      challengeType
    }: { title: string; id: string; challengeType: number },
    completedChallengesIds: string[],
    isOpen: boolean,
    isSignedIn: boolean,
    message: string,
    user: User
  ) => ({
    challengeFiles,
    title,
    id,
    challengeType,
    completedChallengesIds,
    isOpen,
    isSignedIn,
    message,
    user
  })
);

const mapDispatchToProps = function (dispatch: Dispatch) {
  const dispatchers = {
    close: () => dispatch(closeModal('completion')),
    submitChallenge: () => {
      dispatch(submitChallenge());
    },
    allowBlockDonationRequests: (block: string) => {
      dispatch(allowBlockDonationRequests(block));
    },
    executeGA
  };
  return () => dispatchers;
};

export function getCompletedPercent(
  completedChallengesIds: string[] = [],
  currentBlockIds: string[] = [],
  currentChallengeId: string
): number {
  completedChallengesIds = completedChallengesIds.includes(currentChallengeId)
    ? completedChallengesIds
    : [...completedChallengesIds, currentChallengeId];

  const completedChallengesInBlock = completedChallengesIds.filter(id => {
    return currentBlockIds.includes(id);
  });

  const completedPercent = Math.round(
    (completedChallengesInBlock.length / currentBlockIds.length) * 100
  );

  return completedPercent > 100 ? 100 : completedPercent;
}

export function countChallengeBlocks(
  superBlockChallengeIds?: string[],
  completedChallengeIds?: string[]
): number {
  let completedChallengeCount = 0;
  if (
    superBlockChallengeIds &&
    completedChallengeIds &&
    completedChallengeIds.length > 0
  ) {
    for (const ChallengeId of superBlockChallengeIds) {
      if (completedChallengeIds.includes(ChallengeId)) {
        completedChallengeCount++;
      }
    }
  }
  return completedChallengeCount;
}

interface CompletionModalsProps {
  allowBlockDonationRequests: (arg0: string) => void;
  user: User;
  block: string;
  blockName: string;
  certification: string;
  challengeType: number;
  close: () => void;
  completedChallengesIds: string[];
  currentBlockIds?: string[];
  superBlockChallengeIds?: string[];
  executeGA: () => void;
  challengeFiles: ChallengeFiles;
  id: string;
  isOpen: boolean;
  isSignedIn: boolean;
  message: string;
  submitChallenge: () => void;
  superBlock: string;
  t: TFunction;
  title: string;
}

interface CompletionModalInnerState {
  downloadURL: null | string;
  completedPercent: number;
}

export class CompletionModalInner extends Component<
  CompletionModalsProps,
  CompletionModalInnerState
> {
  constructor(props: CompletionModalsProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);

    this.state = {
      downloadURL: null,
      completedPercent: 0
    };
  }

  static getDerivedStateFromProps(
    props: CompletionModalsProps,
    state: CompletionModalInnerState
  ): CompletionModalInnerState {
    const { challengeFiles, isOpen } = props;
    if (!isOpen) {
      return { downloadURL: null, completedPercent: 0 };
    }
    const { downloadURL } = state;
    if (downloadURL) {
      URL.revokeObjectURL(downloadURL);
    }
    let newURL = null;
    if (challengeFiles?.length) {
      const filesForDownload = challengeFiles
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .reduce<string>((allFiles, currentFile: any) => {
          const beforeText = `** start of ${currentFile.path} **\n\n`;
          const afterText = `\n\n** end of ${currentFile.path} **\n\n`;
          allFiles +=
            challengeFiles.length > 1
              ? `${beforeText}${currentFile.contents}${afterText}`
              : currentFile.contents;
          return allFiles;
        }, '');
      const blob = new Blob([filesForDownload], {
        type: 'text/json'
      });
      newURL = URL.createObjectURL(blob);
    }

    const { completedChallengesIds, currentBlockIds, id, isSignedIn } = props;
    const completedPercent = isSignedIn
      ? getCompletedPercent(completedChallengesIds, currentBlockIds, id)
      : 0;
    return { downloadURL: newURL, completedPercent: completedPercent };
  }

  handleKeypress(e: React.KeyboardEvent): void {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      // Since Hotkeys also listens to Ctrl + Enter we have to stop this event
      // getting to it.
      e.stopPropagation();
      this.handleSubmit();
    }
  }

  handleSubmit(): void {
    this.props.submitChallenge();
    this.checkBlockCompletion();
  }

  // check block completion for donation
  checkBlockCompletion(): void {
    if (
      this.state.completedPercent === 100 &&
      !this.props.completedChallengesIds.includes(this.props.id)
    ) {
      this.props.allowBlockDonationRequests(this.props.blockName);
    }
  }

  componentWillUnmount(): void {
    if (this.state.downloadURL) {
      URL.revokeObjectURL(this.state.downloadURL);
    }
    this.props.close();
  }

  render(): JSX.Element {
    const {
      block,
      close,
      isOpen,
      // title,
      isSignedIn,
      superBlock = ''
    } = this.props;

    const { completedPercent } = this.state;
    console.log(
      'Completion Modal props superBlockChallengeIds :',
      this.props.superBlockChallengeIds
    );

    console.log(
      'completed : ',
      countChallengeBlocks(
        this.props.superBlockChallengeIds,
        this.props.completedChallengesIds
      )
    );

    // if (this.props) {
    //   console.log('Completion Modal Props :', this.props);
    //   console.log('Completion Modal State :', this.state);
    // }

    if (isOpen) {
      executeGA({ type: 'modal', data: '/completion-modal' });
    }
    // normally dashedName should be graphQL queried and then passed around,
    // but it's only used to make a nice filename for downloading, so dasherize
    // is fine here.
    // const dashedName = dasherize(title);
    return (
      <Modal
        animation={false}
        bsSize='lg'
        dialogClassName='challenge-success-modal'
        keyboard={true}
        onHide={close}
        // eslint-disable-next-line @typescript-eslint/unbound-method
        onKeyDown={isOpen ? this.handleKeypress : noop}
        show={isOpen}
      >
        <Modal.Header
          className='challenge-list-header fcc-modal completion-header'
          closeButton={true}
        >
          <Modal.Title className='completion-message'>
            {'Félicitations !'}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className='completion-modal-body bg-light'>
          <CompletionModalBody
            block={block}
            completedPercent={completedPercent}
            superBlock={superBlock}
          />
        </Modal.Body>

        <Modal.Footer className='bg-light'>
          {isSignedIn ? null : (
            <Login block={true}>
              {'Connectez-vous pour enregistrer votre progression'}
            </Login>
          )}
          <Button
            className='action-btn btn-primary mb-1'
            block={true}
            bsSize='large'
            bsStyle='primary'
            onClick={() => this.handleSubmit()}
          >
            {isSignedIn
              ? 'Soumettre et passer au défi suivant'
              : 'Passez au défi suivant'}
            <span className='hidden-xs'> (Ctrl + Enter)</span>
          </Button>
          {/* {this.state.downloadURL ? (
            <Button
              className='action-btn btn-secondary'
              block={true}
              bsSize='lg'
              bsStyle='primary'
              download={`${dashedName}.txt`}
              href={this.state.downloadURL}
            >
              {'Télécharger ma solution'}
            </Button>
          ) : null} */}
          <Link
            to='https://www.kinshasadigital.academy/inscription'
            external={true}
            sameTab={false}
            className='link-resset-style'
          >
            <Button
              className='action-btn btn-secondary'
              block={true}
              bsSize='lg'
              bsStyle='primary'
            >
              {'Rejoignez notre académie ici'}
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    );
  }
}

interface Options {
  isCertificationBlock: boolean;
}

interface CertificateNode {
  challenge: {
    // TODO: use enum
    certification: string;
    tests: { id: string }[];
  };
}

const useCurrentBlockIds = (
  block: string,
  certification: string,
  superBlock: string,
  options?: Options
) => {
  const {
    allChallengeNode: { edges: challengeEdges },
    allCertificateNode: { nodes: certificateNodes }
  }: {
    allChallengeNode: AllChallengeNode;
    allCertificateNode: { nodes: CertificateNode[] };
  } = useStaticQuery(graphql`
    query getCurrentBlockNodes {
      allChallengeNode(
        sort: {
          fields: [
            challenge___superOrder
            challenge___order
            challenge___challengeOrder
          ]
        }
      ) {
        edges {
          node {
            challenge {
              id
              block
              challengeType
              title
              order
              superBlock
              dashedName
              fields {
                slug
                blockName
              }
            }
          }
        }
      }
      allCertificateNode {
        nodes {
          challenge {
            certification
            tests {
              id
            }
          }
        }
      }
    }
  `);

  const currentCertificateIds = certificateNodes
    .filter(
      node => dasherize(node.challenge.certification) === certification
    )[0]
    ?.challenge.tests.map(test => test.id);

  const currentBlockIds = challengeEdges
    .filter(edge => edge.node.challenge.block === block)
    .map(edge => edge.node.challenge.id);

  const currentSuperBlockChallenge = challengeEdges
    .filter(edge => edge.node.challenge.superBlock === superBlock)
    .map(edge => edge.node.challenge.id);

  return options?.isCertificationBlock
    ? {
        currentBlockIds: currentCertificateIds,
        superBlockChallenges: currentCertificateIds
      }
    : {
        currentBlockIds: currentBlockIds,
        superBlockChallenges: currentSuperBlockChallenge
      };
};

const CompletionModal = (props: CompletionModalsProps) => {
  const currentBlockIds = useCurrentBlockIds(
    props.block || '',
    props.certification || '',
    props.superBlock || '',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    { isCertificationBlock: isProject(props.challengeType) }
  );
  console.log('Completion modal props :', props);
  console.log(
    'superBlockChallenges challengeEdges :',
    currentBlockIds.superBlockChallenges
  );
  return (
    <CompletionModalInner
      currentBlockIds={currentBlockIds.currentBlockIds}
      superBlockChallengeIds={currentBlockIds.superBlockChallenges}
      {...props}
    />
  );
};

CompletionModal.displayName = 'CompletionModal';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(CompletionModal));
