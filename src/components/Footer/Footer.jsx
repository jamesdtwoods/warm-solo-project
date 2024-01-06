import React from 'react';
import favicon from '../Navbar/warm_favicon_2.png'

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return <footer>
      <p>
        <img className='brand-logo-footer' src={favicon}></img>
        <br />
        Stay<text className='brand-name-footer'> warm</text> out there
        <br />
        &copy; James Woods 2024
      </p>
    </footer>;
}

export default Footer;
