import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function ClothingFormEdit() {
  const clothing_types = useSelector(store => store.clothingReducer.clothingType);
  const clothesList = useSelector(store => store.clothingReducer.clothingList);
  const clothingItem = useSelector(store => store.clothingReducer.selectedItem);
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();

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
        clothing_type_id: selectedType,
        id: id
      }
    })
    history.push(`/viewClothingItem/${id}`)
  }

  const [description, setDescription] = useState(clothingItem.description);
  const [item, setItem] = useState(clothingItem.name);
  let selectedType;
  const setType = (value) => {
    selectedType = value;
    return selectedType;
  }

  const handleCancel = () => {
    history.push(`/viewClothingItem/${id}`)
  }

  return (
    <div className="clothing_form">

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
        onChange={(e) => setType(e.target.value)}
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