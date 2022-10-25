import React from 'react';
import { Row, Col } from '@freecodecamp/react-bootstrap';
import { useTranslation } from 'react-i18next';
import { SuperBlocks } from '../../../../../config/certification-settings';
// import { generateIconComponent } from '../../../assets/icons';
import { Spacer } from '../../../components/helpers';

interface SuperBlockIntroProps {
  superBlock: SuperBlocks;
}

function SuperBlockIntro(props: SuperBlockIntroProps): JSX.Element {
  const { t } = useTranslation();
  const { superBlock } = props;

  const superBlockIntroObj: {
    title: string;
    intro: string[];
    note: string[];
  } = t(`intro:${superBlock}`);
  const {
    title: i18nSuperBlock,
    intro: superBlockIntroText,
    note: superBlockNoteText
  } = superBlockIntroObj;

  return (
    <>
      <div>
        <Row className='super-block-intro-page'>
          <Col md={10} mdOffset={1} sm={10} smOffset={1} xs={12}>
            <p className='text-love-light fw-bold'>
              {/* {t(`intro:misc-text.courses`)} */}
              Cour
            </p>
            <h1 className='big-heading'>{i18nSuperBlock}</h1>
            <Spacer size={1} />
          </Col>
          {/* {generateIconComponent(superBlock, 'cert-header-icon')} */}
          {/* <Spacer /> */}
          <Col className='' md={10} mdOffset={1} sm={10} smOffset={1} xs={12}>
            <div className=''>
              {superBlockNoteText && (
                <div className='alert alert-info' style={{ marginTop: '2rem' }}>
                  {superBlockNoteText}
                </div>
              )}
            </div>
          </Col>
          <Col className='' md={10} mdOffset={1} sm={10} smOffset={1} xs={12}>
            <div className='alert bg-secondary'>
              {superBlockIntroText.map((str, i) => (
                <p key={i}>{str}</p>
              ))}
            </div>
          </Col>
          <Spacer />
        </Row>
      </div>
    </>
  );
}

SuperBlockIntro.displayName = 'SuperBlockIntro';

export default SuperBlockIntro;
