import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import ClothingForm from '../Clothes/ClothingForm';

function ActivityForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const activity_types = useSelector(store => store.activitiesReducer.activityType);
  const clothesList = useSelector(store => store.clothingReducer.clothingList);
  const [date, setDate] = useState('');
  const [goldilocks, setGoldilocks] = useState('');
  const [temperature, setTemperature] = useState('');
  const [weather, setWeather] = useState('');
  const [notes, setNotes] = useState('');
  const [activityType, setActivityType] = useState('');
  const [checkedState, setCheckedState] = useState(
    new Array(clothesList.length).fill(false)
  );
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        feel: goldilocks,
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
      How did you feel?:
      <select name="type"
        onChange={(e) => setGoldilocks(e.target.value)}
        defaultValue={goldilocks}>
        <option value=''></option>
        <option value='Too hot 🥵'>Too Hot 🥵</option>
        <option value='Too cold 🥶'>Too Cold 🥶</option>
        <option value='Just right 😎'>Just Right 😎</option>
      </select>
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
      {/* wrapping this in a blank tag to minimize code */}
      <>
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
        </>
      <Button size='sm' variant='back' onClick={handleShow}>Add New Clothing Item</Button>
      <br /><br />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
        <Modal.Title>Add new item to closet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ClothingForm handleClose={handleClose}/>
        </Modal.Body>
      </Modal>
      <Button size='sm' variant='back' onClick={backToList}>Cancel</Button>
      <Button size='sm' variant='add' onClick={submitItem}>Add Activity to Log</Button>
    </div>
  );
}

export default ActivityForm;