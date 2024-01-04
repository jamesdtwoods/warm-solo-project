import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

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
    console.log('clothing item:', clothingItem);
    dispatch({ 
      type: 'SAGA/EDIT_CLOTHING_ITEM', 
      payload: {
        id: id,
        data: clothingItem
      }
    })
    history.push(`/viewClothingItem/${id}`)
  }

  // const [item, setItem] = useState(clothingItem.name);
  // const [description, setDescription] = useState(clothingItem.description);
  // const [clothingType, setClothingType] = useState('');

  const setItem = (newValue) => {
    dispatch({
      type: 'MODIFY_CLOTHING_ITEM_NAME',
      payload: newValue
    })
  }
  const setDescription = (newValue) => {
    dispatch({
      type: 'MODIFY_CLOTHING_ITEM_DESCRIPTION',
      payload: newValue
    })
  }
  const setClothingType = (newValue) => {
    dispatch({
      type: 'MODIFY_CLOTHING_ITEM_TYPE',
      payload: newValue
    })
  }

  const handleCancel = () => {
    history.push(`/viewClothingItem/${id}`)
  }

  return (
    <div className="container">
      <button onClick={handleCancel}>Back to Clothing Item</button>
      <br /><br />
      Clothing Item:
        <input
          type="text"
          name="name"
          value={clothingItem.name}
          onChange={(e) => setItem(e.target.value)}
        />  
      <br /><br />
      Description:
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        name={clothingItem.description}
        id='description'
        placeholder={clothingItem.description}
        rows="4"
        cols="50"
      />
      <br /><br />
      Clothing Type:
      <select 
        name="type"
        id='clothing_type_id'
        onChange={(e) => setClothingType(e.target.value)}
        defaultValue={clothingItem.clothing_type_id}>
        {clothing_types.map(type => {
            return <option key={type.id} value={type.id}>{type.type}</option>
        })}
      </select>
      <br /><br />
      <button onClick={submitItem}>SUBMIT</button>
      <button onClick={handleCancel}>CANCEL</button>
    </div>
  );
}

export default ClothingFormEdit;