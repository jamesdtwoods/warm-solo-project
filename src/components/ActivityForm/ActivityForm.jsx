import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

function ActivityForm() {
  const [date, setDate] = useState('');
  const [temperature, setTemperature] = useState('');
  const [weather, setWeather] = useState('');
  const [notes, setNotes] = useState('');
  const activity_types = useSelector(store => store.activitiesReducer.activityType);
  const history = useHistory()
  let selectedType;
  console.log('activity_types', activity_types);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('in use effect/fetch activity types');
    dispatch({ 
    type: 'SAGA/FETCH_ACTIVITY_TYPES'
    });
  }, []);

  const setType = (value) => {
    selectedType = value;
    return selectedType;
}

const submitItem = () => {
  dispatch({ 
    type: 'SAGA/POST_ACTIVITY', 
    payload: {
      date: date, 
      temperature: temperature,
      weather_conditions: weather,
      notes: notes,
      activity_type_id: selectedType
    }
  })
  setDate('')
  setTemperature('')
  setWeather('')
  setNotes('')
  history.push("/viewActivities")
}


  return (
    <div className="activity_form">

      Activity Date:
      <input
        type="date"
        name="date"
        required
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />  
      <br /><br />
      Temperature:
      <input
        type="number"
        name="temperature"
        required
        value={temperature}
        onChange={(event) => setTemperature(event.target.value)}
      />  
      <br /><br />
      Weather:
      <input
        type="text"
        name="weather"
        required
        value={weather}
        onChange={(event) => setWeather(event.target.value)}
      />  
      <br /><br />
      Notes:
      <input
        type="text"
        name="notes"
        required
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
      />  
      <br /><br />
      Activity Type:
      <select name="type"
        onChange={(e) => setType(e.target.value)}
        defaultValue=''>
        <option value=''></option>
        {activity_types.map(type => {
            return <option key={type.id} value={type.id}>{type.type}</option>
        })}
      </select>
      <button onClick={submitItem}>SUBMIT</button>
    </div>
  );
}

export default ActivityForm;