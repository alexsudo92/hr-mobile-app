import {
  AuthenticationDto,
  CandidateData,
  CandidateStatus,
  Interaction,
  RegistrationDto,
  Roles,
  Stats,
  UserData,
  VacancyData,
  VacancyStatus,
  Workplace,
} from '@/types';
import axios from 'axios';

// const BASE_URL = 'https://localhost:7195';
const BASE_URL = 'http://10.115.192.210:5214';

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

export const get = async (token: string, userId: string): Promise<UserData | null> => {
  const response = await http.get(`/account/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return {
      id: response.data.id,
      username: response.data.username,
      email: response.data.email,
      phoneNumber: response.data.phoneNumber,
      role: response.data.role,
      avatarUrl: `${BASE_URL}/images/avatars/${response.data.avatar}`,
      token: '',
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

export const getOneVacancy = async (
  token: string,
  vacancyId: string
): Promise<VacancyData | null> => {
  const response = await http.get(`/vacancies/${vacancyId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    const vacancy: VacancyData = {
      ...response.data,
      postDate: new Date(response.data.postDate),
      endDate: new Date(response.data.endDate),
    };

    return vacancy;
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
      interactions: item.interactions.map((iItem) => ({
        ...iItem,
        date: new Date(iItem.date),
      })),
      workplaces: item.workplaces.map((wpItem) => ({
        ...wpItem,
        startDate: new Date(wpItem.startDate),
        endDate: new Date(wpItem.endDate),
      })),
    }));

    return candidates;
  }

  return null;
};

export const getStats = async (token: string): Promise<Stats | null> => {
  const response = await http.get('/stats/get', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return response.data as Stats;
  }

  return null;
};

export const addCandidate = async (
  token: string,
  candidate: CandidateData
): Promise<string | null> => {
  const response = await http.post('/candidates/add', candidate, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return response.data.message;
  }

  return null;
};

export const deleteCandidate = async (
  token: string,
  candidateId: string
): Promise<string | null> => {
  const response = await http.delete(`/candidates/delete?id=${candidateId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return response.data.message;
  }

  return null;
};

export const setCandidateStatus = async (
  token: string,
  candidateId: string,
  status: CandidateStatus
): Promise<string | null> => {
  const response = await http.get(`/candidates/setstatus?id=${candidateId}&status=${status}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return response.data.message;
  }

  return null;
};

export const addCandidateWorkplace = async (
  token: string,
  candidateId: string,
  workplace: Workplace
): Promise<string | null> => {
  const response = await http.post(`/candidates/addworkplace?id=${candidateId}`, workplace, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return response.data.message;
  }

  return null;
};

export const addCandidateInteraction = async (
  token: string,
  candidateId: string,
  interaction: Interaction
): Promise<string | null> => {
  const response = await http.post(`/candidates/addinteraction?id=${candidateId}`, interaction, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return response.data.message;
  }

  return null;
};

export const addCandidateVacancy = async (
  token: string,
  candidateId: string,
  vacancyId: string
): Promise<string | null> => {
  const response = await http.get(
    `/candidates/addvacancy?id=${candidateId}&vacancyId=${vacancyId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status === 200) {
    return response.data.message;
  }

  return null;
};

export const addVacancy = async (token: string, vacancy: VacancyData): Promise<string | null> => {
  const response = await http.post('/vacancies/add', vacancy, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return response.data.message;
  }

  return null;
};

export const deleteVacancy = async (token: string, vacancyId: string): Promise<string | null> => {
  const response = await http.delete(`/vacancies/delete?id=${vacancyId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return response.data.message;
  }

  return null;
};

export const addVacancyCandidate = async (
  token: string,
  candidateId: string,
  vacancyId: string
): Promise<string | null> => {
  const response = await http.get(
    `/vacancies/addcandidate?id=${vacancyId}&vacancyId=${candidateId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status === 200) {
    return response.data.message;
  }

  return null;
};

export const setVacancyStatus = async (
  token: string,
  vacancyId: string,
  status: VacancyStatus
): Promise<string | null> => {
  const response = await http.get(`/vacancies/setstatus?id=${vacancyId}&status=${status}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    return response.data.message;
  }

  return null;
};
