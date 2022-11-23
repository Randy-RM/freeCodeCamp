/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
// @ts-nocheck
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component, Fragment } from 'react';
import { TFunction, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import envData from '../../../../../config/env.json';
import { hardGoTo as navigate } from '../../../redux';
import { Link } from '../../helpers';

const { apiLocation } = envData;

export interface NavLinksProps {
  fetchState?: { pending: boolean };
  i18n: Object;
  t: TFunction;
  user?: Record<string, unknown>;
  navigate?: (location: string) => void;
}

const mapDispatchToProps = {
  navigate
};

export class NavLinks extends Component<NavLinksProps, {}> {
  static displayName: string;

  constructor(props: NavLinksProps) {
    super(props);
    this.state = {
      isDropdown: false
    };
  }

  // ------------IsDropdown Handler------------

  handleIsDropdown = () => {
    this.setState({
      isDropdown: this.state.isDropdown ? false : true
    });
  };

  render() {
    const {
      fetchState,
      user: { username }
    }: NavLinksProps = this.props;

    const { pending } = fetchState;

    const { isDropdown } = this.state;

    return pending ? (
      <div className='nav-skeleton' />
    ) : (
      <div className=''>
        <label htmlFor='show-menu' className='menu-icon'>
          <FontAwesomeIcon
            icon={isDropdown ? faXmark : faBars}
            onClick={this.handleIsDropdown}
          />
        </label>
        <input type='checkbox' id='show-menu' />
        <ul className={isDropdown ? 'nav-list show-menu' : 'nav-list'}>
          <li className='nav-item'>
            <Link
              onClick={this.handleIsDropdown}
              className=''
              key='learn'
              to={'/'}
              activeClassName='active'
            >
              {'Accueil'}
            </Link>
          </li>

          <li className='nav-item'>
            <Link
              onClick={this.handleIsDropdown}
              className=''
              key='courses'
              to='/courses'
              activeClassName='active'
            >
              {'Cours'}
            </Link>
          </li>

          {username && (
            <Fragment key='profile-settings'>
              <li className='nav-item'>
                <Link
                  onClick={this.handleIsDropdown}
                  className=''
                  key='dashboard'
                  sameTab={false}
                  to={`/dashboard`}
                  activeClassName='active'
                >
                  {'Tableau de bord'}
                </Link>
              </li>

              <li className='nav-item'>
                <Link
                  onClick={this.handleIsDropdown}
                  className=''
                  key='settings'
                  sameTab={false}
                  to={`/settings`}
                  activeClassName='active'
                >
                  {'Profil'}
                </Link>
              </li>
            </Fragment>
          )}

          {!username && (
            <li className='nav-item'>
              <a
                onClick={this.handleIsDropdown}
                className='nav-signin-btn'
                href={`${apiLocation}/signin`}
                key='signin'
              >
                {'Connexion'}
              </a>
            </li>
          )}

          {username && (
            <Fragment key='signout-frag'>
              <li className='nav-item'>
                <a
                  onClick={this.handleIsDropdown}
                  className='nav-signout-btn'
                  href={`${apiLocation}/signout`}
                  key='sign-out'
                >
                  {'Déconnexion'}
                </a>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    );
  }
}

NavLinks.displayName = 'NavLinks';

export default connect(null, mapDispatchToProps)(withTranslation()(NavLinks));
