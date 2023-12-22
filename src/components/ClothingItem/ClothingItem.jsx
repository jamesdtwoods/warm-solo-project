import React from 'react';
import { useDispatch } from 'react-redux';

function ClothingItem(clothingItem) {

  // const dispatch = useDispatch();

  // const deletePlant = () => {
  //     dispatch({
  //         type: 'SAGA/DELETE_PLANT',
  //         payload: plant.plant.id
  //     })
  // }

  return (
    <li>
        <p>{clothingItem.clothingItem.name}</p>
        {/* <button onClick={deletePlant}>Remove</button> */}
    </li>
  );
}

export default ClothingItem;