import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <LoginForm />

      <center>
        <Button
          variant='edit'
          onClick={() => {
            history.push('/registration');
          }}
        >
          Not a user? Register
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;
