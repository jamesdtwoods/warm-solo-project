import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function ClothingItemDetails () {
    const { id } = useParams()
    const dispatch = useDispatch();
    const history = useHistory()
    const clothingItem = useSelector(store => store.clothingReducer.selectedItem);

    const deleteItem = () => {
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
        <div data-testid="itemDetails">
            <button onClick={toClothingList}>Clothing List</button>
            <h3>{clothingItem.name}</h3>
            <p>{clothingItem.description}</p>
            <button onClick={editItem}>Edit</button>
            <button onClick={deleteItem}>Remove</button>
        </div>
    )
}

export default ClothingItemDetails;