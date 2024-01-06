import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
// import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome to warm');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
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
        <RegisterForm />
        <center>
          <h4>Already a User?</h4>
          <Button variant='add' onClick={onLogin}>
            Login
          </Button>
        </center>
    </div>
  );
}

export default LandingPage;
