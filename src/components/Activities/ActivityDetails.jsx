import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

function ActivityDetails () {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const activity = useSelector(store => store.activitiesReducer.selectedActivity);
    const activities = useSelector(store => store.activitiesReducer.activityListByWeather);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const checkAllFunction = (activities) => {
        let check = false;
        for (let activity of activities) {
          check = true;
        }
        return check;
    }
    const deleteItem = () => {
        alert('are you sure you want to delete this activity')
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
    const toActivityListByWeather = () => {
        history.push(`/viewActivitiesByWeather`)
    }
    const formatDate = (dateInput) => {
        let year = dateInput.split('T',1)[0].split('-')[0]
        let month = dateInput.split('T',1)[0].split('-')[1]
        let day = dateInput.split('T',1)[0].split('-')[2]
        return `${month}/${day}/${year}`
    }

    return(
        <div className="container">
            {checkAllFunction(activities) 
             ? 
            <>
            <Button size='sm' variant='back' onClick={toActivityListByWeather}>Back to Activity List By Weather</Button>
            <br /><br />
            <Button size='sm' variant='back' onClick={toActivityList}>Back to Activity List</Button>
            </>
             : 
             <Button size='sm' variant='back' onClick={toActivityList}>Back to Activity List</Button>}
            <h3>{formatDate(activity.date)}  ({activity.temperature}℉)</h3>
            <p>{activity.notes}</p>
            <ul>
                {activity.clothesArray.map((clothingItem) => (
                    <li key={clothingItem.clothes_id}>{clothingItem.name}, {clothingItem.clothing_type_id}</li> 
                ))}
            </ul>
            <Button size='sm' variant='edit' onClick={editItem}>Edit Activity</Button>
            <Button size='sm' variant='delete' onClick={handleShow}>Remove Activity</Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Remove activity from log</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This activity will be removed from your log. Are you sure you want to remove this activity? 
                </Modal.Body>
                <Modal.Footer>
                <Button variant='back' onClick={handleClose}>Cancel</Button>
                <Button variant='delete' onClick={deleteItem}>Remove Activity</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ActivityDetails;