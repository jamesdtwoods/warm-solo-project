import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();


  return (
    <div className="container">
      <center>
        <h2>Welcome, {user.username}!</h2>
        <br />
        <Button size='lg' variant='view-home' onClick={()=>history.push(`/viewClothes`)}>View Closet</Button>
        <br />
        <br />
        <Button size='lg' variant='add-home' onClick={()=>history.push(`/newClothes`)}>Add Clothes to Closet</Button>
        <br />
        <br />
        <Button size='lg' variant='view-home' onClick={()=>history.push(`/viewActivities`)}>View Activity Log</Button>
        <br />
        <br />
        <Button size='lg' variant='add-home' onClick={()=>history.push(`/newActivity`)}>Add Activity</Button>
        <br />
        <br />
        <LogOutButton className="delete" />
      </center>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
