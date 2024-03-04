import { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import user_icon from 'assets/person.png';
import email_icon from 'assets/email.png';
import password_icon from 'assets/password.png';

const Signup = () => {
  const [action, setAction] = useState('Sign Up');

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={user_icon} alt="" />
          <input type="text" placeholder="First name" />
        </div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={user_icon} alt="" />
          <input type="text" placeholder="Last name" />
        </div>
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
      <div className="inputs">
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Confirm Password" />
        </div>
      </div>
      <div className="forgot-password">
        Already Registered? <Link to="/login">Click Here!</Link>
      </div>
      <div className="submit-container">
        <div
          className={action === 'Login' ? 'submit gray' : 'submit'}
          onClick={() => {
            setAction('Sign Up');
          }}
        >
          Sign Up
        </div>
      </div>
    </div>
  );
};

export default Signup;
