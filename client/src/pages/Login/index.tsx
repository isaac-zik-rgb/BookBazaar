import { useState } from 'react';
import './style.css';
import '../Signup';
import { Link } from 'react-router-dom';
import email_icon from 'assets/email.png';
import password_icon from 'assets/password.png';

const Login = () => {
  const [action, setAction] = useState('Log in');

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder="Email ID" />
        </div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Password" />
        </div>
      </div>
      <div className="forgot-password">
        Not Registered? <Link to="/signup">Click Here!</Link>
      </div>
      <div className="submit-container">
        <div
          className={action === 'Sign Up' ? 'submit gray' : 'submit'}
          onClick={() => {
            setAction('Login');
          }}
        >
          Log In
        </div>
      </div>
    </div>
  );
};

export default Login;
