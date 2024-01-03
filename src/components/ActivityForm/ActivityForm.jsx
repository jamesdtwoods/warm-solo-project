import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

function ActivityForm() {
  const [date, setDate] = useState('');
  const [temperature, setTemperature] = useState('');
  const [weather, setWeather] = useState('');
  const [notes, setNotes] = useState('');
  const [activityType, setActivityType] = useState('');
  const activity_types = useSelector(store => store.activitiesReducer.activityType);
  const clothesList = useSelector(store => store.clothingReducer.clothingList);
  const history = useHistory();
  const dispatch = useDispatch();
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
    console.log('after sort', checkboxArray);
    checkboxArray.splice(count, checkboxArray.length-count)
    console.log('after splice', checkboxArray);

    return checkboxArray
  }

  const submitItem = () => {
    console.log('selected type:', checkedState);
    const newClothesArray = formatClothesArray(checkedState, clothesList);
    console.log('selected activity type:', activityType);
    console.log('newClothesArray:', newClothesArray);
    // dispatch({ 
    //   type: 'SAGA/POST_ACTIVITY', 
    //   payload: {
    //     date: date, 
    //     temperature: temperature,
    //     weather_conditions: weather,
    //     notes: notes,
    //     activity_type_id: activityType,
    //     clothesArray: newClothesArray
    //   }
    // })
    // setDate('')
    // setTemperature('')
    // setWeather('')
    // setNotes('')
    // history.push("/viewActivities")
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
        onChange={(e) => setActivityType(e.target.value)}
        defaultValue={activityType}>
        <option value=''></option>
        {activity_types.map(type => {
            return <option key={type.id} value={type.id}>{type.type}</option>
        })}
      </select>
      <br /><br />
      Closet:
      <br />
      {clothesList.map((item, index) => {
            return (<>
              <input 
                type="checkbox" 
                name='clothes' 
                value={item.id} 
                key={index} 
                checked={checkedState[index]} 
                onChange={() => handleOnChange(index)}
              />
              <label htmlFor='clothes'>{item.name}, {item.id}</label><br/>
            </>)
      })}
      <br /><br />
      <button onClick={submitItem}>SUBMIT</button>
      <button onClick={backToList}>CANCEL</button>
    </div>
  );
}

export default ActivityForm;