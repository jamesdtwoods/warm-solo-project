import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Activity({activity}) {
  const history = useHistory()
  const dispatch = useDispatch();

  const viewActivity = () => {
    dispatch({
      type: 'SET_ACTIVITY',
      payload: activity
    })
    history.push(`/viewActivity/${activity.activities_id}`)
  }

  const formatDate = (dateInput) => {
    let year = dateInput.split('T',1)[0].split('-')[0]
    let month = dateInput.split('T',1)[0].split('-')[1]
    let day = dateInput.split('T',1)[0].split('-')[2]
    return `${month}/${day}/${year}`
  }

  return (
    <li>
      {activity.weather_conditions ? 
      <p className='list'>{formatDate(activity.date)} ({activity.temperature}℉), {activity.weather_conditions} {activity.feel}</p> 
      : <p className='list'>{formatDate(activity.date)} ({activity.temperature}℉) {activity.feel}</p>}
      <Button size='sm' variant='view' onClick={viewActivity}>View Activity</Button>
    </li>
  );
}

export default Activity;