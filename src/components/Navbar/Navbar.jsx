import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import favicon from './favicon.ico'
// import './Navbar.css';

function Navbar() {
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    const user = useSelector((store) => store.user);
    const history = useHistory();

    const toHome = () => {
      setIsNavExpanded(false)
      history.push(`/home`)
    }
    const toClothes = () => {
      setIsNavExpanded(false)
      history.push(`/viewClothes`)
    }
    const toActivities = () => {
      setIsNavExpanded(false)
      history.push(`/viewActivities`)
    }
    return (
        <nav className="navigation">
            <h1 className="brand-name" onClick={toHome}>
            <img className='brand-logo' src={favicon}></img>warm 
            </h1>  
        {user.id && (
            <>
          <button 
            className="hamburger"
            onClick={() => {
            setIsNavExpanded(!isNavExpanded);
            }}
          >
            {/* icon from heroicons.com */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="white"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div
            className={
                isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
            }>
            <ul>
              <li className="nav" onClick={toHome}>
                Home
              </li>
              <li className="nav" onClick={toClothes}>
                Closet
              </li>
              <li className="nav" onClick={toActivities}>
                Activity Log
              </li>
                <LogOutButton className="navLink" />
            </ul>
          </div>
          </>
          )}
        </nav>
      )
}

export default Navbar;