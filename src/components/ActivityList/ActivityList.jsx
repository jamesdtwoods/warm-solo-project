import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import Activity from '../Activity/Activity';


function ActivityList() {
  const dispatch = useDispatch();
  const history = useHistory()
  const activities = useSelector(store => store.activitiesReducer.activityList);
  const theWeather = useSelector(store => store.weather);

  useEffect(() => {
      dispatch({
          type: 'SAGA/FETCH_ACTIVITIES'
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

  const checkWeather = (theWeather) => {
    let check = false;
    if (theWeather.properties){
      check = true;
    }
    return check;
  }

  const addActivity = () => {
    dispatch({
      type: 'SAGA/FETCH_CLOTHES'
    })
    history.push(`/newActivity`)
  }

  const activitiesByWeather = () => {
    dispatch({
      type: 'SAGA/FETCH_ACTIVITIES_BY_WEATHER',
      payload: theWeather.properties.periods[0].temperature
    })
    history.push(`/viewActivitiesByWeather`)
  }

  return (
    <div className="container">
      {checkAllFunction(activities) ?  
        <div>
          {checkWeather(theWeather) ? 
          <>
            <button onClick={activitiesByWeather}>
              Show Activities From Temperatures +/- 5℉ of current temperature
            </button><br /><br />
          </> : <></>}
          <button onClick={addActivity}>Add Activity</button>
          <h2>Activity List</h2>
          {checkFunction(activities, 1) ? 
            <> <h3>Biking:</h3> 
              <ul>
                {mapFunction(activities, 1)}
              </ul>
            </> 
          : <></>}
          {checkFunction(activities, 2) ? 
            <> <h3>Running:</h3> 
              <ul>
                {mapFunction(activities, 2)}
              </ul>
            </> 
          : <></>}
          {checkFunction(activities, 3) ? 
            <> <h3>CC Skiing (classic):</h3> 
              <ul>
                {mapFunction(activities, 3)}
              </ul>
            </> 
          : <></>}
          {checkFunction(activities, 4) ? 
            <> <h3>CC Skiing (skate):</h3> 
              <ul>
                {mapFunction(activities, 4)}
              </ul>
            </> 
          : <></>}
          {checkFunction(activities, 5) ? 
            <> <h3>Other:</h3> 
              <ul>
                {mapFunction(activities, 5)}
              </ul>
            </> 
          : <></>}
        </div>
        : <>
            <h1>No activities</h1>
            <button onClick={addActivity}>Add Activity</button>
          </>}
    </div>
  );

}

export default ActivityList;