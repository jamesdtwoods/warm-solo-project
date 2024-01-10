import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Button, Spinner } from 'react-bootstrap';

function Weather() {
  const [location, setLocation] = useState(null)
  const theWeather = useSelector(store => store.weather);
  const dispatch = useDispatch();

  const fetchWeather = () => {
    dispatch({ 
      type: 'SAGA/FETCH_WEATHER', 
      payload: location
    })
    setLocation('')
  }

  const checkWeather = (theWeather) => {
    if (theWeather.properties && location===null || theWeather.properties && location===''){
      return (
        <>
          <h3>Current weather:</h3> 
          <p>Temperature: {theWeather.properties.periods[0].temperature} ℉</p>
          <p>Current wind: {theWeather.properties.periods[0].windSpeed} {theWeather.properties.periods[0].windDirection}</p>
          <p>Current conditions: {theWeather.properties.periods[0].shortForecast}</p>
          <p>Probability of precipitation in next hour: {theWeather.properties.periods[0].probabilityOfPrecipitation.value}%</p>
        </> 
      )
    } else if (location==='') {
    return <Spinner animation='border' />;}
  }

  return (
    <div className="container">
      <h3>Location:</h3>
      <input
        type="text"
        name="location"
        required
        value={location}
        placeholder='location'
        onChange={(event) => setLocation(event.target.value)}
      />  
      <Button size='sm' variant='add' onClick={fetchWeather}>Get Weather</Button>
      <br />
      {checkWeather(theWeather)}
    </div>
  );
}

export default Weather;
