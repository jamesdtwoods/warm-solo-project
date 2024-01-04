import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

function ClothingForm() {
  const history = useHistory(); 
  const dispatch = useDispatch();
  const clothing_types = useSelector(store => store.clothingReducer.clothingType);
  const [item, setItem] = useState('');
  const [description, setDescription] = useState('');
  const [clothingType, setClothingType] = useState('');
 
  useEffect(() => {
    dispatch({ 
    type: 'SAGA/FETCH_CLOTHING_TYPES'
    });
  }, []);

  const submitItem = () => {
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
    history.push("/viewClothes")
  }

  const backToList = () => {
    history.push(`/viewClothes`)
  }

  return (
    <div className="container">
      <button onClick={backToList}>Back To Closet</button>
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
        placeholder='Description'
        rows="4"
        cols="50"
      />
      <br /><br />
      Clothing Type:
      <select name="type"
        onChange={(e) => setClothingType(e.target.value)}
        defaultValue=''>
        <option value=''></option>
        {clothing_types.map(type => {
            return <option key={type.id} value={type.id}>{type.type}</option>
        })}
      </select>
      <br /><br />
      <button onClick={backToList}>Cancel</button>
      <br /><br />
      <button onClick={submitItem}>Add to Closet</button>
    </div>
  );
}

export default ClothingForm;