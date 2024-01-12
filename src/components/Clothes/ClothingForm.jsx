import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function ClothingForm({handleClose}) {
  const history = useHistory(); 
  const dispatch = useDispatch();
  const clothing_types = useSelector(store => store.clothingReducer.clothingType);
  const [item, setItem] = useState(null);
  const [description, setDescription] = useState('');
  const [clothingType, setClothingType] = useState('');
 
  useEffect(() => {
    dispatch({ 
    type: 'SAGA/FETCH_CLOTHING_TYPES'
    });
  }, []);

  const submitItem = (e) => {
    e.preventDefault()
    dispatch({ 
      type: 'SAGA/POST_CLOTHING_ITEM', 
      payload: {
        item: item, 
        description: description,
        clothing_type_id: clothingType
      }
    })
    setDescription('')
    setItem('')
    if (history.location.pathname === '/newClothes'){
      history.push("/viewClothes");
    } else if (history.location.pathname === '/newActivity'){
      handleClose();
    }
  }

  const backToList = () => {
    history.push(`/viewClothes`)
  }
  
  const checkLocation = () => {
    console.log('in checkLocation', history.location.pathname);
    if (history.location.pathname === '/newClothes'){
      return (
        <>
        <br /><br />
          <Button size='md' variant='back' onClick={backToList}>Cancel</Button>
          <Button size='md' variant='add' type='submit'>Add to Closet</Button>
        </>
      )
    } else if (history.location.pathname === '/newActivity'){
      return (
        <>
        <br /><br />
          <Button size='md' variant='back' onClick={handleClose}>Cancel</Button>
          <Button size='md' variant='add' type='submit'>Add to Closet</Button>
        </>
      )
    }
  }

  return (
    <div className="container">
      <form onSubmit={submitItem}>
        <Button size='md' variant='back' onClick={backToList}>Back To Closet</Button>
        <br /><br />
        Clothing Item*
        <input
          type="text"
          name="item"
          placeholder='Name'
          required
          value={item}
          onChange={(event) => setItem(event.target.value)}
        />  
        <br /><br />
        Description
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          name={description}
          id='description'
          placeholder='Description'
          rows="4"
          cols="40"
        />
        <br /><br />
        Clothing Type*
        <select 
          name="type"
          onChange={(e) => setClothingType(e.target.value)}
          required='required'
          defaultValue=''>
          <option value='' disabled="disabled">Choose a Clothing Type</option>
          {clothing_types.map(type => {
              return <option key={type.id} value={type.id}>{type.type}</option>
          })}
        </select>
        {checkLocation()}
      </form>
      
    </div>
  );
}

export default ClothingForm;