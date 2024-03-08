import { useEffect, useState } from 'react';
import './style.css';
import profile_icon from 'assets/profileimage.png';
import useAuth from 'hooks/useAuth';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { get } from 'libs/axios';
import { Button } from 'components/ui';
import { AuthUser, updateMe } from 'services/user.service';

const schema = yup.object().shape({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  username: yup.string().required('Username is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  phone_number: yup.string().notRequired(),
  address: yup.string().notRequired(),
  favorite_genres: yup.string().notRequired(),
  bio: yup.string().notRequired(),
});

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const { updateUser, userInfo } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (userInfo) {
      setValue('first_name', userInfo.first_name);
      setValue('last_name', userInfo.last_name);
      setValue('username', userInfo.username);
      setValue('email', userInfo.email);
      setValue('phone_number', userInfo.phone_number);
      setValue('address', userInfo.address);
      setValue('favorite_genres', userInfo.favorite_genres);
      setValue('bio', userInfo.bio);
    }
  }, [userInfo, setValue]);

  const onSubmit = async (data: Partial<AuthUser>) => {
    try {
      await updateUser(data);
        setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container max-w-lg">
      <Button
        variant="solid"
        className="self-end"
        onClick={() => {
          setEditing(!editing);
        }}
      >
        {editing ? 'Save' : 'Edit'}
      </Button>
      <div className="form">
        <div className="header_image mb-20 flex items-center">
          <img src={profile_icon} alt="" />
          <input type="file" name="file" id="file" />
          <label className="" htmlFor="file">
            CHOOSE PIC
          </label>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            className={!editing ? 'cursor-not-allowed' : ''}
            disabled={!editing}
            {...register('first_name')}
            id="first_name"
            placeholder="Enter First Name"
          />
          {errors.first_name && (
            <p className="-mt-2 text-red-500">{errors.first_name.message}</p>
          )}
          <br />
          <br />
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            className={!editing ? 'cursor-not-allowed' : ''}
            disabled={!editing}
            id="last_name"
            {...register('last_name')}
            placeholder="Enter Last Name"
          />
          {errors.last_name && (
            <p className="-mt-2 text-red-500">{errors.last_name.message}</p>
          )}
          <br />
          <br />
          <label htmlFor="email">Email </label>
          <input
            type="email"
            className={!editing ? 'cursor-not-allowed' : ''}
            disabled={!editing}
            {...register('email')}
            id="email"
            placeholder="Enter Email"
          />
          {errors.email && (
            <p className="-mt-2 text-red-500">{errors.email.message}</p>
          )}
          <input
            type="email"
            className="sr-only"
            disabled={!editing}
            {...register('username')}
            id="username"
            value={getValues('email')}
            placeholder="Enter Email"
          />

          <br />
          <br />
          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="phone_number"
            className={!editing ? 'cursor-not-allowed' : ''}
            disabled={!editing}
            {...register('phone_number')}
            id="phone_number"
            placeholder="Enter Mobile number"
          />
          {errors.phone_number && (
            <p className="-mt-2 text-red-500">{errors.phone_number.message}</p>
          )}
          <br />
          <br />
          <label htmlFor="address">Address </label>
          <input
            type="address"
            className={!editing ? 'cursor-not-allowed' : ''}
            disabled={!editing}
            {...register('address')}
            id="address"
            placeholder="Enter Address"
          />
          <br />
          <br />
          <label htmlFor="favorite_genres">Favorite genre</label>
          <input
            type="favorite_genres"
            className={!editing ? 'cursor-not-allowed' : ''}
            disabled={!editing}
            {...register('favorite_genres')}
            id="favorite_genres"
            placeholder="Enter favorite genres"
          />
          <br />
          <br />
          <label htmlFor="bio">Bio </label>
          <textarea
            {...register('bio')}
            id="bio"
            className={!editing ? 'cursor-not-allowed' : ''}
            disabled={!editing}
          ></textarea>
          <br />
          <br />
          {editing && (
            <button type="submit" className="submit-container">
              <div className="submit">Submit</div>
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
