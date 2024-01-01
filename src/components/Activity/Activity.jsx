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
  console.log(activity);

  const formatDate = (dateInput) => {
    let year = dateInput.split('T',1)[0].split('-')[0]
    let month = dateInput.split('T',1)[0].split('-')[1]
    let day = dateInput.split('T',1)[0].split('-')[2]
    return `${month}/${day}/${year}`
  }

  console.log('format date test', formatDate(activity.date));

  return (
    // <li key={activity.id}>
    <li>
        <p>{formatDate(activity.date)}</p>
        <button onClick={viewActivity}>View</button>
    </li>
    // </li>
  );
}

export default Activity;