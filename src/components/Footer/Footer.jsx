import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return <footer>
      Stay<text className='brand-name-footer'> warm</text> out there
      <br />&copy; James Woods 2024
    </footer>;
}

export default Footer;
