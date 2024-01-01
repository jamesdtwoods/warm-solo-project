import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

function WeatherHeader() {
  const user = useSelector(store => store.user);
  const theWeather = useSelector(store => store.weather);

  const checkWeather = (theWeather) => {
    let check = false;
    if (theWeather.properties){
      check = true;
    }
    return check;
  }

  return (
    <div className="header-weather">
        {!user.id && (
            <></>
        )}
        {user.id && checkWeather(theWeather) && (
            <p>Current weather: {theWeather.properties.periods[0].temperature} ℉</p>
        )}
        {user.id && !checkWeather(theWeather) && (
            <Link to="/weather">Get Weather</Link>
        )}
    </div>
  );
}

export default WeatherHeader;
