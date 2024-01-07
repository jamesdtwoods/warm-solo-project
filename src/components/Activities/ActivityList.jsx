import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import Activity from './Activity';
import { Button, Modal } from 'react-bootstrap';


function ActivityList() {
  const dispatch = useDispatch();
  const history = useHistory()
  const activities = useSelector(store => store.activitiesReducer.activityList);
  const theWeather = useSelector(store => store.weather);
  const activity_types = useSelector(store => store.activitiesReducer.activityType);
  const [minTemp, setMinTemp] = useState('');
  const [maxTemp, setMaxTemp] = useState('');
  const [activityType, setActivityType] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const searchActivities = () => {
    dispatch({
      type: 'SAGA/FETCH_ACTIVITIES_BY_SEARCH',
      payload: {
        min: minTemp,
        max: maxTemp,
        activity_type_id: activityType,
      }
    })
    history.push(`/viewActivitiesByWeather`)
  }

  const searchActivitiesByWeather = () => {
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
            <Button size='sm' variant='back' onClick={searchActivitiesByWeather}>
              Show All Activities From Temperatures +/- 5℉ of current temperature
            </Button><br /><br />
          </> : <></>}
          <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Search Activity Log</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Search Activities:
                  <br />
                  Min Temperature:
                  <input
                    type="number"
                    name="minTemp"
                    placeholder='min'
                    value={minTemp}
                    onChange={(event) => setMinTemp(event.target.value)}
                  />
                  <br />
                  Max Temperature:
                  <input
                    type="number"
                    name="maxTemp"
                    placeholder='max'
                    value={maxTemp}
                    onChange={(event) => setMaxTemp(event.target.value)}
                  />
                  <br />
                  Activity Type:
                  <select name="type"
                    onChange={(e) => setActivityType(e.target.value)}
                    defaultValue={activityType}>
                    <option value=''></option>
                    {activity_types.map(type => {
                        return <option key={type.id} value={type.id}>{type.type}</option>
                    })}
                  </select>
                </Modal.Body>
                <Modal.Footer>
                <Button variant='back' onClick={handleClose}>Cancel</Button>
                <Button size='sm' variant='back' onClick={searchActivities}>Search Activities</Button>
                </Modal.Footer>
            </Modal>
          <Button size='sm' variant='back' onClick={handleShow}>Search Activities</Button>
          <br /><br />
          <Button size='sm' variant='add' onClick={addActivity}>Add New Activity</Button>
          <h2>Activity Log</h2>
          {checkFunction(activities, 1) ? 
            <> <h4>Biking:</h4> 
              <ul>
                {mapFunction(activities, 1)}
              </ul>
            </> 
          : <></>}
          {checkFunction(activities, 2) ? 
            <> <h4>Running:</h4> 
              <ul>
                {mapFunction(activities, 2)}
              </ul>
            </> 
          : <></>}
          {checkFunction(activities, 3) ? 
            <> <h4>CC Skiing (classic):</h4> 
              <ul>
                {mapFunction(activities, 3)}
              </ul>
            </> 
          : <></>}
          {checkFunction(activities, 4) ? 
            <> <h4>CC Skiing (skate):</h4> 
              <ul>
                {mapFunction(activities, 4)}
              </ul>
            </> 
          : <></>}
          {checkFunction(activities, 5) ? 
            <> <h4>Other:</h4> 
              <ul>
                {mapFunction(activities, 5)}
              </ul>
            </> 
          : <></>}
        </div>
        : <>
            <h1>No activities in log yet</h1>
            <Button size='sm' variant='add' onClick={addActivity}>Add Activity</Button>
          </>}
    </div>
  );

}

export default ActivityList;