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
  employedWhere: string;
  sinceWhen: string;
  position: string;
};

type WorkExperienceProps = {
  employedWhere: string;
  sinceWhen: string;
  position: string;
  submitNewWorkExperience: (formValues: FormValues) => void;
  t: TFunction;
};

type WorkExperienceState = {
  formValues: FormValues;
  originalValues: FormValues;
  formClicked: boolean;
};

class WorkExperienceSettings extends Component<
  WorkExperienceProps,
  WorkExperienceState
> {
  static displayName: string;
  constructor(props: WorkExperienceProps) {
    super(props);
    const { employedWhere = '', sinceWhen = '', position = '' } = props;
    const values = {
      employedWhere,
      sinceWhen,
      position
    };
    this.state = {
      formValues: { ...values },
      originalValues: { ...values },
      formClicked: false
    };
  }

  componentDidUpdate() {
    const { employedWhere, sinceWhen, position } = this.props;
    const { formValues, formClicked } = this.state;
    if (
      formClicked &&
      employedWhere === formValues.employedWhere &&
      sinceWhen === formValues.sinceWhen &&
      position === formValues.position
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      return this.setState({
        originalValues: {
          employedWhere,
          sinceWhen,
          position
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
    const { submitNewWorkExperience } = this.props;
    return this.setState(
      {
        formClicked: true
      },
      () => submitNewWorkExperience(formValues)
    );
  };

  handleEmployedWhereChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.slice(0);
    return this.setState(state => ({
      formValues: {
        ...state.formValues,
        employedWhere: value
      }
    }));
  };

  handleSinceWhenChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.slice(0);
    return this.setState(state => ({
      formValues: {
        ...state.formValues,
        sinceWhen: value
      }
    }));
  };

  handlePositionChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.slice(0);
    return this.setState(state => ({
      formValues: {
        ...state.formValues,
        position: value
      }
    }));
  };

  render() {
    const {
      formValues: { employedWhere, sinceWhen, position }
    } = this.state;
    return (
      <div className='about-settings'>
        <div>
          <form id='camper-work-experience' onSubmit={this.handleSubmit}>
            <FormGroup controlId='work-experience-employedWhere'>
              <ControlLabel>
                <strong>{'Employé où'}</strong>
              </ControlLabel>
              <FormControl
                onChange={this.handleEmployedWhereChange}
                type='text'
                value={employedWhere}
              />
              <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
            </FormGroup>
            <FormGroup controlId='work-experience-sinceWhen'>
              <ControlLabel>
                <strong>{'Depuis quand'}</strong>
              </ControlLabel>
              <FormControl
                onChange={this.handleSinceWhenChange}
                type='date'
                value={sinceWhen}
              />
              <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
            </FormGroup>
            <FormGroup controlId='work-experience-position'>
              <ControlLabel>
                <strong>{'Poste'}</strong>
              </ControlLabel>
              <FormControl
                onChange={this.handlePositionChange}
                type='text'
                value={position}
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

WorkExperienceSettings.displayName = 'WorkExperienceSettings';

export default withTranslation()(WorkExperienceSettings);
