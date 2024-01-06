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
  
  useEffect(() => {
    dispatch({ 
    type: 'SAGA/FETCH_ACTIVITY_TYPES'
    });
  }, []);

  const formatClothesArray = (checkboxArray) => {
    console.log('before filter', checkboxArray);
    const filteredArray = checkboxArray.filter(item => item.checked)
    console.log('after filter', filteredArray);
    return filteredArray
  }

  const handleChange = (newValue, inputName) => {
    console.log('value and input', newValue, inputName);
    dispatch({
      type: 'MODIFY_ACTIVITY',
      payload: {newValue: newValue, property: inputName}
    })
  }

  const submitItem = () => {
    const newClothesArray = formatClothesArray(checkedState);
    console.log('new clothes array', newClothesArray);
    dispatch({ 
      type: 'SAGA/EDIT_ACTIVITY', 
      payload: {
        id: id,
        data: {
          date: activity.date, 
          temperature: activity.temperature,
          weather_conditions: activity.weather_conditions,
          notes: activity.notes,
          activity_type_id: activity.activity_type_id,
          clothesArray: newClothesArray
        }
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
  const checkPreviousClothes = (checkbox, previousClothes) => {
    for(let i=0; i<checkbox.length; i++) {
      for(let j=0; j<previousClothes.length; j++){
        if(checkbox[i].id === previousClothes[j].clothes_id){
          checkbox[i].checked=true;
        } 
      }
    }
    for (let i=0; i<checkbox.length; i++){
      if(checkbox[i].checked !== true) {
        checkbox[i].checked = false
      }
    }
    return checkbox
  }


  const [checkedState, setCheckedState] = useState(
    checkPreviousClothes(clothesList.map(item => item), activity.clothesArray)
    // clothesList.map(item => item)
  //   clothesList.map(item => {
  //     return ({
  //       clothes_id: item.id,
  //       name: item.name,
  //       clothing_type: item.id
  //     })
  // })
  ); 
  console.log('starting clothes array', checkedState);

  const handleClothingChange = (position) => {
    setCheckedState(checkedState.map((item, index) => {
      console.log('in map, item, index', item, index);
      if(index === position) {
        console.log('in conditional, item.checked:', item.checked);
        item.checked = !item.checked
      }
      return item
    }))
  };

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
        value={formatDate(activity.date)}
        onChange={(e) => handleChange(e.target.value, 'date')}
        />  
        <br /><br />
        Temperature:
        <input
        type="number"
        name="temperature"
        required
        value={activity.temperature}
        onChange={(e) => handleChange(e.target.value, 'temperature')}
        />  
        <br /><br />
        Weather:
        <input
        type="text"
        name="weather"
        required
        value={activity.weather_conditions}
        onChange={(e) => handleChange(e.target.value, 'weather_conditions')}
        />  
        <br /><br />
        Notes:
        <input
        type="text"
        name="notes"
        required
        value={activity.notes}
        onChange={(e) => handleChange(e.target.value, 'notes')}
        />  
        <br /><br />
        Activity Type: 
        <select name="type"
        onChange={(e) => handleChange(e.target.value, 'activity_type_id')}
        defaultValue={activity.activities_id}>
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
              <p>Hats:</p>
              <input 
                type="checkbox" 
                name='clothes' 
                value={item.id} 
                key={index} 
                checked={checkedState[index].checked} 
                onChange={() => handleClothingChange(index)}
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
              checked={checkedState[index].checked} 
              onChange={() => handleClothingChange(index)}
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
              checked={checkedState[index].checked} 
              onChange={() => handleClothingChange(index)}
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
              checked={checkedState[index].checked} 
              onChange={() => handleClothingChange(index)}
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
              checked={checkedState[index].checked} 
              onChange={() => handleClothingChange(index)}
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
              checked={checkedState[index].checked} 
              onChange={() => handleClothingChange(index)}
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
              checked={checkedState[index].checked} 
              onChange={() => handleClothingChange(index)}
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
              checked={checkedState[index].checked} 
              onChange={() => handleClothingChange(index)}
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
              checked={checkedState[index].checked} 
              onChange={() => handleClothingChange(index)}
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