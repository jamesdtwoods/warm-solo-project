import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function ClothingItemDetails () {
    const { id } = useParams()
    const dispatch = useDispatch();
    const history = useHistory()
    const clothingItem = useSelector(store => store.clothingReducer.selectedItem);

    // useEffect(() => {
    //     dispatch({
    //         type: 'SAGA/FETCH_CLOTHES'
    //       })
    // }, []); 


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


    console.log("clothingItem:", clothingItem);
    return(
        <div data-testid="itemDetails">
            <h3>{clothingItem.name}</h3>
            <p>{clothingItem.description}</p>
            <button onClick={editItem}>Edit</button>
            <button onClick={deleteItem}>Remove</button>
        </div>
    )
}

export default ClothingItemDetails;