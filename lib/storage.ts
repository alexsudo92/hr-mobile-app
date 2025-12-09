import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV({
  id: 'hr-app-storage',
});

export const setToken = (token: string) => {
  storage.set('accessToken', token);
};

export const getToken = (): string | null => {
  const token = storage.getString('accessToken');
  if (token !== undefined) {
    return token;
  }

  return null;
};

export const deleteToken = () => {
  storage.remove('accessToken');
};
