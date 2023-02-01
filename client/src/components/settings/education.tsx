import {
  HelpBlock,
  FormGroup,
  ControlLabel,
  FormControl
} from '@freecodecamp/react-bootstrap';
import React, { Component } from 'react';
import validator from 'validator/';

import { TFunction, withTranslation } from 'react-i18next';
import { Spacer } from '../helpers';
import BlockSaveButton from '../helpers/form/block-save-button';

type FormValues = {
  fieldOfStudy: string;
  levelOfStudy: string;
};

type EducationProps = {
  fieldOfStudy: string;
  levelOfStudy: string;
  submitNewEducation: (formValues: FormValues) => void;
  t: TFunction;
};

type EducationState = {
  formValues: FormValues;
  originalValues: FormValues;
  formClicked: boolean;
  isValidFieldOfStudy: boolean;
  isFocusFieldOfStudy: boolean;
  isBlurFieldOfStudy: boolean;
  isValidLevelOfStudy: boolean;
};

class EducationSettings extends Component<EducationProps, EducationState> {
  static displayName: string;
  constructor(props: EducationProps) {
    super(props);
    const { fieldOfStudy = '', levelOfStudy = '' } = props;
    const values = {
      fieldOfStudy,
      levelOfStudy
    };
    this.state = {
      formValues: { ...values },
      originalValues: { ...values },
      formClicked: false,
      isValidFieldOfStudy: true,
      isFocusFieldOfStudy: false,
      isBlurFieldOfStudy: false,
      isValidLevelOfStudy: true
    };
  }

  componentDidUpdate() {
    const { fieldOfStudy, levelOfStudy } = this.props;
    const { formValues, formClicked } = this.state;
    if (
      formClicked &&
      fieldOfStudy === formValues.fieldOfStudy &&
      levelOfStudy === formValues.levelOfStudy
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      return this.setState({
        originalValues: {
          fieldOfStudy,
          levelOfStudy
        },
        formClicked: false
      });
    }
    return null;
  }

  isFormPristine = () => {
    const {
      formValues,
      originalValues,
      isValidFieldOfStudy,
      isValidLevelOfStudy
    } = this.state;
    if (
      isValidFieldOfStudy === true &&
      formValues.fieldOfStudy.length >= 5 &&
      isValidLevelOfStudy === true
    ) {
      return (Object.keys(originalValues) as Array<keyof FormValues>)
        .map(key => originalValues[key] === formValues[key])
        .every(bool => bool);
    }
    return true;
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { formValues } = this.state;
    const { submitNewEducation } = this.props;
    return this.setState(
      {
        formClicked: true
      },
      () => submitNewEducation(formValues)
    );
  };

  // ------------FieldOfStudy Handler------------

  handleFieldOfStudyChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.slice(0);
    return this.setState(state => ({
      formValues: {
        ...state.formValues,
        fieldOfStudy: value
      },
      isValidFieldOfStudy:
        validator.isAlpha(value, 'fr-FR', { ignore: ' -' }) &&
        validator.isLength(value, { min: 5, max: 255 })
    }));
  };

  focusHandlerFieldOfStudy = (/*e: React.FocusEvent<HTMLInputElement>*/) => {
    // const value = (e.target as HTMLInputElement).value.slice(0);

    // if (
    //   validator.isAlpha(value, 'fr-FR', { ignore: ' -' }) &&
    //   validator.isLength(value, { min: 5, max: 255 })
    // ) {
    //   this.setState({
    //     isValidFieldOfStudy: true,
    //     isFocusFieldOfStudy: true,
    //     isBlurFieldOfStudy: false
    //   });
    // } else {
    //   this.setState({
    //     isValidFieldOfStudy: false,
    //     isFocusFieldOfStudy: true,
    //     isBlurFieldOfStudy: false
    //   });
    // }

    if (this.state.isBlurFieldOfStudy) {
      this.setState({
        isFocusFieldOfStudy: true,
        isBlurFieldOfStudy: false
      });
    } else {
      this.setState({
        isFocusFieldOfStudy: true,
        isBlurFieldOfStudy: false
      });
    }
  };

  blurHandlerFieldOfStudy = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.slice(0);

    if (
      validator.isAlpha(value, 'fr-FR', { ignore: ' -' }) &&
      validator.isLength(value, { min: 5, max: 255 })
    ) {
      this.setState({
        isValidFieldOfStudy: true,
        isFocusFieldOfStudy: false,
        isBlurFieldOfStudy: true
      });
    } else {
      this.setState({
        isValidFieldOfStudy: false,
        isFocusFieldOfStudy: false,
        isBlurFieldOfStudy: true
      });
    }
  };

  // ------------LevelOfStudy Handler------------

  handleLevelOfStudyChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.slice(0);
    return this.setState(state => ({
      formValues: {
        ...state.formValues,
        levelOfStudy: value
      },
      isValidLevelOfStudy:
        validator.equals(value, `Diplomé d'état`) ||
        validator.equals(value, `Gradué`) ||
        validator.equals(value, `Licencié`) ||
        validator.equals(value, ``)
    }));
  };

  render() {
    const {
      formValues: { fieldOfStudy, levelOfStudy },
      isValidFieldOfStudy,
      isFocusFieldOfStudy,
      isBlurFieldOfStudy
      // isValidLevelOfStudy
    } = this.state;
    return (
      <div className='about-settings'>
        <div>
          <form id='camper-education' onSubmit={this.handleSubmit}>
            <FormGroup controlId='education-fieldOfStudy'>
              <ControlLabel>
                <strong>
                  {"Domaine d'études"}
                  <span className='text-love-light'>*</span>
                </strong>
              </ControlLabel>
              <FormControl
                onFocus={this.focusHandlerFieldOfStudy}
                onBlur={this.blurHandlerFieldOfStudy}
                onChange={this.handleFieldOfStudyChange}
                type='text'
                value={fieldOfStudy}
                className='standard-radius-5'
              />
              {!isFocusFieldOfStudy &&
                !isBlurFieldOfStudy &&
                isValidFieldOfStudy && (
                  <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
                )}

              {isFocusFieldOfStudy && (
                // <HelpBlock className='text-warning'>
                //   {
                //     'Seuls les lettres et les espaces sont acceptés | minimume 5 et maximum 255 caractères.'
                //   }
                // </HelpBlock>
                <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
              )}
              {isBlurFieldOfStudy && !isValidFieldOfStudy && (
                <>
                  {fieldOfStudy.length > 0 ? (
                    <HelpBlock className='text-danger'>
                      {`Le domaine d'études que vous avez entré n'est pas valide.`}
                    </HelpBlock>
                  ) : (
                    <HelpBlock className='text-danger'>
                      {'Ce champ est requis'}
                    </HelpBlock>
                  )}
                </>
              )}
              {isBlurFieldOfStudy && isValidFieldOfStudy && (
                <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
              )}
            </FormGroup>

            <FormGroup controlId='education-levelOfStudy'>
              <ControlLabel>
                <strong>{"Niveau d'études"}</strong>
              </ControlLabel>
              <FormControl
                componentClass='select'
                onChange={this.handleLevelOfStudyChange}
                value={levelOfStudy.length === 0 ? '' : levelOfStudy}
                className='standard-radius-5'
              >
                <option value=''></option>
                <option value={`Diplomé d'état`}>{`Diplomé d'état`}</option>
                <option value={`Gradué`}>{`Gradué`}</option>
                <option value={`Licencié`}>{`Licencié`}</option>
              </FormControl>
              <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
              {/* {isValidLevelOfStudy && (
                <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
              )}
              {!isValidLevelOfStudy && (
                <HelpBlock className='text-danger'>
                  {`Les seuls Niveau d'études autorisés sont ceux dans la liste déroulante.`}
                </HelpBlock>
              )} */}
            </FormGroup>
            <BlockSaveButton disabled={this.isFormPristine()} />
          </form>
        </div>
        <Spacer />
      </div>
    );
  }
}

EducationSettings.displayName = 'EducationSettings';

export default withTranslation()(EducationSettings);
