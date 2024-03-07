import { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import user_icon from 'assets/person.png';
import email_icon from 'assets/email.png';
import password_icon from 'assets/password.png';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type SignUpDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

const Signup = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: SignUpDto) => {
    const form = { ...data, username: data.email };
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log(form); // Here you can perform your login logic
      setLoading(false);
    }, 1000);
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
              {...register('firstName')}
            />
          </div>
          {errors.firstName && (
            <p className="-mt-2 text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              placeholder="Last name"
              {...register('lastName')}
            />
          </div>
          {errors.lastName && (
            <p className="-mt-2 text-red-500">{errors.lastName.message}</p>
          )}
        </div>
        <div className="inputs">
          <div className="input">
            <img src={email_icon} alt="" />
            <input type="email" placeholder="Email ID" {...register('email')} />
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
              {...register('confirmPassword')}
            />
          </div>

          {errors.confirmPassword && (
            <p className="-mt-2 text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button type="submit" className="submit-container">
          <div className="submit">{loading ? 'Loading...' : 'Sign Up'}</div>
        </button>

        <div className="forgot-password flex flex-col justify-center items-center px-0">
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
