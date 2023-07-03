/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Row,
  Col,
  Table,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  HelpBlock
} from '@freecodecamp/react-bootstrap';
import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import {
  createUserGroup,
  getDatabaseResource,
  deleteMemberGroup
} from '../../utils/ajax';

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

interface UserGroupResponse {
  userGroup: MemberGroup | null;
  error: string | undefined;
}

export function ShowAllGroups(props: ShowAllGroupsProps): JSX.Element {
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
  const [groupRecentlyTreated, setGroupRecentlyTreated] = useState<string>('');
  const [errorOnUpdateGroupList, setErrorOnUpdateGroupList] =
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
      if (totalPages > 1) {
        setTotalPages(Number(groupList.totalPages));
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
    const currentGroupName = (
      event.target as HTMLInputElement
    ).value.trimStart();
    setGroupName(currentGroupName);
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    if (groupName.length != 0) {
      const groupToCreate = groupName;
      const response = (await createUserGroup({
        userGroupName: groupToCreate.trim()
      })) as UserGroupResponse;
      if (response.userGroup) {
        setGroupRecentlyTreated(response.userGroup.id);
        setCurrentPage(1);
        setGroupName('');
        setErrorOnUpdateGroupList('');
      } else {
        setErrorOnUpdateGroupList(
          typeof response.error === 'string' ? response.error : ''
        );
      }
    } else {
      setErrorOnUpdateGroupList('This field should not be empty.');
    }
  };

  const handleDeleteMemberGroup = async (memberGroup: MemberGroup) => {
    const isMemberGroupDeleted = await deleteMemberGroup(memberGroup);
    if (isMemberGroupDeleted?.isDeleted) {
      setGroupRecentlyTreated(
        groupRecentlyTreated != memberGroup.id ? memberGroup.id : ''
      );
    } else {
      setGroupRecentlyTreated('');
    }
  };

  useEffect(() => {
    void getMembersGroup();
    return () => {
      setMembersGroup([]); // cleanup useEffect to perform a React state update
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, groupRecentlyTreated]);

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
                          value={groupName}
                          onChange={handleChangeGroupNameInput}
                        />
                        {errorOnUpdateGroupList.length == 0 ? (
                          <HelpBlock className='none-help-block'>
                            {`none`}
                          </HelpBlock>
                        ) : (
                          <HelpBlock className='text-danger'>
                            {`${errorOnUpdateGroupList}`}
                          </HelpBlock>
                        )}
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
        <TableMembers
          membersGroup={membersGroup}
          currentPage={currentPage}
          totalPages={totalPages}
          navigateToPage={navigateToPage}
          deleteMemberGroup={handleDeleteMemberGroup}
        />
        <Spacer size={1} />
      </div>
    </>
  );
}

interface TableMembersGroupProps {
  membersGroup?: MemberGroup[];
  currentPage: number;
  totalPages: number;
  deleteMemberGroup: (memberGroup: MemberGroup) => void;
  navigateToPage: (forwardOrBackward: boolean) => void;
}

export function TableMembers(props: TableMembersGroupProps): JSX.Element {
  const {
    membersGroup,
    navigateToPage,
    currentPage,
    totalPages,
    deleteMemberGroup
  } = props;

  return (
    <>
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
                              deleteMemberGroup(group);
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
