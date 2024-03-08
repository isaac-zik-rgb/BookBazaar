import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import user_icon from 'assets/person.png';
import email_icon from 'assets/email.png';
import password_icon from 'assets/password.png';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useAuth from 'hooks/useAuth';

export type SignUpDto = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password2: string;
};

const schema = yup.object().shape({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  password2: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }, setError, setFocus, reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: SignUpDto) => {
    const dataWithUsername = { ...data, username: data.email };
    setLoading(true);
    try {
      await signUp(dataWithUsername);
      navigate('/login');
    } catch (error: any) {
      if (error.status === 400) {
        console.log(error.data);
        setError('email', {
          type: 'manual',
          message: error.data.username,
        });
        setFocus('email');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="title-underline"></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              placeholder="First name"
              {...register('first_name')}
            />
          </div>
          {errors.first_name && (
            <p className="-mt-2 text-red-500">{errors.first_name.message}</p>
          )}
        </div>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              placeholder="Last name"
              {...register('last_name')}
            />
          </div>
          {errors.last_name && (
            <p className="-mt-2 text-red-500">{errors.last_name.message}</p>
          )}
        </div>
        <div className="inputs">
          <div className="input">
            <img src={email_icon} alt="" />
            <input type="email" placeholder="Email/Username" {...register('email')} />
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
        <div className="inputs">
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Confirm Password"
              {...register('password2')}
            />
          </div>

          {errors.password2 && (
            <p className="-mt-2 text-red-500">
              {errors.password2.message}
            </p>
          )}
        </div>
        <button type="submit" className="submit-container">
          <div className="submit">{loading ? 'Loading...' : 'Sign Up'}</div>
        </button>

        <div className="forgot-password flex flex-col items-center justify-center px-0">
          <p>
            Already Registered?{' '}
            <Link className="text-primary hover:underline" to="/login">
              Log in!
            </Link>
          </p>
          or{' '}
          <Link className="text-black hover:underline" to="/">
            Continue exploring
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
