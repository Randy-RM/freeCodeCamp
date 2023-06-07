import {
  Row,
  Col,
  Table,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from '@freecodecamp/react-bootstrap';
import React from 'react';
import Helmet from 'react-helmet';
// import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

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

export function ShowAllGroups(props: ShowAllGroupsProps): JSX.Element {
  // const { t } = useTranslation();
  const { isSignedIn, user, navigate, showLoading } = props;
  // const { currentsSuperBlock } = user;

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
                  <form>
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
        <Row>
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
        </Row>
        <Spacer size={1} />
      </div>
    </>
  );
}

ShowAllGroups.displayName = 'ShowAllGroups';

export default connect(mapStateToProps, mapDispatchToProps)(ShowAllGroups);
