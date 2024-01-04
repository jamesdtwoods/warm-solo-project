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
    dispatch({ 
      type: 'SAGA/EDIT_CLOTHING_ITEM', 
      payload: {
        item: item, 
        description: description,
        clothing_type_id: clothingType,
        id: id
      }
    })
    history.push(`/viewClothingItem/${id}`)
  }

  const [item, setItem] = useState(clothingItem.name);
  const [description, setDescription] = useState(clothingItem.description);
  const [clothingType, setClothingType] = useState('');

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
          name="item"
          required
          value={item}
          onChange={(event) => setItem(event.target.value)}
        />  
      <br /><br />
      Description:
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        name={description}
        id='description'
        placeholder={clothingItem.description}
        rows="4"
        cols="50"
      />
      <br /><br />
      Clothing Type:
      <select name="type"
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