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
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component, Fragment } from 'react';
import { TFunction, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import envData from '../../../../../config/env.json';
import { hardGoTo as navigate } from '../../../redux';
import { Link } from '../../helpers';
import AuthOrProfile from './auth-or-profile';

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
  }

  render() {
    const {
      fetchState,
      t,
      user: { username },
      user
    }: NavLinksProps = this.props;

    const { pending } = fetchState;

    return pending ? (
      <div className='nav-skeleton' />
    ) : (
      <div>
        <label htmlFor='show-menu' className='menu-icon'>
          <FontAwesomeIcon icon={faBars} />
        </label>
        <input type='checkbox' id='show-menu' />
        <ul className='nav-list'>
          <li className='nav-item'>
            <Link className='active' key='learn' to='/'>
              {t('buttons.curriculum')}
            </Link>
          </li>

          {username && (
            <Fragment key='profile-settings'>
              <li className='nav-item'>
                <Link
                  className=''
                  key='profile'
                  sameTab={false}
                  to={`/${username}`}
                >
                  {t('buttons.profile')}
                </Link>
              </li>

              <li className='nav-item'>
                <Link
                  className=''
                  key='settings'
                  sameTab={false}
                  to={`/settings`}
                >
                  {t('buttons.settings')}
                </Link>
              </li>

              <li className='navatar'>
                <div>
                  <AuthOrProfile user={user} />
                </div>
              </li>
            </Fragment>
          )}

          {!username && (
            <li className='nav-item'>
              <a
                className='nav-signin-btn'
                href={`${apiLocation}/signin`}
                key='signin'
              >
                {t('buttons.sign-in')}
              </a>
            </li>
          )}

          {username && (
            <Fragment key='signout-frag'>
              <li className='nav-item'>
                <a
                  className='nav-signin-btn'
                  href={`${apiLocation}/signout`}
                  key='sign-out'
                >
                  {t('buttons.sign-out')}
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
