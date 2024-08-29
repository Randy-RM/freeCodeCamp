import React from 'react';
import './formation.css';
import { useNavigate } from '@reach/router';

function Formations() {
  const navigate = useNavigate();
  return (
    <section className='formation'>
      <h2 className='formation__title'>
        Découvre les formations gratuites de Kadea{' '}
        <span className='formation__title-rouge'>Online</span>
      </h2>
      <div className='formation__button_list'>
        <button
          className='button-list'
          onClick={() => void navigate('/catalogue')}
        >
          Business
        </button>
        <button
          className='button-list'
          onClick={() => void navigate('/catalogue/Amazon-Web-Service')}
        >
          AWS
        </button>
        <button
          className='button-list'
          onClick={() => void navigate('/catalogue')}
        >
          Healt
        </button>
        <button
          className='button-list'
          onClick={() => void navigate('/catalogue/programmation')}
        >
          Computer Science
        </button>
        <button
          className='button-list'
          onClick={() => void navigate('/catalogue/intelligence')}
        >
          Data Science
        </button>

        <button
          className='button-list'
          onClick={() => void navigate('/catalogue/bureautique')}
        >
          Information Technology
        </button>
      </div>
    </section>
  );
}

export default Formations;
