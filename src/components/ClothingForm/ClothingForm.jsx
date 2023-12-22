import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';

function ClothingForm() {
  const [description, setDescription] = useState('');
  const [item, setItem] = useState('');
  const clothing_types = useSelector(store => store.clothingReducer.clothingTypeReducer);
  let selectedType;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ 
    type: 'SAGA/FETCH_CLOTHING_TYPES'
    });
  }, []);

  const setType = (value) => {
    selectedType = value;
    return selectedType;
}

  const submitItem = () => {
    dispatch({ 
      type: 'SAGA/POST_CLOTHING_ITEM', 
      payload: {
        item: item, 
        description: description,
        clothing_type_id: selectedType
      }
    })
    setDescription('')
    setItem('')
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
        placeholder='Description'
        rows="4"
        cols="50"
      />
      <br /><br />
      Clothing Type:
      <select name="type"
        onChange={(e) => setType(e.target.value)}
        defaultValue=''>
        <option value=''></option>
        {clothing_types.map(type => {
            return <option key={type.id} value={type.id}>{type.type}</option>
        })}
      </select>
      <button onClick={submitItem}>SUBMIT</button>
    </div>
  );
}

export default ClothingForm;