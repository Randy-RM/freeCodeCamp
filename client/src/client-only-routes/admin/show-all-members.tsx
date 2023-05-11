import { Row, Col, Table } from '@freecodecamp/react-bootstrap';
import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
// import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { getDatabaseResource, getExternalResource } from '../../utils/ajax';
import envData from '../../../../config/env.json';
import { createFlashMessage } from '../../components/Flash/redux';
import { Loader, Spacer } from '../../components/helpers';
import { CourseProgressBar } from '../../components/AdminComponents/course-progress-bar';

import {
  signInLoadingSelector,
  userSelector,
  isSignedInSelector,
  hardGoTo as navigate
} from '../../redux';

import { CurrentSuperBlock, User } from '../../redux/prop-types';
import './admin-global.css';

const { apiLocation, homeLocation, moodleApiBaseUrl, moodleApiToken } = envData;

// TODO: update types for actions
interface ShowAllMembersProps {
  createFlashMessage: typeof createFlashMessage;
  isSignedIn: boolean;
  navigate: (location: string) => void;
  showLoading: boolean;
  user: User;
  path?: string;
}

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

type Member = {
  id: string;
  email: string;
  name: string;
  gender: string;
  currentsSuperBlock: CurrentSuperBlock[];
};

type UserList = {
  userList: Member[];
  totalPages: number;
  currentPage: number;
  countUsers: number;
};

