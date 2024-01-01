import './Navbar.css';
import { useState } from "react";
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

function Navbar() {
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    const user = useSelector((store) => store.user);

    return (
        <nav className="navigation">
            <h2 className="brand-name">
                warm
            </h2>
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
              <li>
                <Link className="navLink" to="/user">
                    Home
                </Link>
              </li>
              <li>
                <Link className="navLink" to="/viewClothes">
                    Clothes List
                </Link>
              </li>
              <li>
                <Link className="navLink" to="/viewActivities">
                    Activity List
                </Link>
              </li>
              <li>
                <LogOutButton className="navLink" />
              </li>
            </ul>
          </div>
          </>
          )}
        </nav>
      )
}

export default Navbar;