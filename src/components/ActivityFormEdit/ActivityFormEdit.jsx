import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function ActivityFormEdit() {
    const activity_types = useSelector(store => store.activitiesReducer.activityType);
    const clothesList = useSelector(store => store.clothingReducer.clothingList);
    const activity = useSelector(store => store.activitiesReducer.selectedActivity);
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();

    console.log('activity', activity);
  
  useEffect(() => {
    dispatch({ 
    type: 'SAGA/FETCH_ACTIVITY_TYPES'
    });
  }, []);

  const submitItem = () => {
    dispatch({ 
      type: 'SAGA/EDIT_ACTIVITY', 
      payload: {
        date: date, 
        temperature: temperature,
        weather_conditions: weather,
        notes: notes,
        activity_type_id: selectedType,
        clothesArray: clothesArray,
        id: id
      }
    })
    history.push(`/viewActivity/${id}`)
  }

  const [date, setDate] = useState(activity.date);
  const [temperature, setTemperature] = useState(activity.temperature);
  const [weather, setWeather] = useState(activity.weather_conditions);
  const [notes, setNotes] = useState(activity.notes);

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
  
  const handleCancel = () => {
    history.push(`/viewActivity/${id}`)
  }

  return (
    <div className="container">
      <button onClick={handleCancel}>Back to Activity</button>
        Activity Date:
        {/* is there a way to have the previous date? */}
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
        defaultValue={activity.activities_id}>
        {activity_types.map(type => {
            return <option key={type.id} value={type.id}>{type.type}</option>
        })}
        </select>
        <br /><br />
        Previous Clothes:
        <ul>
            {activity.clothes.map((clothingItem) => (
              
              <li key={clothingItem.clothes_id}>{clothingItem.name}, {clothingItem.clothing_type}</li> 
              
          ))}
        </ul>
        {/* is there a way to have the previous choices selected? */}
        <select name="clothes"
        onChange={(e) => addClothes(e.target.value)}
        multiple>
        {clothesList.map(item => {
            return <option key={item.id} value={item.id}>{item.name}</option>
        })}
        </select>
        <br /><br />
        <button onClick={submitItem}>SUBMIT</button>
        <button onClick={handleCancel}>CANCEL</button>
    </div>
  );
}

export default ActivityFormEdit;