import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function ActivityDetails () {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const activity = useSelector(store => store.activitiesReducer.selectedActivity);

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

    return(
        <div data-testid="itemDetails">
            <h3>{activity.date}</h3>
            <p>{activity.notes}</p>
            <ul>
            {activity.clothes.map((clothingItem) => (
              
              <li key={clothingItem.clothes_id}>{clothingItem.name}, {clothingItem.clothing_type}</li> 
              
          ))}
            </ul>
            <button onClick={editItem}>Edit</button>
            <button onClick={deleteItem}>Remove</button>
        </div>
    )
}

export default ActivityDetails;