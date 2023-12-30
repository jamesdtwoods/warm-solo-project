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
    // setLocation('')
    // history.push("/")
  }
  console.log('weather', theWeather);

  return (
    <div>
      <header className="App-header">
        <h1>Weather API</h1>
      </header>
      <br />
      {/* <input
        type="text"
        name="lat"
        required
        value={latitude}
        placeholder='latitude'
        onChange={(event) => setLatitude(event.target.value)}
      />  
      <input
        type="text"
        name="long"
        required
        value={longitude}
        placeholder='longitude'
        onChange={(event) => setLongitude(event.target.value)}
      />   */}
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
      <p>

        {/* {theWeather.properties.periods[0].temperature} */}
      </p>
    </div>
  );
}

export default Weather;
