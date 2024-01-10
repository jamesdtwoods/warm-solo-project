import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import Activity from './Activity.jsx';
import { Button } from 'react-bootstrap';


function ActivityListByWeather() {
  const dispatch = useDispatch();
  const history = useHistory();
  const activities = useSelector(store => store.activitiesReducer.activityListByWeather);
  
  useEffect(() => {
    dispatch({
        type: 'FETCH_ACTIVITIES_BY_WEATHER'
      })
  }, []); 
  const checkAllFunction = (activities) => {
    let check = false;
    for (let activity of activities) {
      check = true;
    }
    return check;
  }

  const checkFunction = (activities, activity_type_id) => {
    let check = false;
    for (let activity of activities) {
      if (activity.activity_type_id === activity_type_id) {
        check = true;
      }
    }
    return check;
  }

  const mapFunction = (activities, activity_type_id) => {
    let activityArray=[]
    for (let activity of activities) {
      if(activity.activity_type_id === activity_type_id){
        activityArray.push(activity);
      }
    }
    return activityArray.map((activity) => {
      return <Activity key={activity.activities_id} activity={activity} />
    })
  }

  const toActivityList = () => {
    history.push(`/viewActivities`)
  }

  // history.goBack()

  return (
    <div className="container">
      {checkAllFunction(activities) ?  
        <div>
          <Button size='sm' variant='back' onClick={toActivityList}>Back To Activity List</Button>
          <h2>Activity List Based on Temperature</h2>
          {checkFunction(activities, 1) ? 
            <> <p className='list-bold'>Biking:</p> 
              <ul>
                {mapFunction(activities, 1)}
              </ul>
            </> 
          : <></>}
          {checkFunction(activities, 2) ? 
            <> <p className='list-bold'>Running:</p> 
              <ul>
                {mapFunction(activities, 2)}
              </ul>
            </> 
          : <></>}
          {checkFunction(activities, 3) ? 
            <> <p className='list-bold'>CC Skiing (classic):</p> 
              <ul>
                {mapFunction(activities, 3)}
              </ul>
            </> 
          : <></>}
          {checkFunction(activities, 4) ? 
            <> <p className='list-bold'>CC Skiing (skate):</p> 
              <ul>
                {mapFunction(activities, 4)}
              </ul>
            </> 
          : <></>}
          {checkFunction(activities, 5) ? 
            <> <p className='list-bold'>Other:</p> 
              <ul>
                {mapFunction(activities, 5)}
              </ul>
            </> 
          : <></>}
        </div>
        : <>
            <h1>No activities within temperature range</h1>
            <Button size='sm' variant='back' onClick={toActivityList}>Back To Activity List</Button>
          </>}
    </div>
  );

}

export default ActivityListByWeather;