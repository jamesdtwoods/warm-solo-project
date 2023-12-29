import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import Activity from '../Activity/Activity';


function ActivityList() {
  const dispatch = useDispatch();

  const activities = useSelector(store => store.activitiesReducer.activityList);

  useEffect(() => {
      dispatch({
          type: 'SAGA/FETCH_ACTIVITIES'
        })
  }, []); 

  return (
    <div className="container">
      <h3>This is the activity list</h3>
      <ul>
          {activities.map((activity) => (
              
              <Activity key={activity.id} activity={activity} />
              
          ))}
      </ul>
    </div>
  );
}

export default ActivityList;