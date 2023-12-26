import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ClothingItem(clothingItem) {
  const history = useHistory()
  const dispatch = useDispatch();



  const viewItem = () => {
    history.push(`/viewClothingItem/${clothingItem.clothingItem.id}`)
  }

  return (
    <li>
        <p>{clothingItem.clothingItem.name}</p>
        <button onClick={viewItem}>View</button>

    </li>
  );
}

export default ClothingItem;