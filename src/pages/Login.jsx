import NavBar from "../components/NavBar"
import styles from "./Login.module.css";
import { useState } from "react";
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';


function Login() {


    const [showSignUp, setShowSignUp] = useState(false);

    const toggleForm = () => {
        setShowSignUp(!showSignUp);
    };

  return (

    <div className={styles.Login}>
     <NavBar />
      {showSignUp ? <SignUpForm onToggle={toggleForm} /> : <LoginForm onToggle={toggleForm} />}
    </div>
  );
}

export default Login
 
// *****
/* // src/pages/LoginPage.jsx
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

const LoginPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleForm = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <div>
      {showSignUp ? <SignUpForm onToggle={toggleForm} /> : <LoginForm onToggle={toggleForm} />}
    </div>
  );
};

export default LoginPage;
*/




