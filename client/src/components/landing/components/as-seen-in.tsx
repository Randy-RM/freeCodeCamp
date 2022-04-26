import { Col, Row } from '@freecodecamp/react-bootstrap';
import React from 'react';
import envData from '../../../../../config/env.json';
import Map from '../../Map/index';

const { apiLocation } = envData;

type AsSeenInProps = {
  isSignedIn?: boolean;
};

const AsSeenIn = ({ isSignedIn }: AsSeenInProps): JSX.Element => {
  return (
    <Row className='as-seen-in'>
      <Col sm={8} smOffset={2} xs={12}>
        <div className='text-center'>
          <p className='as-seen-in-text text-09 text-normal'>
            {`
            Vous commencerez par créer une application de photos de chats pour apprendre 
            les bases du HTML et du CSS. Ensuite, 
            vous apprendrez des techniques modernes comme les variables CSS en construisant 
            un pingouin, et les meilleures pratiques 
            en matière d'accessibilité en construisant un formulaire Web.
            Enfin, vous apprendrez à créer des pages Web adaptées 
            à différentes tailles d'écran en créant une carte Twitter avec Flexbox 
            et une mise en page de blog complexe avec CSS Grid.
            `}
          </p>
          <br />
          <div>
            {isSignedIn ? (
              <Map
                forLanding={true}
                single={true}
                className='btn-primary-dark link-button'
                text='Lancez-vous'
                keyPrefix='as-seen-in-top'
              />
            ) : (
              <a
                href={`${apiLocation}/signin`}
                className='btn-primary-dark link-button'
              >
                {'Lancez-vous'}
              </a>
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
};

AsSeenIn.displayName = 'AsSeenIn';
export default AsSeenIn;
