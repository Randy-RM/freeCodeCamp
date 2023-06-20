/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Row,
  Col,
  Table,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from '@freecodecamp/react-bootstrap';
import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
// import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight
  // faSearch,
  // faXmark
} from '@fortawesome/free-solid-svg-icons';
import { createUserGroup, getDatabaseResource } from '../../utils/ajax';

import envData from '../../../../config/env.json';
import { createFlashMessage } from '../../components/Flash/redux';
import { Loader, Spacer } from '../../components/helpers';

import {
  signInLoadingSelector,
  userSelector,
  isSignedInSelector,
  hardGoTo as navigate
} from '../../redux';

import { User } from '../../redux/prop-types';
import './admin-global.css';

const { apiLocation, homeLocation } = envData;

// TODO: update types for actions
interface ShowAllGroupsProps {
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

type MemberGroup = {
  id: string;
  userGroupName: string;
};

type MemberGroupList = {
  userGroupList: MemberGroup[];
  totalPages: number;
  currentPage: number;
  countUsersGroup: number;
};

export function ShowAllGroups(props: ShowAllGroupsProps): JSX.Element {
  // const { t } = useTranslation();
  const { isSignedIn, user, navigate, showLoading } = props;
  const [groupName, setGroupName] = useState<string>('');
  const [membersGroup, setMembersGroup] = useState<MemberGroup[]>();
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [countUsersGroup, setCountUsersGroup] = useState<number>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [memberGroupNameToSearch, setMemberGroupNameToSearch] =
    useState<string>('');

  const getMembersGroup = async () => {
    const groupList = await getDatabaseResource<MemberGroupList>(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `/all-users-group?page=${currentPage}&limit=4&memberGroupName=${memberGroupNameToSearch}`
    );
    if (groupList != null && !('error' in groupList)) {
      setMembersGroup(groupList.userGroupList);
      setCountUsersGroup(groupList.countUsersGroup);
      if (totalPages == 1) {
        setTotalPages(Number(groupList.totalPages));
        setCurrentPage(Number(groupList.currentPage));
      }
    } else {
      setMembersGroup([]);
      setCountUsersGroup(0);
    }
  };

  const navigateToPage = (forwardOrBackward: boolean) => {
    if (forwardOrBackward) {
      if (currentPage < totalPages) {
        setCurrentPage(Number(currentPage + 1));
      }
    } else {
      if (currentPage > 1) {
        setCurrentPage(Number(currentPage - 1));
      }
    }
  };

  const handleChangeGroupNameInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const currentGroupName = event.target.value;
    setGroupName(currentGroupName);
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await createUserGroup({
      userGroupName: groupName
    });
  };

