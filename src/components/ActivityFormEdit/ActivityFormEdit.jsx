import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function ActivityFormEdit() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const activity_types = useSelector(store => store.activitiesReducer.activityType);
  const clothesList = useSelector(store => store.clothingReducer.clothingList);
  const activity = useSelector(store => store.activitiesReducer.selectedActivity);




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

  const formatDate = (dateInput) => {
    let year = dateInput.split('T',1)[0].split('-')[0]
    let month = dateInput.split('T',1)[0].split('-')[1]
    let day = dateInput.split('T',1)[0].split('-')[2]
    return `${year}-${month}-${day}`
}

  const [date, setDate] = useState(formatDate(activity.date));
  const [temperature, setTemperature] = useState(activity.temperature);
  const [weather, setWeather] = useState(activity.weather_conditions);
  const [notes, setNotes] = useState(activity.notes);
  const [activityType, setActivityType] = useState('');
  const [checkedState, setCheckedState] = useState(
    clothesList.map(item => item.id)
  ); 

  // console.log('checked state', checkedState);
  // console.log('previous clothes', activity.clothes);
  // console.log('clothes list', clothesList);

  const checkPreviousClothes = (checkbox, previousClothes) => {
    for(let i=0; i<checkbox.length; i++) {
      for(let j=0; j<previousClothes.length; j++){
        if(checkbox[i] === previousClothes[j].clothes_id){
          checkbox[i]=true;
        } 
      }
    }

    for (let i=0; i<checkbox.length; i++){
      if(checkbox[i] !== true) {
        checkbox[i] = false
      }
    }
    // for (let i=0; i<checkbox.length; i++){
    //   if(checkbox[i] === 'true') {
    //     checkbox[i] = true
    //   }
    // }
    // checkboxArray.sort()
    // console.log('after sort', checkboxArray);
    // checkboxArray.splice(count, checkboxArray.length-count)
    // console.log('after splice', checkboxArray);

    return checkbox
  }

  console.log('checkbox function', checkPreviousClothes(checkedState, activity.clothes));

  // let selectedType;
  // const setType = (value) => {
  //   selectedType = value;
  //   return selectedType;
  // }

  // let clothesArray=[];
  // const addClothes = (id) => {  
  //   clothesArray.push(id)
  //   return clothesArray;
  // } 
  
  const handleCancel = () => {
    history.push(`/viewActivity/${id}`)
  }

  return (
    <div className="container">
      <button onClick={handleCancel}>Back to Activity</button>
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
        <strong>Closet:</strong>
      <br />
      {clothesList.map((item, index) => {
        if (item.clothing_type_id === 1) {
            return (<>
              <p>Hats:</p>
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
            <p>Gloves:</p>
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
            <p>Socks:</p>
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
            <p>Base Layer Top:</p>
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
            <p>Base Layer Botttom:</p>
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
            <p>Jacket:</p>
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
            <p>Pants:</p>
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
            <p>Accesories:</p>
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
            <p>Other:</p>
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
        <button onClick={submitItem}>Add to Activity Log</button>
        <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}

export default ActivityFormEdit;