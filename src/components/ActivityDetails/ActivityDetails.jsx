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
            type: 'SAGA/DELETE_ACTIVITY',
            payload: id
        })
        history.push(`/viewActivities`)
    }

    const editItem = () => {
        history.push(`/editActivity/${id}`)
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