import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

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
            <button onClick={toClothingList}>Back to Closet</button>
            <h3>{clothingItem.name}</h3>
            <p>{clothingItem.description}</p>
            <button onClick={editItem}>Edit</button>
            <br /><br />
            <button onClick={deleteItem}>Remove from Closet</button>
        </div>
    )
}

export default ClothingItemDetails;