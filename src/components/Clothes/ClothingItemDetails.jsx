import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function ClothingItemDetails () {
    const { id } = useParams()
    const dispatch = useDispatch();
    const history = useHistory()
    const clothingItem = useSelector(store => store.clothingReducer.selectedItem);

    const deleteItem = () => {
        alert('are you sure you want to delete this clothing item')
        dispatch({
            type: 'SAGA/DELETE_CLOTHING_ITEM',
            payload: clothingItem.id
        })
        history.push(`/viewClothes`)
    }

    const editItem = () => {
        history.push(`/editClothes/${id}`)
    }

    const toClothingList = () => {
        history.push(`/viewClothes`)
    }

    return(
        <div className="container">
            <Button size='sm' variant='back' onClick={toClothingList}>Back to Closet</Button>
            <h3>{clothingItem.name}</h3>
            <p>{clothingItem.description}</p>
            <Button size='sm' variant='edit' onClick={editItem}>Edit</Button>
            <br /><br />
            <Button size='sm' variant='delete' onClick={deleteItem}>Remove from Closet</Button>
        </div>
    )
}

export default ClothingItemDetails;