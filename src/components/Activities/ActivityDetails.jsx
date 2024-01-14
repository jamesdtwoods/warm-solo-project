import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import ClothingItem from '../Clothes/ClothingItem';

function ActivityDetails () {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const activity = useSelector(store => store.activitiesReducer.selectedActivity);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const checkFunction = (clothesList, clothing_type_id) => {
    let check = false;
    for (let item of clothesList) {
      if (item.clothing_type_id === clothing_type_id) {
        check = true;
      }
    }
    return check;
  }

  const mapFunction = (clothesList, clothing_type_id) => {
    let itemArray=[]
    for (let item of clothesList) {
      if(item.clothing_type_id === clothing_type_id){
        itemArray.push(item);
      }
    }
    return itemArray.map((clothingItem) => {
      return <ClothingItem key={clothingItem.clothes_id} clothingItem={clothingItem} />
    })
  }
    
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
      history.goBack()
  }

  const formatDate = (dateInput) => {
      let year = dateInput.split('T',1)[0].split('-')[0]
      let month = dateInput.split('T',1)[0].split('-')[1]
      let day = dateInput.split('T',1)[0].split('-')[2]
      return `${month}/${day}/${year}`
  }

  return(
      <div className="container">
          <Button size='md' variant='back' onClick={toActivityList}>Back</Button>
          <h2>{formatDate(activity.date)}  ({activity.temperature}℉)</h2>
          <h4>{activity.weatherDetails}</h4>
          <h4>{activity.notes}</h4>
          <p>How'd you feel? {activity.feel}</p>
          {activity.clothesArray ? <p className="list-bold">Clothes wore:</p> : <></>}
          <table>
            <tbody>
          {checkFunction(activity.clothesArray, 1) ? 
          <> 
            <tr>
              <th>
                Hats:
              </th>
            </tr>
              {mapFunction(activity.clothesArray, 1)}
          </> 
          : <></>}
          {checkFunction(activity.clothesArray, 2) ? 
            <> 
            <tr>
              <th>
                Gloves:
              </th>
            </tr>
                {mapFunction(activity.clothesArray, 2)}
            </> 
          : <></>}
          {checkFunction(activity.clothesArray, 3) ? 
            <> <tr>
            <th>
              Socks:
            </th>
          </tr>
                {mapFunction(activity.clothesArray, 3)}
            </> 
          : <></>}
          {checkFunction(activity.clothesArray, 4) ? 
            <> <tr>
            <th>
              Base Layer - Top:
            </th>
          </tr>
                {mapFunction(activity.clothesArray, 4)}
            </> 
          : <></>}
          {checkFunction(activity.clothesArray, 5) ? 
            <> <tr>
            <th>
              Base Layer - Bottom:
            </th>
          </tr>
                {mapFunction(activity.clothesArray, 5)}
            </> 
          : <></>}
          {checkFunction(activity.clothesArray, 10) ? 
            <> <tr>
            <th>
              Mid Layer - Top:
            </th>
          </tr>
                {mapFunction(activity.clothesArray, 10)}
            </> 
          : <></>}
          {checkFunction(activity.clothesArray, 6) ? 
            <> <tr>
            <th>
              Jackets:
            </th>
          </tr>
                {mapFunction(activity.clothesArray, 6)}
            </> 
          : <></>}
          {checkFunction(activity.clothesArray, 7) ? 
            <> <tr>
            <th>
              Pants:
            </th>
          </tr>
                {mapFunction(activity.clothesArray, 7)}
            </> 
          : <></>}
          {checkFunction(activity.clothesArray, 8) ? 
            <> <tr>
            <th>
              Accessories:
            </th>
          </tr>
                {mapFunction(activity.clothesArray, 8)}
            </> 
          : <></>}
          {checkFunction(activity.clothesArray, 9) ? 
            <> <tr>
            <th>
              Other:
            </th>
          </tr>
                {mapFunction(activity.clothesArray, 9)}
            </> 
          : <></>}
          </tbody>
          </table>
          <Button size='md' variant='edit' onClick={editItem}>Edit Activity</Button>
          <Button size='md' variant='delete' onClick={handleShow}>Remove Activity</Button>
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