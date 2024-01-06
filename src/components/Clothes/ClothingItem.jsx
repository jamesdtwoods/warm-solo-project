import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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
        <p>{clothingItem.name} <Button size='sm' variant='view' onClick={viewItem}>View</Button></p>
        

    </li>
  );
}

export default ClothingItem;