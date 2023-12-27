import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

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

  console.log('activity', activity);

  return (
    <li>
        <p>{activity.date}</p>
        <button onClick={viewActivity}>View</button>

    </li>
  );
}

export default Activity;