import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Activity from './Activity';
import { Button, Modal } from 'react-bootstrap';
import Pagination from '../Pagination/Pagination';

let PageSize = 5;


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
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [currentPage3, setCurrentPage3] = useState(1);
  const [currentPage4, setCurrentPage4] = useState(1);
  const [currentPage5, setCurrentPage5] = useState(1);

  useEffect(() => {
    dispatch({
      type: 'SAGA/FETCH_ACTIVITIES'
    })
    window.scrollTo(top)
  }, []);

  const checkAllFunction = (activities) => {
    let check = false;
    for (let activity of activities) {
      check = true;
    }
    return check;
  }

  const checkFunction = (activities, activity_type_id) => {
    let count = null;
    for (let activity of activities) {
      if (activity.activity_type_id === activity_type_id) {
        count += 1;
      }
    }
    return count;
  }

  const typeArray = (activities, activity_type_id) => {
    let itemArray = []
    for (let item of activities) {
      if (item.activity_type_id === activity_type_id) {
        itemArray.push(item);
      }
    }
    return itemArray;
  }

  const currentTableData1 = useMemo(() => {
    const firstPageIndex = (currentPage1 - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return typeArray(activities, 1).slice(firstPageIndex, lastPageIndex);
  }, [activities, currentPage1]);
  const currentTableData2 = useMemo(() => {
    const firstPageIndex = (currentPage2 - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return typeArray(activities, 2).slice(firstPageIndex, lastPageIndex);
  }, [activities, currentPage2]);
  const currentTableData3 = useMemo(() => {
    const firstPageIndex = (currentPage3 - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return typeArray(activities, 3).slice(firstPageIndex, lastPageIndex);
  }, [activities, currentPage3]);
  const currentTableData4 = useMemo(() => {
    const firstPageIndex = (currentPage4 - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return typeArray(activities, 4).slice(firstPageIndex, lastPageIndex);
  }, [activities, currentPage4]);
  const currentTableData5 = useMemo(() => {
    const firstPageIndex = (currentPage5 - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return typeArray(activities, 5).slice(firstPageIndex, lastPageIndex);
  }, [activities, currentPage5]);

  // const mapFunction = (activities, activity_type_id) => {
  //   let activityArray=[]
  //   for (let activity of activities) {
  //     if(activity.activity_type_id === activity_type_id){
  //       activityArray.push(activity);
  //     }
  //   }
  //   return activityArray.map((activity) => {
  //     return <Activity key={activity.activities_id} activity={activity} />
  //   })
  // }

  const checkWeather = (theWeather) => {
    let check = false;
    if (theWeather.properties) {
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
              <Button size='md' variant='back' onClick={searchActivitiesByWeather}>
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
              <Button variant='add' onClick={searchActivities}>Search Activities</Button>
            </Modal.Footer>
          </Modal>
          <Button size='md' variant='back' onClick={handleShow}>Search Activities</Button>
          <br />
          <Button size='md' variant='add' onClick={addActivity}>Add New Activity</Button>
          <h2>Activity Log</h2>
          <table>
            <tbody>
              {checkFunction(activities, 1) ?
                <>
                  <table>
                    <tbody>
                      <tr>
                        <th>
                          Biking:
                        </th>
                      </tr>
                      {currentTableData1.map((activity) => {
                        return <Activity key={activity.activities_id} activity={activity} />
                      })}
                    </tbody>
                  </table>
                  <Pagination
                    className="pagination-bar"
                    currentPage={currentPage1}
                    totalCount={checkFunction(activities, 1)}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage1(page)}
                  />
                </>
                : <></>}
              {checkFunction(activities, 2) ?
                <>
                  <table>
                    <tbody>
                      <tr>
                        <th>
                          Running:
                        </th>
                      </tr>
                      {currentTableData2.map((activity) => {
                        return <Activity key={activity.activities_id} activity={activity} />
                      })}
                    </tbody>
                  </table>
                  <Pagination
                    className="pagination-bar"
                    currentPage={currentPage2}
                    totalCount={checkFunction(activities, 2)}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage2(page)}
                  />
                </>
                : <></>}
              {checkFunction(activities, 3) ?
                <>
                  <table>
                    <tbody>
                      <tr>
                        <th>
                          CC Skiing (Skate):
                        </th>
                      </tr>
                      {currentTableData3.map((activity) => {
                        return <Activity key={activity.activities_id} activity={activity} />
                      })}
                    </tbody>
                  </table>
                  <Pagination
                    className="pagination-bar"
                    currentPage={currentPage3}
                    totalCount={checkFunction(activities, 3)}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage3(page)}
                  />
                </>
                : <></>}
              {checkFunction(activities, 4) ?
                <>
                  <table>
                    <tbody>
                      <tr>
                        <th>
                          CC Skiing (Classic):
                        </th>
                      </tr>
                      {currentTableData4.map((activity) => {
                        return <Activity key={activity.activities_id} activity={activity} />
                      })}
                    </tbody>
                  </table>
                  <Pagination
                    className="pagination-bar"
                    currentPage={currentPage4}
                    totalCount={checkFunction(activities, 4)}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage4(page)}
                  />
                </>
                : <></>}
              {checkFunction(activities, 5) ?
                <>
                  <table>
                    <tbody>
                      <tr>
                        <th>
                          Other:
                        </th>
                      </tr>
                      {currentTableData5.map((activity) => {
                        return <Activity key={activity.activities_id} activity={activity} />
                      })}
                    </tbody>
                  </table>
                  <Pagination
                    className="pagination-bar"
                    currentPage={currentPage5}
                    totalCount={checkFunction(activities, 5)}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage5(page)}
                  />
                </>
                : <></>}
            </tbody>
          </table>
        </div>
        : <>
          <h1>No activities in log yet</h1>
          <Button size='md' variant='add' onClick={addActivity}>Add Activity</Button>
        </>}
    </div>
  );

}

export default ActivityList;