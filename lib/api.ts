import {
  AuthenticationDto,
  CandidateData,
  RegistrationDto,
  Roles,
  UserData,
  VacancyData,
} from '@/types';
import axios from 'axios';

const BASE_URL = 'https://localhost:7195';
//const BASE_URL = 'http://10.115.192.210:5214';

export const http = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  responseType: 'json',
});

export const login = async (userData: AuthenticationDto): Promise<string | null> => {
  const response = await http.post('/auth/signin', userData);

  if (response.status === 200) {
    return response.data.accessToken;
  }

  return null;
};

export const register = async (userData: RegistrationDto): Promise<string | null> => {
  const response = await http.post('/auth/register', userData);

  if (response.status === 200) {
    return response.data.message;
  }

  return null;
};

export const logout = async (token: string): Promise<string | null> => {
  const response = await http.get('/account/signout', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return response.data.message;
  }

  return null;
};

export const info = async (token: string): Promise<UserData | null> => {
  const response = await http.get('/account/info', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
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

  return null;
};

export const getVacancies = async (
  token: string,
  count: number,
  offset: number
): Promise<VacancyData[] | null> => {
  const response = await http.get(`/vacancies/get?count=${count}&offset=${offset}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    const vacancies: VacancyData[] = response.data.map((item: VacancyData) => ({
      ...item,
      postDate: new Date(item.postDate),
      endDate: new Date(item.endDate),
    }));

    return vacancies;
  }

  return null;
};

export const getCandidates = async (
  token: string,
  count: number,
  offset: number
): Promise<CandidateData[] | null> => {
  const response = await http.get(`/candidates/get?count=${count}&offset=${offset}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    const candidates: CandidateData[] = response.data.map((item: CandidateData) => ({
      ...item,
      respondDate: new Date(item.respondDate),
      workplaces: item.workplaces.map((wpItem) => ({
        ...wpItem,
        startDate: new Date(wpItem.startDate),
        endDate: new Date(wpItem.startDate),
      })),
    }));
    return candidates;
  }

  return null;
};
