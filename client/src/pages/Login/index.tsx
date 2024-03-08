import { useState } from 'react';
import './style.css';
import '../Signup';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import email_icon from 'assets/email.png';
import password_icon from 'assets/password.png';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useAuth from 'hooks/useAuth';
import { PAGES_URL } from 'configs/constants';

export type LoginDto = {
  username: string;
  password: string;
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, isLoading, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  
  

  const schema = yup.object().shape({
    username: yup
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
    setError('');
    try {
      await signIn(data);
      navigate(PAGES_URL.BOOKS_MANAGEMENT)
    } catch (error: any) {
      console.log(error);
      if (error.status === 400) {
        setError('Invalid email or password');
      }
    } finally {
      setLoading(false);
    }
  };


  if (isLoading) {return <div>Loading...</div>
} else if (isLoggedIn) {
    return <Navigate to={PAGES_URL.BOOKS_MANAGEMENT} />
  }

  return (
    <div className="container">
      <div className="header">
        <div className="text">Log in</div>
        <div className="title-underline"></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs">
        {error && <p className="flex self-center text-red-500">{error}</p>}

          <div className="input">
            <img src={email_icon} alt="" />
            <input
            type='email'
              placeholder="example@john.com"
              {...register('username')}
            />
          </div>

          {errors.username && (
            <p className="-mt-2 text-red-500">{errors.username.message}</p>
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
