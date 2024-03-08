// import { AuthUser, BaseUser, CreateUser, LoginDto } from "types";
import { ENDPOINT } from 'configs/constants';
import { get, post, put } from 'libs/axios';
import { LoginDto } from 'pages/Login';

export type AuthUser = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  favorite_genres: string;
  bio?: string;
  phone_number: string;
};

export type BaseUser = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password2: string;
};

export const register = async (payload: BaseUser) => {
  const response = await post(`${ENDPOINT.AUTH}/register`, payload);
  return response;
};

export const login = async (payload: LoginDto) => {
  const response = await post(`${ENDPOINT.AUTH}/login`, payload);
  return response;
};

export const getMe = async () => {
  const response = await get<Promise<AuthUser>>(`${ENDPOINT.PROFILE}`);
  return response;
};

export const logout = async () => {
  const response = await post(`${ENDPOINT.AUTH}/logout`, {});
  return response;
};

export const updateMe = async (payload: Partial<AuthUser>) => {
  const response = await put(`${ENDPOINT.PROFILE}/edit`, payload);
  return response;
};
