import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function ClothingFormEdit() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const clothing_types = useSelector(store => store.clothingReducer.clothingType);
  const clothingItem = useSelector(store => store.clothingReducer.selectedItem);

  useEffect(() => {
    dispatch({
        type: 'SAGA/FETCH_CLOTHING_TYPES'
      })
  }, []); 

  const submitItem = () => {
    dispatch({ 
      type: 'SAGA/EDIT_CLOTHING_ITEM', 
      payload: {
        id: id,
        data: clothingItem
      }
    })
    history.push(`/viewClothingItem/${id}`)
  }

  const handleChange = (newValue, inputName) => {
    dispatch({
      type: 'MODIFY_CLOTHING_ITEM',
      payload: {newValue: newValue, property: inputName}
    })
  }

  const handleCancel = () => {
    history.push(`/viewClothingItem/${id}`)
  }

  return (
    <div className="container">
      <Button size='sm' variant='back' onClick={handleCancel}>Back to Clothing Item</Button>
      <br /><br />
      Clothing Item:
        <input
          type="text"
          name="name"
          value={clothingItem.name}
          onChange={(e) => handleChange(e.target.value, 'name')}
        />  
      <br /><br />
      Description:
      <textarea
        onChange={(e) => handleChange(e.target.value, 'description')}
        name={clothingItem.description}
        id='description'
        placeholder={clothingItem.description}
        rows="4"
        cols="40"
      />
      <br /><br />
      Clothing Type:
      <select 
        name="type"
        id='clothing_type_id'
        onChange={(e) => handleChange(e.target.value, 'clothing_type_id')}
        defaultValue={clothingItem.clothing_type_id}>
        {clothing_types.map(type => {
            return <option key={type.id} value={type.id}>{type.type}</option>
        })}
      </select>
      <br /><br />
      <Button size='sm' variant='add' onClick={submitItem}>SUBMIT</Button>
      <Button size='sm' variant='back' onClick={handleCancel}>CANCEL</Button>
    </div>
  );
}

export default ClothingFormEdit;