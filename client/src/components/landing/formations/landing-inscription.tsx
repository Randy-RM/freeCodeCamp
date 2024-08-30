import React from 'react';

function LandingInscription() {
  return (
    <section className='call-to-sing__section'>
      <h3 className='sing__section__title'>
        Commence ta formation gratuite. Inscris toi maintenant !
      </h3>
      <form className='sing__section-form'>
        <input
          type='text'
          placeholder='Ton numéro de téléphone'
          className='sing__section__input'
        />
        <input
          type='text'
          placeholder='Créer un mot de passe'
          className='sing__section__input'
        />
        <button className='sing__section__button'> S&apos;inscrire</button>
      </form>
    </section>
  );
}

export default LandingInscription;
