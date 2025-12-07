import axios from 'axios';
import { Attestation, Registration } from './dtoTypes';

// const BASE_URL = 'https://localhost:7195';
const BASE_URL = 'http://10.115.192.210';

export const createOptions = async (userData: Registration) => {
  const response = await axios({
    url: `${BASE_URL}/passkey/createregistrationoptions`,
    method: 'post',
    // timeout: 1000,
    responseType: 'json',
    data: {
      phone: userData.phone,
      email: userData.email,
      username: userData.username,
    },
  });

  if (response.status != 200) {
    throw new Error(response.data);
  } else {
    return response.data;
  }
};

export const completeRegistration = async (userData: Attestation) => {
  const response = await axios({
    url: `${BASE_URL}/passkey/completeregistration`,
    method: 'post',
    // timeout: 1000,
    responseType: 'json',
    data: {
      email: userData.email,
      passkeyResult: userData.passkeyResult,
    },
  });

  if (response.status != 200) {
    throw new Error(response.data);
  } else {
    return response.data;
  }
};
