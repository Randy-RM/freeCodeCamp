import React, { FormEvent } from 'react';
import './styles.css';

function LandingSignupForm() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className='w-full bg-primary p-normal rounded-xs grid grid-cols-1 md-grid-cols-2 gap'>
      <div className='hide-on-mobile'></div>
      <form
        onSubmit={onSubmit}
        className='flex flex-col gap landing-signup-form'
      >
        <h3 className='flex flex-col items-center'>
          <span className='text-white text-center'>
            Commence ta formation gratuite.
          </span>
          <span className='text-white text-center'>
            Inscris toi maintenant !
          </span>
        </h3>
        <input
          type='text'
          className='form-control'
          placeholder='Ton numéro de téléphone'
        />
        <input
          type='password'
          className='form-control'
          placeholder='Créer un mot de passe'
        />
        <button className='submit-btn'>
          <span>S&apos;inscrire</span>
        </button>
      </form>
    </section>
  );
}

export default LandingSignupForm;
