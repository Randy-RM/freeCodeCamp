import React from 'react';
import { Link } from '@reach/router';
import { Grid } from '@freecodecamp/react-bootstrap';
import { VscTriangleRight } from 'react-icons/vsc';
// import Whatsapp from '../../assets/images/whatsapp.png';
import logo from '../../assets/icons/logo.png';
import './style.css';
import { Image } from '../../../../tools/ui-components/src/image/image';

const linksSections = [
  {
    title: 'Formations',
    links: [
      {
        label: 'Bootcamp carrière',
        link: '#'
      },
      {
        label: 'Boost',
        link: '#'
      },
      {
        label: 'Online',
        link: '#'
      }
    ]
  },
  {
    title: 'Entreprises',
    links: [
      {
        label: 'Kadea Academy',
        link: '#'
      },
      {
        label: 'KADEA SOFTWARE',
        link: '#'
      }
    ]
  },
  {
    title: 'Communauté',
    links: [
      {
        label: 'State of Dev',
        link: '#'
      }
    ]
  }
];

function Footer() {
  const date = new Date().getFullYear();

  return (
    <footer className='footer-section'>
      <Grid>
        <section className='flex flex-col gap-md items-center'>
          <Link to='/'>
            <Image src={logo} alt='Logo' className='logo' />
          </Link>
          <div className='w-full grid gap-md grid-cols-2 md-grid-cols-3'>
            {linksSections.map((section, id) => (
              <div className='w-full flex flex-col' key={id.valueOf()}>
                <h4 className='text-white links-section-title'>
                  {section.title}
                </h4>
                <div className='w-full flex flex-col links-section-links'>
                  {section.links.map((link, i) => (
                    <a
                      href={link.link}
                      target='_blank'
                      rel='noreferrer'
                      className='w-full flex items-center links-section-link'
                      key={i.valueOf()}
                    >
                      <span className='text-primary triangle-icon'>
                        <VscTriangleRight />
                      </span>
                      <span className='text-white'>{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <small className='text-white'>
            Kadea Online {date}. Tous droits résérvés
          </small>
        </section>
      </Grid>
    </footer>
  );
}

export default Footer;
