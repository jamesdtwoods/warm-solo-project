import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

function WeatherHeader() {
  const user = useSelector(store => store.user);
  const theWeather = useSelector(store => store.weather);
  const history = useHistory()

  const toWeather = () => {
    history.push(`/weather`)
  }

  return (
    <div className="header-weather">
        {!user.id && (
            <></>
        )}
        {user.id && theWeather.properties && (
          <p>Current weather: {theWeather.properties.periods[0].temperature} ℉
          <Button size='md' variant='weather' onClick={toWeather}>View Details</Button></p>
        )}
        {user.id && !theWeather.properties && (
            <Button size='md' variant='weather' onClick={toWeather}>Get Weather</Button>
        )}
    </div>
  );
}

export default WeatherHeader;
