import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Alert
} from '@freecodecamp/react-bootstrap';
import React, { Component } from 'react';

import { TFunction, withTranslation } from 'react-i18next';
import isURL from 'validator/lib/isURL';
import { Spacer } from '../helpers';
import BlockSaveButton from '../helpers/form/block-save-button';

type FormValues = {
  name: string;
  location: string;
  gender: string;
  codeTime: string;
  picture: string;
  about: string;
};

type AboutProps = {
  about: string;
  location: string;
  name: string;
  gender: string;
  codeTime: string;
  picture: string;
  points: number;
  sound: boolean;
  submitNewAbout: (formValues: FormValues) => void;
  t: TFunction;
  toggleSoundMode: (sound: boolean) => void;
  username: string;
};

type AboutState = {
  formValues: FormValues;
  originalValues: FormValues;
  formClicked: boolean;
  isPictureUrlValid: boolean;
};

class AboutSettings extends Component<AboutProps, AboutState> {
  validationImage: HTMLImageElement;
  static displayName: string;
  constructor(props: AboutProps) {
    super(props);
    this.validationImage = new Image();
    const {
      name = '',
      location = '',
      gender = '',
      codeTime = '',
      picture = '',
      about = ''
    } = props;
    const values = {
      name,
      location,
      gender,
      codeTime,
      picture,
      about
    };
    this.state = {
      formValues: { ...values },
      originalValues: { ...values },
      formClicked: false,
      isPictureUrlValid: true
    };
  }

  componentDidUpdate() {
    const { name, location, gender, codeTime, picture, about } = this.props;
    const { formValues, formClicked } = this.state;
    if (
      formClicked &&
      name === formValues.name &&
      location === formValues.location &&
      gender === formValues.gender &&
      codeTime === formValues.codeTime &&
      picture === formValues.picture &&
      about === formValues.about
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      return this.setState({
        originalValues: {
          name,
          location,
          gender,
          codeTime,
          picture,
          about
        },
        formClicked: false
      });
    }
    return null;
  }

  isFormPristine = () => {
    const { formValues, originalValues } = this.state;
    return (
      this.state.isPictureUrlValid === false ||
      (Object.keys(originalValues) as Array<keyof FormValues>)
        .map(key => originalValues[key] === formValues[key])
        .every(bool => bool)
    );
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { formValues } = this.state;
    const { submitNewAbout } = this.props;
    if (this.state.isPictureUrlValid === true) {
      return this.setState({ formClicked: true }, () =>
        submitNewAbout(formValues)
      );
    } else {
      return false;
    }
  };

  handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.slice(0);
    return this.setState(state => ({
      formValues: {
        ...state.formValues,
        name: value
      }
    }));
  };

  handleLocationChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.slice(0);
    return this.setState(state => ({
      formValues: {
        ...state.formValues,
        location: value
      }
    }));
  };

  handleGenderChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.slice(0);
    return this.setState(state => ({
      formValues: {
        ...state.formValues,
        gender: value
      }
    }));
  };

  handleCodeTimeChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.slice(0);
    return this.setState(state => ({
      formValues: {
        ...state.formValues,
        codeTime: value
      }
    }));
  };

  componentDidMount() {
    this.validationImage.addEventListener('error', this.errorEvent);
    this.validationImage.addEventListener('load', this.loadEvent);
  }

  componentWillUnmount() {
    this.validationImage.removeEventListener('load', this.loadEvent);
    this.validationImage.removeEventListener('error', this.errorEvent);
  }

  loadEvent = () => this.setState({ isPictureUrlValid: true });
  errorEvent = () =>
    this.setState(state => ({
      isPictureUrlValid: state.formValues.picture === ''
    }));

  handlePictureChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.slice(0);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    if (isURL(value, { require_protocol: true })) {
      this.validationImage.src = value;
    } else {
      this.setState({
        isPictureUrlValid: false
      });
    }
    this.setState(state => ({
      formValues: {
        ...state.formValues,
        picture: value
      }
    }));
  };

  showImageValidationWarning = () => {
    const { t } = this.props;
    if (this.state.isPictureUrlValid === false) {
      return (
        <HelpBlock>
          <Alert bsStyle='info' closeLabel={t('buttons.close')}>
            {t('validation.url-not-image')}
          </Alert>
        </HelpBlock>
      );
    } else {
      return true;
    }
  };

  handleAboutChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.slice(0);
    return this.setState(state => ({
      formValues: {
        ...state.formValues,
        about: value
      }
    }));
  };

  render() {
    const {
      formValues: { name, location, gender, codeTime, about }
    } = this.state;

    return (
      <div className='about-settings'>
        <div>
          <form id='camper-identity' onSubmit={this.handleSubmit}>
            <FormGroup controlId='about-name'>
              <ControlLabel>
                <strong>{'Nom complet'}</strong>
              </ControlLabel>
              <FormControl
                onChange={this.handleNameChange}
                type='text'
                value={name}
              />
              <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
            </FormGroup>

            <FormGroup controlId='about-location'>
              <ControlLabel>
                <strong>{'Adress'}</strong>
              </ControlLabel>
              <FormControl
                onChange={this.handleLocationChange}
                type='text'
                value={location}
              />
              <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
            </FormGroup>

            <FormGroup controlId='about-genre'>
              <ControlLabel>
                <strong>{'Genre'}</strong>
              </ControlLabel>
              <FormControl
                componentClass='select'
                onChange={this.handleGenderChange}
              >
                {gender.length === 0 ? (
                  <option selected>Choisissez votre genre</option>
                ) : (
                  <option>Choisissez votre genre</option>
                )}
                {gender === 'Femme' ? (
                  <option value='Femme' selected>
                    Femme
                  </option>
                ) : (
                  <option value='Femme'>Femme</option>
                )}
                {gender === 'Homme' ? (
                  <option value='Homme' selected>
                    Homme
                  </option>
                ) : (
                  <option value='Homme'>Homme</option>
                )}
              </FormControl>
              <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
            </FormGroup>

            <FormGroup controlId='about-code'>
              <ControlLabel>
                <strong>{'Code depuis quand'}</strong>
              </ControlLabel>
              <FormControl
                onChange={this.handleCodeTimeChange}
                type='date'
                value={codeTime}
              />
              <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
            </FormGroup>

            <FormGroup controlId='about-about'>
              <ControlLabel>
                <strong>{'Apropos'}</strong>
              </ControlLabel>
              <FormControl
                componentClass='textarea'
                onChange={this.handleAboutChange}
                value={about}
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

AboutSettings.displayName = 'AboutSettings';

export default withTranslation()(AboutSettings);
