import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function ActivityForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const activity_types = useSelector(store => store.activitiesReducer.activityType);
  const clothesList = useSelector(store => store.clothingReducer.clothingList);
  const [date, setDate] = useState('');
  const [temperature, setTemperature] = useState('');
  const [weather, setWeather] = useState('');
  const [notes, setNotes] = useState('');
  const [activityType, setActivityType] = useState('');
  const [checkedState, setCheckedState] = useState(
    new Array(clothesList.length).fill(false)
  );  

  useEffect(() => {
    dispatch({ 
    type: 'SAGA/FETCH_ACTIVITY_TYPES'
    });
  }, []);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  const formatClothesArray = (checkboxArray, clothesListArray) => {
    let count = 0;
    for(let i=0; i<checkboxArray.length; i++) {
      if(checkboxArray[i]===true){
        checkboxArray[i] = clothesListArray[i].id;
        count++;
      }
    }
    checkboxArray.sort()
    checkboxArray.splice(count, checkboxArray.length-count)
    return checkboxArray
  }

  const submitItem = () => {
    const newClothesArray = formatClothesArray(checkedState, clothesList);
    dispatch({ 
      type: 'SAGA/POST_ACTIVITY', 
      payload: {
        date: date, 
        temperature: temperature,
        weather_conditions: weather,
        notes: notes,
        activity_type_id: activityType,
        clothesArray: newClothesArray
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
      <Button size='sm' variant='back' onClick={backToList}>Back to activities log</Button>
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
        onChange={(e) => setActivityType(e.target.value)}
        defaultValue={activityType}>
        <option value=''></option>
        {activity_types.map(type => {
            return <option key={type.id} value={type.id}>{type.type}</option>
        })}
      </select>
      <br /><br />
      <strong>Closet:</strong>
      <br />
      {clothesList.map((item, index) => {
        if (item.clothing_type_id === 1) {
            return (<>
              <p className='list'>Hats:</p>
              <input 
                type="checkbox" 
                name='clothes' 
                value={item.id} 
                key={index} 
                checked={checkedState[index]} 
                onChange={() => handleOnChange(index)}
              />
              <label htmlFor='clothes'>{item.name}, {item.id}</label><br/>
          </>)}
        if (item.clothing_type_id === 2) {
          return (<>
            <p className='list'>Gloves:</p>
            <input 
              type="checkbox" 
              name='clothes' 
              value={item.id} 
              key={index} 
              checked={checkedState[index]} 
              onChange={() => handleOnChange(index)}
            />
            <label htmlFor='clothes'>{item.name}, {item.id}</label><br/>
          </>)}
        if (item.clothing_type_id === 3) {
          return (<>
            <p className='list'>Socks:</p>
            <input 
              type="checkbox" 
              name='clothes' 
              value={item.id} 
              key={index} 
              checked={checkedState[index]} 
              onChange={() => handleOnChange(index)}
            />
            <label htmlFor='clothes'>{item.name}, {item.id}</label><br/>
          </>)}
        if (item.clothing_type_id === 4) {
          return (<>
            <p className='list'>Base Layer Top:</p>
            <input 
              type="checkbox" 
              name='clothes' 
              value={item.id} 
              key={index} 
              checked={checkedState[index]} 
              onChange={() => handleOnChange(index)}
            />
            <label htmlFor='clothes'>{item.name}, {item.id}</label><br/>
          </>)}
        if (item.clothing_type_id === 5) {
          return (<>
            <p className='list'>Base Layer Botttom:</p>
            <input 
              type="checkbox" 
              name='clothes' 
              value={item.id} 
              key={index} 
              checked={checkedState[index]} 
              onChange={() => handleOnChange(index)}
            />
            <label htmlFor='clothes'>{item.name}, {item.id}</label><br/>
          </>)}
        if (item.clothing_type_id === 6) {
          return (<>
            <p className='list'>Jacket:</p>
            <input 
              type="checkbox" 
              name='clothes' 
              value={item.id} 
              key={index} 
              checked={checkedState[index]} 
              onChange={() => handleOnChange(index)}
            />
            <label htmlFor='clothes'>{item.name}, {item.id}</label><br/>
          </>)}
        if (item.clothing_type_id === 7) {
          return (<>
            <p className='list'>Pants:</p>
            <input 
              type="checkbox" 
              name='clothes' 
              value={item.id} 
              key={index} 
              checked={checkedState[index]} 
              onChange={() => handleOnChange(index)}
            />
            <label htmlFor='clothes'>{item.name}, {item.id}</label><br/>
          </>)}
        if (item.clothing_type_id === 8) {
          return (<>
            <p className='list'>Accesories:</p>
            <input 
              type="checkbox" 
              name='clothes' 
              value={item.id} 
              key={index} 
              checked={checkedState[index]} 
              onChange={() => handleOnChange(index)}
            />
            <label htmlFor='clothes'>{item.name}, {item.id}</label><br/>
          </>)}
        if (item.clothing_type_id === 9) {
          return (<>
            <p className='list'>Other:</p>
            <input 
              type="checkbox" 
              name='clothes' 
              value={item.id} 
              key={index} 
              checked={checkedState[index]} 
              onChange={() => handleOnChange(index)}
            />
            <label htmlFor='clothes'>{item.name}, {item.id}</label><br/>
          </>)}
      })}
      <br /><br />
      <Button size='sm' variant='back' onClick={backToList}>Cancel</Button>
      <Button size='sm' variant='add' onClick={submitItem}>Add to Activity Log</Button>
    </div>
  );
}

export default ActivityForm;