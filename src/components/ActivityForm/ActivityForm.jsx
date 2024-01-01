import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

function ActivityForm() {
  const [date, setDate] = useState('');
  const [temperature, setTemperature] = useState('');
  const [weather, setWeather] = useState('');
  const [notes, setNotes] = useState('');
  const activity_types = useSelector(store => store.activitiesReducer.activityType);
  const clothesList = useSelector(store => store.clothingReducer.clothingList);
  const history = useHistory();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch({ 
    type: 'SAGA/FETCH_ACTIVITY_TYPES'
    });
  }, []);

  let selectedType;
  const setType = (value) => {
    selectedType = value;
    return selectedType;
  }

  let clothesArray=[];
  const addClothes = (id) => {  
    clothesArray.push(id)
    return clothesArray;
  } 

  const submitItem = () => {
    dispatch({ 
      type: 'SAGA/POST_ACTIVITY', 
      payload: {
        date: date, 
        temperature: temperature,
        weather_conditions: weather,
        notes: notes,
        activity_type_id: selectedType,
        clothesArray: clothesArray
      }
    })
    setDate('')
    setTemperature('')
    setWeather('')
    setNotes('')
    history.push("/viewActivities")
  }

  const backToList = () => {
    history.push(`/viewActivities`)
  }

  return (
    <div className="container">
      <button onClick={backToList}>Back to activities list</button>
      <br /><br />
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
      <br /><br />
      Clothes:
      {/* {clothesList.map(item => {
            return (<>
              <input type="checkbox" name='clothes' value={item.id} key={item.id} onClick={(e) => addClothes(e.target.value)}/>
              <label for='clothes'>{item.name}</label><br/>
            </>)
      })} */}
      <select name="clothes"
        onChange={(e) => addClothes(e.target.value)}
        multiple>
        {clothesList.map(item => {
            return <option key={item.id} value={item.id}>{item.name}</option>
        })}
      </select>
      <br /><br />
      <button onClick={submitItem}>SUBMIT</button>
      <button onClick={backToList}>CANCEL</button>
    </div>
  );
}

export default ActivityForm;