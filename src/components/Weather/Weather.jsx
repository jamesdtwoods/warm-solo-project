import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

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
      <h3>Weather API</h3>
      <h3>location: (NO SPACES)</h3>
      <input
        type="text"
        name="location"
        required
        value={location}
        placeholder='location'
        onChange={(event) => setLocation(event.target.value)}
      />  
      <button onClick={fetchWeather}>Get Weather</button>
      <br />
      {checkWeather(theWeather) ? 
      <p>
        {theWeather.properties.periods[0].temperature}
      </p>
       : <></>}
    </div>
  );
}

export default Weather;
