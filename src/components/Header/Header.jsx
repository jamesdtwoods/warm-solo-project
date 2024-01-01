import React from 'react';
import { Link } from 'react-router-dom';

function Header() {

  return (
    <div className="header">
      <Link to="/home">
        <h2 className="header-title">warm</h2>
      </Link>
    </div>
  );
}

export default Header;
