import React from 'react';
import { auth, provider } from '../firebase';
import { Button } from 'react-bootstrap';
import './Login.css';

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__telegram">
        <img
          src="https://www.flaticon.com/svg/static/icons/svg/174/174857.svg"
          alt="logo"
        />
        <h1>LinkedIn</h1>
      </div>
      <Button onClick={signIn}>Sign in</Button>
    </div>
  );
};

export default Login;
