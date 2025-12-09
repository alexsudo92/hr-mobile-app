import { AxiosError } from 'axios';

export const handleNetworkError = (error: AxiosError) => {
  switch (error.code) {
    case 'ERR_NETWORK':
      return 'Network issues';
    case 'ERR_BAD_REQUEST':
      return error.status;
    default:
      throw new Error('Not implemented');
  }
};
