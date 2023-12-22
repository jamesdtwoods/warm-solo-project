import React from 'react';
import { useDispatch } from 'react-redux';

function ClothingItem(clothingItem) {

  const dispatch = useDispatch();

  const deleteItem = () => {
      dispatch({
          type: 'SAGA/DELETE_CLOTHING_ITEM',
          payload: clothingItem.clothingItem.id
      })
  }

  return (
    <li>
        <p>{clothingItem.clothingItem.name}</p>
        <button onClick={deleteItem}>Remove</button>
    </li>
  );
}

export default ClothingItem;