export function ShowAllMembers(props: ShowAllMembersProps): JSX.Element {
  const { isSignedIn, navigate, showLoading, user } = props;

  const [members, setMembers] = useState<Member[]>();
  const [currentMember, setCurrentMember] = useState<Member | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [countUsers, setCountUsers] = useState<number>();

  const getMembers = async () => {
    const memberList = await getDatabaseResource<UserList>(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `/all-users?page=${currentPage}&limit=10`
    );
    if (memberList != null) {
      setMembers(memberList.userList);
      setCountUsers(memberList.countUsers);
      if (totalPages == 0) {
        setTotalPages(Number(memberList.totalPages));
        setCurrentPage(Number(memberList.currentPage));
      }
    } else {
      setMembers([]);
    }
  };

  const showMemberDetails = (member: Member | null) => {
    setCurrentMember(member);
  };

  const returnToTable = () => {
    setCurrentMember(null);
  };

  const navigateToPage = (forwardOrBackward: boolean) => {
    if (forwardOrBackward) {
      if (currentPage < totalPages) {
        setCurrentPage(Number(currentPage + 1));
        void getMembers();
      }
    } else {
      if (currentPage > 1) {
        setCurrentPage(Number(currentPage - 1));
        void getMembers();
      }
    }
  };

  useEffect(() => {
    void getMembers();
    return () => {
      setMembers([]); // cleanup useEffect to perform a React state update
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  if (showLoading) {
    return <Loader fullScreen={true} />;
  }

  if (!isSignedIn) {
    navigate(`${apiLocation}/signin`);
    return <Loader fullScreen={true} />;
  }

  // if (!user.email.endsWith('@kinshasadigital.com')) {
  //   navigate(`${homeLocation}`);
  //   return <Loader fullScreen={true} />;
  // }

  if (!user.email.endsWith('@kadea.co')) {
    navigate(`${homeLocation}`);
    return <Loader fullScreen={true} />;
  }

  return (
    <>
      <Helmet title={`Tableau de bord - Membres | Kadea Online`} />

      <div className=''>
        <Row>
          <Col md={12} sm={12} xs={12}>
            <div className=''>
              <h1
                className='big-subheading'
                style={{ overflowWrap: 'break-word' }}
              >
                {!currentMember ? 'Membres' : 'Détail membre'}
              </h1>
            </div>
          </Col>
        </Row>
        <Spacer size={1} />
        {!currentMember ? (
          <TableMembers
            members={members}
            countUsers={countUsers}
            currentPage={currentPage}
            totalPages={totalPages}
            navigateToPage={navigateToPage}
            showMemberDetails={showMemberDetails}
          />
        ) : (
          <DetailMember member={currentMember} returnToTable={returnToTable} />
        )}
        <Spacer size={1} />
      </div>
    </>
  );
}

interface TableMembersProps {
  members?: Member[];
  countUsers?: number;
  currentPage: number;
  totalPages: number;
  showMemberDetails: (member: Member) => void;
  navigateToPage: (forwardOrBackward: boolean) => void;
}

export function TableMembers(props: TableMembersProps): JSX.Element {
  const {
    members,
    countUsers,
    navigateToPage,
    currentPage,
    totalPages,
    showMemberDetails
  } = props;

  return (
    <Row>
      <Col md={4} sm={12} xs={12}>
        <div className='section-block-padding bg-secondary stat-card'>
          <p>
            <span className='fw-bold'>{`Nombre total d'utilisateurs`}</span>
            <br />
            <span className='h1 fw-bold'>{countUsers}</span>
          </p>
          <p>
            <FontAwesomeIcon icon={faUsers} className='icon-big' />
          </p>
        </div>
        <Spacer size={1} />
      </Col>

      <Col md={12} sm={12} xs={12}>
        <div className=''>
          {members && members.length > 0 ? (
            <Table responsive hover>
              <thead className='bg-dark-gray'>
                <tr>
                  <th className='text-light'>Email</th>
                  <th className='text-light'>Nom</th>
                  {/* <th className='text-light'>Genre</th> */}
                  <th className='text-light'>Responsive Web Design Progrès</th>
                  <th className='text-light'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, index) => {
                  const responsiveWebDesignBlock =
                    member.currentsSuperBlock.find(superBlock => {
                      return (
                        superBlock.superBlockDashedName ==
                        'responsive-web-design'
                      );
                    });

                  const percentageCompleted: number =
                    responsiveWebDesignBlock &&
                    responsiveWebDesignBlock.totalCompletedChallenges &&
                    responsiveWebDesignBlock.totalChallenges
                      ? Math.floor(
                          (responsiveWebDesignBlock.totalCompletedChallenges /
                            responsiveWebDesignBlock.totalChallenges) *
                            100
                        )
                      : 0;

                  return (
                    <tr key={index}>
                      <td style={{ verticalAlign: 'middle' }}>
                        {member.email}
                      </td>
                      <td style={{ verticalAlign: 'middle' }}>{member.name}</td>
                      {/* <td style={{ verticalAlign: 'middle' }}>
                        {member.gender}
                      </td> */}
                      <td style={{ verticalAlign: 'middle' }}>
                        {responsiveWebDesignBlock ? (
                          <div
                            className='progress-bar-wrap custom-progress-bloc standard-radius-5'
                            aria-label={`${percentageCompleted}`}
                          >
                            <div
                              className='progress-bar-background custom-progress-bloc standard-radius-5'
                              aria-hidden='true'
                            >
                              {`${percentageCompleted}%`}
                            </div>
                            <div
                              aria-hidden='true'
                              className='progress-bar-percent custom-progress-bloc standard-radius-5'
                              data-testid='fcc-progress-bar-percent'
                              style={{ width: `${percentageCompleted}%` }}
                            >
                              <div className='progress-bar-foreground custom-progress-bloc'>
                                {`${percentageCompleted}%`}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div
                            className='progress-bar-wrap custom-progress-bloc standard-radius-5'
                            aria-label={`${percentageCompleted}`}
                          >
                            <div
                              className='progress-bar-background custom-progress-bloc standard-radius-5'
                              aria-hidden='true'
                            >
                              {`${percentageCompleted}%`}
                            </div>
                            <div
                              aria-hidden='true'
                              className='progress-bar-percent custom-progress-bloc standard-radius-5'
                              data-testid='fcc-progress-bar-percent'
                              style={{ width: `${percentageCompleted}%` }}
                            >
                              <div className='progress-bar-foreground custom-progress-bloc'>
                                {`${percentageCompleted}%`}
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                      <td style={{ verticalAlign: 'middle' }}>
                        <button
                          className='action-btn-detail'
                          onClick={() => {
                            showMemberDetails(member);
                          }}
                        >
                          Voir plus
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <Table striped responsive hover>
              <thead className='bg-dark-gray'>
                <tr>
                  <th className='text-light'></th>
                  <th className='text-light'></th>
                  <th className='text-light'></th>
                  <th className='text-light'></th>
                  <th className='text-light'></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          )}
        </div>
      </Col>
      <Col md={12} sm={12} xs={12}>
        {currentPage > 1 && (
          <FontAwesomeIcon
            icon={faChevronLeft}
            className='pagination-chevron'
            onClick={() => {
              navigateToPage(false);
            }}
          />
        )}
        &nbsp;
        {`  ${currentPage} sur ${totalPages}  `}
        &nbsp;
        {currentPage < totalPages && (
          <FontAwesomeIcon
            icon={faChevronRight}
            className='pagination-chevron'
            onClick={() => {
              navigateToPage(true);
            }}
          />
        )}
      </Col>
    </Row>
  );
}

interface MemberProps {
  member?: Member;
  returnToTable: () => void;
}

type MoodleUser = {
  id: number;
  email: string;
};

type MoodleCourse = {
  id: number;
  displayname: string;
  progress: number;
};

export function DetailMember(props: MemberProps): JSX.Element {
  const { member, returnToTable } = props;

  const [moodleCourses, setMoodleCourses] = useState<MoodleCourse[] | null>();

  const getMoodleProgressCourses = async () => {
    const moodleUser = await getExternalResource<MoodleUser[]>(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `${moodleApiBaseUrl}?wstoken=${moodleApiToken}&wsfunction=core_user_get_users_by_field&moodlewsrestformat=json&field=email&values[0]=${member?.email}`
    );
    if (moodleUser != null && moodleUser.length > 0) {
      const moodleUserCoursesProgress = await getExternalResource<
        MoodleCourse[]
      >(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${moodleApiBaseUrl}?wstoken=${moodleApiToken}&wsfunction=core_enrol_get_users_courses&moodlewsrestformat=json&userid=${moodleUser[0].id}`
      );
      if (
        moodleUserCoursesProgress != null &&
        moodleUserCoursesProgress.length > 0
      ) {
        setMoodleCourses(moodleUserCoursesProgress);
      } else {
        setMoodleCourses(null);
      }
    } else {
      setMoodleCourses(null);
    }
  };

  useEffect(() => {
    void getMoodleProgressCourses();
    return () => {
      setMoodleCourses([]); // cleanup useEffect to perform a React state update
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row>
      <Col md={12} sm={12} xs={12}>
        <div>
          <button
            className='action-btn-detail'
            onClick={() => {
              returnToTable();
            }}
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className='pagination-chevron'
            />
            &nbsp; Retour sur la liste
          </button>
        </div>
        <Spacer size={1} />
        <p>
          <span className='fw-bold'>{'Informations personnelles'}</span>
        </p>
        <div className='section-block-padding bg-secondary'>
          <p>
            <span className='fw-bold'>{'Email'}</span>
            <br />
            {member?.email}
          </p>
          {member?.name && member?.name.length > 0 && (
            <p>
              <span className='fw-bold'>{'Nom'}</span>
              <br />
              {member?.name}
            </p>
          )}

          {member?.gender && member?.gender.length > 0 && (
            <p>
              <span className='fw-bold'>{'Genre'}</span>
              <br />
              {member?.gender}
            </p>
          )}
        </div>
        <Spacer size={1} />
      </Col>

      {(moodleCourses != null && moodleCourses?.length > 0) ||
      (member?.currentsSuperBlock != undefined &&
        member?.currentsSuperBlock.length > 0) ? (
        <Col md={12} sm={12} xs={12}>
          <p>
            <span className='fw-bold'>{'Cours suivie'}</span>
          </p>
        </Col>
      ) : null}

      {member?.currentsSuperBlock != undefined &&
        member?.currentsSuperBlock.length > 0 && (
          <>
            {member.currentsSuperBlock.map((currentSuperBlock, index) => {
              return (
                <Col md={6} sm={12} xs={12} key={index}>
                  <div className=''>
                    <CourseProgressBar
                      challengeCount={currentSuperBlock.totalChallenges}
                      completedChallengeCount={
                        currentSuperBlock.totalCompletedChallenges
                      }
                      coursName={currentSuperBlock.superBlockName}
                    />
                  </div>
                </Col>
              );
            })}
          </>
        )}

      {moodleCourses != null && moodleCourses?.length > 0 && (
        <>
          {moodleCourses.map((moodleCourse, index) => {
            return (
              <Col md={6} sm={12} xs={12} key={index}>
                <div className=''>
                  <CourseProgressBar
                    challengeCount={100}
                    completedChallengeCount={moodleCourse.progress}
                    coursName={moodleCourse.displayname}
                  />
                </div>
              </Col>
            );
          })}
        </>
      )}
    </Row>
  );
}

ShowAllMembers.displayName = 'ShowAllMembers';

export default connect(mapStateToProps, mapDispatchToProps)(ShowAllMembers);
