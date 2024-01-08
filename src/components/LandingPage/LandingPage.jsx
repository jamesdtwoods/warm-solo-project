import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
// import './LandingPage.css';

// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm';

function LandingPage() {
  const history = useHistory();

  const onRegister = () => {
    history.push('/registration');
  };

  return (
    <div className="container">
      <h2>Welcome to <text className='brand-name-footer'>warm </text></h2>
        <p>
          or "Winter Activities Resource Manager" if you're not into the whole brevity thing. 
        </p>
        <p>
          <text className='brand-name-footer'>warm </text> 
          helps you plan for a more comfortable time in the cold weather. 
        </p>
        <p>
          Fill your closet with your favorite gear, get the current weather in your area
          and track past activities allowing you to be better informed the next time out.
        </p>
        <LoginForm />
        <center>
          <Button variant='edit' onClick={onRegister}>Not a user? Click here to register</Button>
        </center>
    </div>
  );
}

export default LandingPage;
