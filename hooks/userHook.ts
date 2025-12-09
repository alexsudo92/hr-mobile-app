import { info, login, logout, register } from '@/lib/api';
import { deleteToken, setToken } from '@/lib/storage';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AuthenticationDto, RegistrationDto, UserData } from '../types';

export const useSignIn = () => {
  return useMutation<string | null, Error, AuthenticationDto>({
    mutationKey: ['signIn'],
    mutationFn: (userData) => login(userData),
    onSuccess: (token) => {
      if (token) {
        setToken(token);
      }
    },
  });
};

export const useRegister = () => {
  return useMutation<string | null, Error, RegistrationDto>({
    mutationKey: ['register'],
    mutationFn: (userData) => register(userData),
  });
};

export const useSignOut = () => {
  return useMutation<string | null, Error, string>({
    mutationKey: ['signOut'],
    mutationFn: (token) => logout(token),
    onSuccess: () => {
      deleteToken();
    },
  });
};

export const useUserInfo = (token: string | null) => {
  return useQuery<UserData | null, Error>({
    queryKey: ['userInfo', token],
    queryFn: () => (token ? info(token) : Promise.resolve(null)),
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
