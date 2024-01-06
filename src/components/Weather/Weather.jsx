import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Weather() {
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [location, setLocation] = useState('')
  const theWeather = useSelector(store => store.weather);
  const history = useHistory()
  const dispatch = useDispatch();

  const fetchWeather = () => {
    dispatch({ 
      type: 'SAGA/FETCH_WEATHER', 
      payload: location
    })
    setLocation('')
    // history.push("/")
  }

  const checkWeather = (theWeather) => {
    let check = false;
    if (theWeather.properties){
      check = true;
    }
    return check;
  }

  return (
    <div className="container">
      <h3>location:</h3>
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
      {checkWeather(theWeather) ? 
      <>
        <h3>Current weather:</h3> 
        <p>Temperature: {theWeather.properties.periods[0].temperature} ℉</p>
        <p>Current wind: {theWeather.properties.periods[0].windSpeed} {theWeather.properties.periods[0].windDirection}</p>
        <p>Current conditions: {theWeather.properties.periods[0].shortForecast}</p>
        <p>Probability of precipitation in next hour: {theWeather.properties.periods[0].probabilityOfPrecipitation.value}%</p>
      </> : <></>}
    </div>
  );
}

export default Weather;
