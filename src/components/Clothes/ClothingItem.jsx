import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ClothingItem({clothingItem}) {
  const history = useHistory()
  const dispatch = useDispatch();



  const viewItem = () => {
    dispatch({
      type: 'SET_CLOTHING_ITEM',
      payload: clothingItem
    })
    history.push(`/viewClothingItem/${clothingItem.id}`)
  }

  return (
    <li>
        <p>{clothingItem.name}</p>
        <button onClick={viewItem}>View</button>

    </li>
  );
}

export default ClothingItem;