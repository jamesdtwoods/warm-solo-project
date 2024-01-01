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

    const toActivityList = () => {
        history.push(`/viewActivities`)
    }

    const formatDate = (dateInput) => {
        let year = dateInput.split('T',1)[0].split('-')[0]
        let month = dateInput.split('T',1)[0].split('-')[1]
        let day = dateInput.split('T',1)[0].split('-')[2]
        return `${month}/${day}/${year}`
      }

    return(
        <div className="container">
            <button onClick={toActivityList}>Activity List</button>
            <h3>{formatDate(activity.date)}</h3>
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