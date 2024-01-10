import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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

  const formatClothesArrayForEdit = (checkboxArray, clothesListArray) => {
    let count = 0;
    for(let i=0; i<checkboxArray.length; i++) {
      if(checkboxArray[i]===true){
        checkboxArray[i] = clothesListArray[i];
        count++;
      }
    }
    checkboxArray.sort()
    checkboxArray.splice(count, checkboxArray.length-count)
    return checkboxArray
  }

  const formatPreviousClothesArray = (checkboxArray) => {
    let formattedArray=[];
    for(let i=0; i<checkboxArray.length; i++){
      formattedArray.push(checkboxArray[i].checked)
    }
    return formattedArray
  }

  const handleChange = (newValue, inputName) => {
    dispatch({
      type: 'MODIFY_ACTIVITY',
      payload: {newValue: newValue, property: inputName}
    })
  }

  const submitItem = () => {
    const newClothesArrayForEdit = formatClothesArrayForEdit(checkedState, clothesList);
    handleChange(newClothesArrayForEdit, 'clothesArray')
    dispatch({ 
      type: 'SAGA/EDIT_ACTIVITY', 
      payload: {
        id: id,
        data:{
          activity: activity,
          clothesArrayForQuery: newClothesArrayForEdit
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
    formatPreviousClothesArray(checkPreviousClothes(clothesList, activity.clothesArray))
  ); 


  const handleCancel = () => {
    history.replace(`/editActivity/${id}`)
    history.goBack()
  }

  const checkFunction = (clothesList, clothing_type_id) => {
    let check = false;
    for (let item of clothesList) {
      if (item.clothing_type_id === clothing_type_id) {
        check = true;
      }
    }
    return check;
  }

  const mapFunction = (clothesList, clothing_type_id) => {
    let clothesArray=[]
    for (let i=0; i< clothesList.length; i++) {
      if(clothesList[i].clothing_type_id === clothing_type_id){
        clothesList[i].index = i;
        clothesArray.push(clothesList[i]);
      }
    }
    return clothesArray.map((clothing_item, index) => {
      return (<>
                <input 
                  type="checkbox" 
                  name='clothes' 
                  value={clothing_item.id} 
                  key={clothing_item.index} 
                  checked={checkedState[clothing_item.index]} 
                  onChange={() => handleOnChange(clothing_item.index)}
                />
                <label htmlFor='clothes'>{clothing_item.name}, {clothing_item.id}</label><br/>
              </>)
    })
  }

  // const mapFunction = (clothesList, clothing_type_id) => {
  //   let clothesArray=[]
  //   for (let i=0; i< clothesList.length; i++) {
  //     if(clothesList[i].clothing_type_id === clothing_type_id){
  //       clothesList[i].index = i;
  //       clothesArray.push(clothesList[i]);
  //     }
  //   }
  //   return clothesArray.map((clothing_item, index) => {
  //     return (<>
  //               <input 
  //                 type="checkbox" 
  //                 name='clothes' 
  //                 value={clothing_item.id} 
  //                 key={clothing_item.index} 
  //                 checked={checkedState[clothing_item.index].checked} 
  //                 onChange={() => handleOnChange(clothing_item.index)}
  //               />
  //               <label htmlFor='clothes'>{clothing_item.name}, {clothing_item.id}</label><br/>
  //             </>)
  //   })
  // }

  // const mapFunction = (clothesList, clothing_type_id) => {
  //   let clothesArray=[]
  //   for (let clothing_item of clothesList) {
  //     if(clothing_item.clothing_type_id === clothing_type_id){
  //       clothesArray.push(clothing_item);
  //     }
  //   }
    
  //   console.log('clothes array', clothesArray);
  //   return clothesArray.map((clothing_item, index) => {
  //     return (<>
  //               <input 
  //                 type="checkbox" 
  //                 name='clothes' 
  //                 value={clothing_item.id} 
  //                 key={index} 
  //                 checked={checkedState[index].checked} 
  //                 onChange={() => handleOnChange(index)}
  //               />
  //               <label htmlFor='clothes'>{clothing_item.name}, {clothing_item.id}</label><br/>
  //             </>)
  //   })
  // }

  console.log('checked state', checkedState);

  return (
    <div className="container">
      <Button size='sm' variant='back' onClick={handleCancel}>Back to Activity</Button>
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
        How did you feel?:
        <select name="type"
          onChange={(e) => handleChange(e.target.value, 'feel')}
          defaultValue={activity.feel}>
          <option value='hot'>Too Hot 🥵</option>
          <option value='cold'>Too Cold 🥶</option>
          <option value='right'>Just Right 😎</option>
        </select>
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
        <select 
        name="type"
        id='activity_type_id'
        onChange={(e) => handleChange(e.target.value, 'activity_type_id')}
        defaultValue={activity.activity_type_id}>
        {activity_types.map(type => {
            return <option key={type.id} value={type.id}>{type.type}</option>
        })}
        </select>
        <br /><br />
        <h2>Closet</h2>
        {checkFunction(clothesList, 1) ? 
          <> <p className='list-bold'>Hats:</p> 
            <ul>
              {mapFunction(clothesList, 1)}
            </ul>
          </> 
        : <></>}
        {checkFunction(clothesList, 2) ? 
          <> <p className='list-bold'>Gloves:</p> 
            <ul>
              {mapFunction(clothesList, 2)}
            </ul>
          </> 
        : <></>}
        {checkFunction(clothesList, 3) ? 
          <> <p className='list-bold'>Socks:</p> 
            <ul>
              {mapFunction(clothesList, 3)}
            </ul>
          </> 
        : <></>}
        {checkFunction(clothesList, 4) ? 
          <> <p className='list-bold'>Base Layer - Top:</p> 
            <ul>
              {mapFunction(clothesList, 4)}
            </ul>
          </> 
        : <></>}
        {checkFunction(clothesList, 5) ? 
          <> <p className='list-bold'>Base Layer - Bottom:</p> 
            <ul>
              {mapFunction(clothesList, 5)}
            </ul>
          </> 
        : <></>}
        {checkFunction(clothesList, 6) ? 
          <> <p className='list-bold'>Jackets:</p> 
            <ul>
              {mapFunction(clothesList, 6)}
            </ul>
          </> 
        : <></>}
        {checkFunction(clothesList, 7) ? 
          <> <p className='list-bold'>Pants:</p> 
            <ul>
              {mapFunction(clothesList, 7)}
            </ul>
          </> 
        : <></>}
        {checkFunction(clothesList, 8) ? 
          <> <p className='list-bold'>Accessories:</p> 
            <ul>
              {mapFunction(clothesList, 8)}
            </ul>
          </> 
        : <></>}
        {checkFunction(clothesList, 9) ? 
          <> <p className='list-bold'>Other:</p> 
            <ul>
              {mapFunction(clothesList, 9)}
            </ul>
          </> 
        : <></>}
        <br />
        <Button size='sm' variant='back' onClick={handleCancel}>Cancel</Button>
        <Button size='sm' variant='add' onClick={submitItem}>Add to Activity Log</Button>
    </div>
  );
}

export default ActivityFormEdit;