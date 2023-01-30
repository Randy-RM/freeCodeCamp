import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from '@freecodecamp/react-bootstrap';
import React, { Component } from 'react';
import validator from 'validator/';

import { TFunction, withTranslation } from 'react-i18next';
import { Spacer } from '../helpers';
import BlockSaveButton from '../helpers/form/block-save-button';

type FormValues = {
  name: string;
  location: string;
  gender: string;
  codeTime: string;
  about: string;
};

type AboutProps = {
  about: string;
  location: string;
  name: string;
  gender: string;
  codeTime: string;
  points: number;
  submitNewAbout: (formValues: FormValues) => void;
  t: TFunction;
  username: string;
};

type AboutState = {
  formValues: FormValues;
  originalValues: FormValues;
  formClicked: boolean;
  isValidName: boolean;
  isFocusName: boolean;
  isBlurName: boolean;
  isValidLocation: boolean;
  isFocusLocation: boolean;
  isBlurLocation: boolean;
  isValidGender: boolean;
  isValidCodeTime: boolean;
  isValidAbout: boolean;
  isFocusAbout: boolean;
  isBlurAbout: boolean;
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
      about = ''
    } = props;
    const values = {
      name,
      location,
      gender,
      codeTime,
      about
    };
    this.state = {
      formValues: { ...values },
      originalValues: { ...values },
      formClicked: false,
      isValidName: true,
      isFocusName: false,
      isBlurName: false,
      isValidLocation: true,
      isFocusLocation: false,
      isBlurLocation: false,
      isValidGender: true,
      isValidCodeTime: true,
      isValidAbout: true,
      isFocusAbout: false,
      isBlurAbout: false
    };

    // this.focusHandlerName = this.focusHandlerName.bind(this);
    // this.blurHandlerName = this.blurHandlerName.bind(this);
  }

  componentDidUpdate() {
    const { name, location, gender, codeTime, about } = this.props;
    const { formValues, formClicked } = this.state;
    if (
      formClicked &&
      name === formValues.name &&
      location === formValues.location &&
      gender === formValues.gender &&
      codeTime === formValues.codeTime &&
      about === formValues.about
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      return this.setState({
        originalValues: {
          name,
          location,
          gender,
          codeTime,
          about
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
      isValidName
      // isValidLocation,
      // isValidGender,
      // isValidCodeTime,
      // isValidAbout
    } = this.state;
    if (
      isValidName === true &&
      formValues.name.length >= 5
      // isValidName === true &&
      // isValidLocation === true &&
      // isValidGender === true &&
      // isValidCodeTime === true &&
      // isValidAbout === true
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
    const { submitNewAbout } = this.props;
    return this.setState({ formClicked: true }, () =>
      submitNewAbout(formValues)
    );
  };

  // ------------Name Handler------------

  handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.slice(0);
    return this.setState(state => ({
      formValues: {
        ...state.formValues,
        name: value
      },
      isValidName:
        validator.isAlpha(value, 'fr-FR', { ignore: ' -' }) &&
        validator.isLength(value, { min: 5, max: 255 })
    }));
  };

  focusHandlerName = (/*e: React.FocusEvent<HTMLInputElement>*/) => {
    // const value = (e.target as HTMLInputElement).value.slice(0);

    // if (
    //   validator.isAlpha(value, 'fr-FR', { ignore: ' ' }) &&
    //   validator.isLength(value, { min: 5, max: 255 })
    // ) {
    //   this.setState({
    //     isValidName: true,
    //     isFocusName: true,
    //     isBlurName: false
    //   });
    // } else {
    //   this.setState({
    //     isValidName: false,
    //     isFocusName: true,
    //     isBlurName: false
    //   });
    // }
    if (this.state.isBlurName) {
      this.setState({
        isFocusName: true,
        isBlurName: false
      });
    } else {
      this.setState({
        isFocusName: true,
        isBlurName: false
      });
    }
  };

  blurHandlerName = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.slice(0).trim();

    if (
      validator.isAlpha(value, 'fr-FR', { ignore: ' -' }) &&
      validator.isLength(value, { min: 5, max: 255 })
    ) {
      this.setState({
        isValidName: true,
        isFocusName: false,
        isBlurName: true
      });
    } else {
      this.setState({
        isValidName: false,
        isFocusName: false,
        isBlurName: true
      });
    }
  };

  // ------------Location Handler------------

  handleLocationChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.slice(0);
    return this.setState(state => ({
      formValues: {
        ...state.formValues,
        location: value
      },
      isValidLocation: !validator.isEmpty(value)
    }));
  };

  focusHandlerLocation = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.slice(0);

    if (!validator.isEmpty(value)) {
      this.setState({
        isValidLocation: true,
        isFocusLocation: true,
        isBlurLocation: false
      });
    } else {
      this.setState({
        isValidLocation: false,
        isFocusLocation: true,
        isBlurLocation: false
      });
    }
  };

  blurHandlerLocation = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.slice(0);

    if (!validator.isEmpty(value)) {
      this.setState({
        isValidLocation: true,
        isFocusLocation: false,
        isBlurLocation: true
      });
    } else {
      this.setState({
        isValidLocation: false,
        isFocusLocation: false,
        isBlurLocation: true
      });
    }
  };

  // ------------Gender Handler------------

  handleGenderChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.slice(0);
    return this.setState(state => ({
      formValues: {
        ...state.formValues,
        gender: value
      },
      isValidGender:
        validator.equals(value, 'Homme') || validator.equals(value, 'Femme')
    }));
  };

  // ------------CodeTime Handler------------

  handleCodeTimeChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.slice(0);
    return this.setState(state => ({
      formValues: {
        ...state.formValues,
        codeTime: value
      },
      isValidCodeTime: validator.isDate(value, {
        format: 'YYYY-MM-DD',
        strictMode: true
      })
    }));
  };

  // ------------About Handler------------

  handleAboutChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.slice(0);
    return this.setState(state => ({
      formValues: {
        ...state.formValues,
        about: value
      },
      isValidAbout: validator.isLength(value, { max: 300 })
    }));
  };

  focusHandlerAbout = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.slice(0);

    if (validator.isLength(value, { min: 5, max: 300 })) {
      this.setState({
        isValidAbout: true,
        isFocusAbout: true,
        isBlurAbout: false
      });
    } else {
      this.setState({
        isValidAbout: false,
        isFocusAbout: true,
        isBlurAbout: false
      });
    }
  };

  blurHandlerAbout = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.slice(0);

    if (validator.isLength(value, { max: 300 })) {
      this.setState({
        isValidAbout: true,
        isFocusAbout: false,
        isBlurAbout: true
      });
    } else {
      this.setState({
        isValidAbout: false,
        isFocusAbout: false,
        isBlurAbout: true
      });
    }
  };

  // ------------Render------------

  render() {
    const {
      formValues: { name, location, gender, codeTime, about },
      isValidName,
      isFocusName,
      isBlurName
      // isValidLocation,
      // isFocusLocation,
      // isBlurLocation,
      // isValidGender,
      // isValidCodeTime,
      // isValidAbout,
      // isFocusAbout,
      // isBlurAbout
    } = this.state;

    return (
      <div className='about-settings'>
        <div>
          <form id='camper-identity' onSubmit={this.handleSubmit}>
            <FormGroup controlId='about-name'>
              <ControlLabel>
                <strong>
                  {'Nom complet'}
                  <span className='text-love-light'>*</span>
                </strong>
              </ControlLabel>
              <FormControl
                onFocus={this.focusHandlerName}
                onBlur={this.blurHandlerName}
                onChange={this.handleNameChange}
                type='text'
                value={name}
                placeholder='John Doe'
                className='standard-radius-5'
              />

              {!isFocusName && !isBlurName && isValidName && (
                <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
              )}

              {isFocusName && (
                // <HelpBlock className='text-warning'>
                //   {
                //     'Seuls les lettres et les espaces sont acceptés | minimume 5 et maximum 255 caractères.'
                //   }
                // </HelpBlock>
                <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
              )}
              {isBlurName && !isValidName && (
                <>
                  {name.length >= 0 ? (
                    <HelpBlock className='text-danger'>
                      {`Le nom que vous avez entré n'est pas valide.`}
                    </HelpBlock>
                  ) : (
                    <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
                  )}
                </>
              )}
              {isBlurName && isValidName && (
                <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
              )}
            </FormGroup>

            <FormGroup controlId='about-location'>
              <ControlLabel>
                <strong>{'Adresse'}</strong>
              </ControlLabel>
              <FormControl
                // onFocus={this.focusHandlerLocation}
                // onBlur={this.blurHandlerLocation}
                onChange={this.handleLocationChange}
                type='text'
                value={location}
                placeholder='63, av. Colonel Mondjiba, Ngaliema - Kinshasa'
                className='standard-radius-5'
              />
              <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
              {/* {location.length <= 0 && (
                <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
              )} */}

              {/* {!isFocusLocation && !isBlurLocation && isValidLocation && (
                <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
              )}

              {isFocusLocation && (
                <HelpBlock className='text-warning'>
                  {`L'adresse ne peut être constituée que de caractère vide.`}
                </HelpBlock>
              )}
              {isBlurLocation && !isValidLocation && (
                <HelpBlock className='text-danger'>
                  {`L'adresse que vous avez entré n'est pas valide.`}
                </HelpBlock>
              )}
              {isBlurLocation && isValidLocation && (
                <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
              )} */}
            </FormGroup>

            <FormGroup controlId='about-genre'>
              <ControlLabel>
                <strong>{'Genre'}</strong>
              </ControlLabel>
              <FormControl
                componentClass='select'
                onChange={this.handleGenderChange}
                value={gender.length === 0 ? '' : gender}
                className='standard-radius-5'
              >
                <option value=''></option>
                <option value='Femme'>Femme</option>
                <option value='Homme'>Homme</option>
              </FormControl>
              <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
              {/* {isValidGender && (
                <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
              )}
              {!isValidGender && (
                <HelpBlock className='text-danger'>
                  {`Les seuls genres autorisés sont Femme et Homme.`}
                </HelpBlock>
              )} */}
            </FormGroup>

            <FormGroup controlId='about-code'>
              <ControlLabel>
                <strong>{'Depuis quand codez-vous?'}</strong>
              </ControlLabel>
              <FormControl
                onChange={this.handleCodeTimeChange}
                type='date'
                value={codeTime}
                className='standard-radius-5'
              />
              <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
              {/* {isValidCodeTime && (
                <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
              )}
              {!isValidCodeTime && (
                <HelpBlock className='text-danger'>
                  {`La date dois être au format Jour/Mois/Année`}
                </HelpBlock>
              )} */}
            </FormGroup>

            <FormGroup controlId='about-about'>
              <ControlLabel>
                <strong>{'A propos'}</strong>
              </ControlLabel>
              <FormControl
                componentClass='textarea'
                // onFocus={this.focusHandlerAbout}
                // onBlur={this.blurHandlerAbout}
                onChange={this.handleAboutChange}
                value={about}
                className='standard-radius-5'
              />
              <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
              {/* {!isFocusAbout && !isBlurAbout && isValidAbout && (
                <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
              )}

              {isFocusAbout && (
                <HelpBlock className='text-warning'>
                  {'Maximum 300 caractères pour ce champ.'}
                </HelpBlock>
              )}
              {isBlurAbout && !isValidAbout && (
                <HelpBlock className='text-danger'>
                  {`Pas plus de 300 caractères toléré pour ce champ.`}
                </HelpBlock>
              )}
              {isBlurAbout && isValidAbout && (
                <HelpBlock className='none-help-block'>{'none'}</HelpBlock>
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

AboutSettings.displayName = 'AboutSettings';

export default withTranslation()(AboutSettings);
