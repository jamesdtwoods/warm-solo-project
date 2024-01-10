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
    // // checks to see if coming from /clothesList or from /activityDetails 
    // // {from: ...} should tell where I came from to use on conditional back button
    {clothingItem.id ? 
      // coming from /clothesList
      history.push(`/viewClothingItem/${clothingItem.id}`, {from:'clothesList'}) 
      // coming from /activityDetails
    : history.push(`/viewClothingItem/${clothingItem.clothes_id}`, {from:'activityDetails'})}
  }

  return (
    <li>
        <p className='list'>{clothingItem.name}</p>
        <Button size='sm' variant='view' onClick={viewItem}>View Item</Button>
    </li>
  );
}

export default ClothingItem;