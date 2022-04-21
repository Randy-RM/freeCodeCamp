import {
  HelpBlock,
  FormGroup,
  ControlLabel,
  FormControl
} from '@freecodecamp/react-bootstrap';
import React, { Component } from 'react';

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
      formClicked: false
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
    const { formValues, originalValues } = this.state;
    return (Object.keys(originalValues) as Array<keyof FormValues>)
      .map(key => originalValues[key] === formValues[key])
      .every(bool => bool);
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

  handleFieldOfStudyChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.slice(0);
    return this.setState(state => ({
      formValues: {
        ...state.formValues,
        fieldOfStudy: value
      }
    }));
  };

  handleLevelOfStudyChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.slice(0);
    return this.setState(state => ({
      formValues: {
        ...state.formValues,
        levelOfStudy: value
      }
    }));
  };

  render() {
    const {
      formValues: { fieldOfStudy, levelOfStudy }
    } = this.state;
    return (
      <div className='about-settings'>
        <div>
          <form id='camper-education' onSubmit={this.handleSubmit}>
            <FormGroup controlId='education-fieldOfStudy'>
              <ControlLabel>
                <strong>{"Domaine d'études"}</strong>
              </ControlLabel>
              <FormControl
                onChange={this.handleFieldOfStudyChange}
                type='text'
                value={fieldOfStudy}
              />
              <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
            </FormGroup>
            <FormGroup controlId='education-levelOfStudy'>
              <ControlLabel>
                <strong>{"Niveau d'études"}</strong>
              </ControlLabel>
              <FormControl
                onChange={this.handleLevelOfStudyChange}
                type='text'
                value={levelOfStudy}
              />
              <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
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