  useEffect(() => {
    void getMembersGroup();
    return () => {
      setMembersGroup([]); // cleanup useEffect to perform a React state update
      // setGroupMembers('all');
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

  if (!user.email.endsWith('@kadea.co')) {
    navigate(`${homeLocation}`);
    return <Loader fullScreen={true} />;
  }

  return (
    <>
      <Helmet title={`Tableau de bord | Kadea Online`} />

      <div className=''>
        <Row>
          <Col md={12} sm={12} xs={12}>
            <div className=''>
              <h1
                className='big-subheading'
                style={{ overflowWrap: 'break-word' }}
              >
                {'Groups'}
              </h1>
            </div>
          </Col>
        </Row>
        <Spacer size={1} />
        <Row>
          <Col md={6} sm={12} xs={12}>
            <div className='section-block-padding bg-secondary'>
              <p className=''>Créer un groupe</p>
              <div className=''>
                <div>
                  <form onSubmit={handleSubmit}>
                    <FormGroup controlId='class-room-filter'>
                      <ControlLabel>
                        <strong>{'Nom du group'}</strong>
                      </ControlLabel>
                      <div className=''>
                        <FormControl
                          type='text'
                          placeholder='Nom du group'
                          className='standard-radius-5'
                          name='groupName'
                          onChange={handleChangeGroupNameInput}
                        />
                        <br />
                        <Button
                          type='submit'
                          className='standard-radius-5 btn-black'
                          id='button-addon2'
                        >
                          Créer un nouveau group
                        </Button>
                      </div>
                    </FormGroup>
                  </form>
                </div>
              </div>
            </div>
            <Spacer size={1} />
          </Col>
        </Row>
        {/* <Row>
          <Col md={12} sm={12} xs={12}>
            <div className=''>
              <Table responsive hover>
                <thead className='bg-dark-gray'>
                  <tr>
                    <th className='text-light'>Group</th>
                    <th className='text-light'>Nombre de membres</th>
                    <th className='text-light'>Date de création</th>
                    <th className='text-light'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Kadea class c matin</td>
                    <td>35 Membres</td>
                    <td>06/06/2023</td>
                    <td>Supprimer</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
          <Col md={12} sm={12} xs={12}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              className='pagination-chevron'
            />
            &nbsp;
            {`  1 sur 1  `}
            &nbsp;
            <FontAwesomeIcon
              icon={faChevronRight}
              className='pagination-chevron'
            />
          </Col>
        </Row> */}
        <TableMembers
          membersGroup={membersGroup}
          // countUsers={countUsers}
          currentPage={currentPage}
          totalPages={totalPages}
          navigateToPage={navigateToPage}
          // showMemberDetails={showMemberDetails}
          // handleChangeGroup={handleChangeGroupMembers}
          // searchMember={searchMember}
          // currentGroupMembers={groupMembers}
        />
        <Spacer size={1} />
      </div>
    </>
  );
}

interface TableMembersGroupProps {
  membersGroup?: MemberGroup[];
  // countUsers?: number;
  currentPage: number;
  totalPages: number;
  // showMemberDetails: (member: MemberGroup) => void;
  navigateToPage: (forwardOrBackward: boolean) => void;
  // handleChangeGroup: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // searchMember: (memberName: string) => void;
}

export function TableMembers(props: TableMembersGroupProps): JSX.Element {
  const {
    membersGroup,
    // countUsers,
    navigateToPage,
    currentPage,
    totalPages
    // showMemberDetails,
    // handleChangeGroup,
    // searchMember
  } = props;

  // const [memberName, setMemberName] = useState<string>('');

  // const handleSearchMember = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   searchMember(memberName);
  // };

  // const handleClearSearchMemberInput = () => {
  //   setMemberName('');
  //   searchMember('');
  // };

  // const handleChangeSearchMemberInput = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const currentMemberName = event.target.value;
  //   setMemberName(currentMemberName);
  // };

  return (
    <>
      {/* <Row>
        <Col md={6} sm={12} xs={12}>
          <div className=''>
            <div>
              <form onSubmit={handleSearchMember}>
                <FormGroup controlId='class-room-filter'>
                  <ControlLabel>
                    <strong>{'Membre'}</strong>
                  </ControlLabel>
                  <div className='d-flex search-bar'>
                    <FormControl
                      type='search'
                      placeholder='Rechercher un membre'
                      className='standard-radius-5'
                      name='memberName'
                      value={memberName}
                      onChange={handleChangeSearchMemberInput}
                    />
                    <Button
                      type='submit'
                      className='standard-radius-5 btn-black'
                      id='button-addon2'
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                    <Button
                      className='standard-radius-5 btn-red'
                      id='button-addon2'
                      onClick={handleClearSearchMemberInput}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </Button>
                  </div>
                </FormGroup>
              </form>
            </div>
          </div>
        </Col>
      </Row> */}
      <Row>
        <Col md={12} sm={12} xs={12}>
          <div className=''>
            {membersGroup && membersGroup.length > 0 ? (
              <Table responsive hover>
                <thead className='bg-dark-gray'>
                  <tr>
                    <th className='text-light'>Group</th>
                    <th className='text-light'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {membersGroup.map((group, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ verticalAlign: 'middle' }}>
                          {group.userGroupName}
                        </td>
                        <td style={{ verticalAlign: 'middle' }}>
                          <button
                            className='action-btn-detail'
                            onClick={() => {
                              return;
                            }}
                          >
                            Supprimer
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
                  </tr>
                </thead>
                <tbody>
                  <tr>
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
    </>
  );
}

ShowAllGroups.displayName = 'ShowAllGroups';

export default connect(mapStateToProps, mapDispatchToProps)(ShowAllGroups);
