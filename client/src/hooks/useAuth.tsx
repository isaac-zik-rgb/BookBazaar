import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import {
  AuthUser,
  BaseUser,
  getMe,
  login,
  register,
  updateMe,
} from 'services/user.service';
import { storeAccessToken, removeAccessToken, getAccessToken } from '../utils';
import { LoginDto } from 'pages/Login';

export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);

  const token = getAccessToken();
  useEffect(() => {
    if (token) {
      const verifyToken = async () => {
        dispatch({ type: 'SET_IS_LOADING', status: true });
        if (token) {
          try {
            await getUser();
          } catch (error) {
            removeAccessToken();
            dispatch({ type: 'SET_AUTH_TOKEN', token: null });
            dispatch({ type: 'SET_IS_LOGGED_IN', status: false });
            dispatch({ type: 'SET_USER_INFO', info: null });
          } finally {
            dispatch({ type: 'SET_IS_LOADING', status: false });
          }
        } else {
          dispatch({ type: 'SET_IS_LOGGED_IN', status: false });
          dispatch({ type: 'SET_USER_INFO', info: null });
          dispatch({ type: 'SET_IS_LOADING', status: false });
        }
      };

      verifyToken();
    }
  }, []);

  const getUser = async () => {
    try {
      const user = (await getMe()) as any;

      dispatch({ type: 'SET_USER_INFO', info: user });
      dispatch({ type: 'SET_IS_LOGGED_IN', status: true });
      return user;
    } catch (error) {
      throw error;
    }
  };

  const signIn = async (payload: LoginDto) => {
    try {
      const data = (await login(payload)) as any;

      storeAccessToken(data.token);
      await getUser();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    removeAccessToken();
    dispatch({ type: 'SET_AUTH_TOKEN', token: null });
    dispatch({ type: 'SET_USER_INFO', info: null });
    dispatch({ type: 'SET_IS_LOGGED_IN', status: false });
  };

  const signUp = async (payload: BaseUser) => {
    try {
      const data = (await register({
        ...payload,
        username: payload.email,
      })) as any;
      return data;
    } catch (error) {
      throw error;
    }
  };

  const updateUser = async (payload: Partial<AuthUser>) => {
    try {
      const data = (await updateMe({
        ...payload,
      })) as any;
      dispatch({ type: 'SET_USER_INFO', info: data });
      return data;
    } catch (error) {
      throw error;
    }
  };

  return {
    ...state,
    signIn,
    logout,
    signUp,
    getUser,
    updateUser,
  };
};

export default useAuth;
