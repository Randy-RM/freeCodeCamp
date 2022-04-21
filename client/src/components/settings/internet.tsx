import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  HelpBlock,
  FormControl,
  FormGroup,
  ControlLabel
} from '@freecodecamp/react-bootstrap';
import React, { Component } from 'react';
import { TFunction, withTranslation } from 'react-i18next';
import isURL from 'validator/lib/isURL';

import { maybeUrlRE } from '../../utils';

import BlockSaveButton from '../helpers/form/block-save-button';

interface InternetFormValues {
  githubProfile: string;
  linkedin: string;
  twitter: string;
  website: string;
}

interface InternetProps extends InternetFormValues {
  t: TFunction;
  updateInternetSettings: (formValues: InternetFormValues) => void;
}

type InternetState = {
  formValues: InternetFormValues;
  originalValues: InternetFormValues;
};

class InternetSettings extends Component<InternetProps, InternetState> {
  static displayName: string;
  constructor(props: InternetProps) {
    super(props);
    const {
      githubProfile = '',
      linkedin = '',
      twitter = '',
      website = ''
    } = props;

    this.state = {
      formValues: { githubProfile, linkedin, twitter, website },
      originalValues: { githubProfile, linkedin, twitter, website }
    };
  }

  componentDidUpdate() {
    const {
      githubProfile = '',
      linkedin = '',
      twitter = '',
      website = ''
    } = this.props;

    const { originalValues } = this.state;

    if (
      githubProfile !== originalValues.githubProfile ||
      linkedin !== originalValues.linkedin ||
      twitter !== originalValues.twitter ||
      website !== originalValues.website
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      return this.setState({
        originalValues: { githubProfile, linkedin, twitter, website }
      });
    }
    return null;
  }

  getValidationStateFor(maybeURl = '') {
    if (!maybeURl || !maybeUrlRE.test(maybeURl)) {
      return {
        state: null,
        message: ''
      };
    }
    if (isURL(maybeURl)) {
      return {
        state: 'success',
        message: ''
      };
    }
    return {
      state: 'error',
      message:
        "Nous n'avons pas pu valider votre URL correctement. Veuillez vous assurer qu'elle est correcte."
    };
  }

  createHandleChange =
    (key: keyof InternetFormValues) =>
    (e: React.FormEvent<HTMLInputElement>) => {
      const value = (e.target as HTMLInputElement).value.slice(0);
      return this.setState(state => ({
        formValues: {
          ...state.formValues,
          [key]: value
        }
      }));
    };

  isFormPristine = () => {
    const { formValues, originalValues } = this.state;
    return (Object.keys(originalValues) as Array<keyof InternetFormValues>)
      .map(key => originalValues[key] === formValues[key])
      .every(bool => bool);
  };

  isFormValid = (): boolean => {
    const { formValues, originalValues } = this.state;
    const valueReducer = (obj: InternetFormValues) => {
      return Object.values(obj).reduce(
        (acc, cur): boolean => (acc ? acc : cur !== ''),
        false
      ) as boolean;
    };

    const formHasValues = valueReducer(formValues);
    const OriginalHasValues = valueReducer(originalValues);

    // check if user had values but wants to delete them all
    if (OriginalHasValues && !formHasValues) return true;

    return (Object.keys(formValues) as Array<keyof InternetFormValues>).reduce(
      (bool: boolean, key: keyof InternetFormValues): boolean => {
        const maybeUrl = formValues[key];
        return maybeUrl ? isURL(maybeUrl) : bool;
      },
      false
    );
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!this.isFormPristine() && this.isFormValid()) {
      // // Only submit the form if is has changed, and if it is valid
      const { formValues } = this.state;
      const isSocial = {
        isGithub: !!formValues.githubProfile,
        isLinkedIn: !!formValues.linkedin,
        isTwitter: !!formValues.twitter,
        isWebsite: !!formValues.website
      };

      const { updateInternetSettings } = this.props;
      return updateInternetSettings({ ...isSocial, ...formValues });
    }
    return null;
  };

  renderHelpBlock = (validationMessage: string) =>
    validationMessage ? (
      <HelpBlock>{validationMessage}</HelpBlock>
    ) : (
      <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
    );

  renderCheck = (url: string, validation: string | null) =>
    url && validation === 'success' ? (
      <FormControl.Feedback>
        <span>
          <FontAwesomeIcon icon={faCheck} size='1x' />
        </span>
      </FormControl.Feedback>
    ) : null;

  render() {
    const {
      formValues: { githubProfile, linkedin }
    } = this.state;

    const {
      state: githubProfileValidation,
      message: githubProfileValidationMessage
    } = this.getValidationStateFor(githubProfile);

    const { state: linkedinValidation, message: linkedinValidationMessage } =
      this.getValidationStateFor(linkedin);

    return (
      <>
        <div>
          <form id='internet-presence' onSubmit={this.handleSubmit}>
            <FormGroup
              controlId='internet-linkedin'
              validationState={linkedinValidation}
            >
              <ControlLabel>LinkedIn</ControlLabel>
              <FormControl
                onChange={this.createHandleChange('linkedin')}
                placeholder='https://www.linkedin.com/in/user-name'
                type='url'
                value={linkedin}
              />
              {this.renderCheck(linkedin, linkedinValidation)}
              {this.renderHelpBlock(linkedinValidationMessage)}
            </FormGroup>
            <FormGroup
              controlId='internet-github'
              validationState={githubProfileValidation}
            >
              <ControlLabel>GitHub</ControlLabel>
              <FormControl
                onChange={this.createHandleChange('githubProfile')}
                placeholder='https://github.com/user-name'
                type='url'
                value={githubProfile}
              />
              {this.renderCheck(githubProfile, githubProfileValidation)}
              {this.renderHelpBlock(githubProfileValidationMessage)}
            </FormGroup>
            <BlockSaveButton
              disabled={this.isFormPristine() || !this.isFormValid()}
            />
          </form>
        </div>
      </>
    );
  }
}

InternetSettings.displayName = 'InternetSettings';

export default withTranslation()(InternetSettings);
