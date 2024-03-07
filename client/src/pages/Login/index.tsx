import { useState } from 'react';
import './style.css';
import '../Signup';
import { Link } from 'react-router-dom';
import email_icon from 'assets/email.png';
import password_icon from 'assets/password.png';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type LoginDto = {
  email: string;
  password: string;
};

const Login = () => {
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .email('Invalid email format'),
    password: yup.string().required('Password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginDto) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log(data); // Here you can perform your login logic
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Log in</div>
        <div className="title-underline"></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs">
          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              placeholder="example@john.com"
              {...register('email')}
            />
          </div>

          {errors.email && (
            <p className="-mt-2 text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="inputs">
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Password"
              {...register('password')}
            />
          </div>
          {errors.password && (
            <p className="-mt-2 text-red-500">{errors.password.message}</p>
          )}
        </div>
        <button type="submit" className="submit-container">
          <div className="submit">{loading ? 'Loading...' : 'Log In'}</div>
        </button>

        <div className="forgot-password flex flex-col items-center justify-center px-0">
          <p>
            Not Registered?{' '}
            <Link className="text-primary hover:underline" to="/signup">
            Sign up!
            </Link>
          </p>
          or{' '}
          <Link className="text-black underline" to="/">
            Continue exploring
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
