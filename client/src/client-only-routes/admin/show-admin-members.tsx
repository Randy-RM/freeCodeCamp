import { Row, Col, Table } from '@freecodecamp/react-bootstrap';
import React from 'react';
import Helmet from 'react-helmet';
// import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

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

const { apiLocation } = envData;

// TODO: update types for actions
interface ShowAdminMembersProps {
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

export function ShowAdminMembers(props: ShowAdminMembersProps): JSX.Element {
  const { isSignedIn, navigate, showLoading } = props;

  if (showLoading) {
    return <Loader fullScreen={true} />;
  }

  if (!isSignedIn) {
    navigate(`${apiLocation}/signin`);
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
                {'Membres'}
              </h1>
            </div>
          </Col>
        </Row>
        <Spacer size={1} />
        <Row>
          <Col md={12} sm={12} xs={12}>
            <div className=''>
              <Table striped responsive hover>
                <thead className='bg-dark-gray'>
                  <tr>
                    <th className='text-light'>#</th>
                    <th className='text-light'>First Name</th>
                    <th className='text-light'>Last Name</th>
                    <th className='text-light'>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Larry the Bird</td>
                    <td>Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
        <Spacer size={1} />
      </div>
    </>
  );
}

ShowAdminMembers.displayName = 'ShowAdminMembers';

export default connect(mapStateToProps, mapDispatchToProps)(ShowAdminMembers);
