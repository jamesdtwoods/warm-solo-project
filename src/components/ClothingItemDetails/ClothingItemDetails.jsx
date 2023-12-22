import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function ClothingItemDetails () {
    const { id } = useParams()
    const dispatch = useDispatch();
    const history = useHistory()
    const clothesList = useSelector(store => store.clothingReducer.clothingListReducer);
    let clothingItemToDisplay = {};
    clothes(clothesList);

    useEffect(() => {
        dispatch({
            type: 'SAGA/FETCH_CLOTHES'
          })
    }, []); 

    function clothes(clothesList) {
        for (let i=0; i < clothesList.length; i++) {
            if (Number(id) === clothesList[i].id)
            clothingItemToDisplay = clothesList[i]
        }
        return clothingItemToDisplay;
    }

    const deleteItem = () => {
        dispatch({
            type: 'SAGA/DELETE_CLOTHING_ITEM',
            payload: clothingItemToDisplay.id
        })
        history.push(`/viewClothes`)
    }

    return(
        <div data-testid="itemDetails">
            <p>{clothingItemToDisplay.name}</p>
            {/* <button onClick={deleteItem}>Edit</button> */}
            <button onClick={deleteItem}>Remove</button>
        </div>
    )
}

export default ClothingItemDetails;