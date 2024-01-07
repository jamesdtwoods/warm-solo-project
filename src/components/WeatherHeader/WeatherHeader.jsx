import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

function WeatherHeader() {
  const user = useSelector(store => store.user);
  const theWeather = useSelector(store => store.weather);
  const history = useHistory()

  const checkWeather = (theWeather) => {
    let check = false;
    if (theWeather.properties){
      check = true;
    }
    return check;
  }

  const toWeather = () => {
    history.push(`/weather`)
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
            <Button size='sm' variant='weather' onClick={toWeather}>Get Weather</Button>
        )}
    </div>
  );
}

export default WeatherHeader;
