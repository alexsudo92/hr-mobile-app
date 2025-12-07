import { Roles, UserData } from '@/types';
import axios from 'axios';
import { Authentication, Registration } from './dtoTypes';

//const BASE_URL = 'https://localhost:7195';
const BASE_URL = 'http://10.115.192.210';

export const http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000,
  responseType: 'json',
});

export const login = async (userData: Authentication): Promise<string> => {
  const response = await http.post('/auth/login', userData);

  if (response.status != 200) {
    throw new Error(response.data);
  } else {
    return response.data.accessToken;
  }
};

export const register = async (userData: Registration): Promise<string> => {
  const response = await http.post('/auth/registration', userData);

  if (response.status != 200) {
    throw new Error(response.data);
  } else {
    return response.data.message;
  }
};

export const logout = async (token: string): Promise<string> => {
  const response = await http.get('/account/logout', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status != 200) {
    throw new Error(response.data);
  } else {
    return response.data.message;
  }
};

export const info = async (token: string): Promise<UserData> => {
  const response = await http.get('/account/info', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status != 200) {
    throw new Error(response.data);
  } else {
    const userId = response.data.message[3];
    const email = response.data.message[4];
    const username = response.data.message[5];
    const phoneNumber = response.data.message[6];
    const role = response.data.message[7] as Roles;
    const avatar = response.data.message[8];

    return {
      id: userId,
      email: email,
      username: username,
      phoneNumber: phoneNumber,
      role: role,
      token: token,
      avatarUrl: `${BASE_URL}/images/avatars/${avatar}`,
    };
  }
};
