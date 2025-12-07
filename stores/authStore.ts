import { userData1 } from '@/data/mockData';
import { UserData } from '@/types';
import { create } from 'zustand';

type State = {
  isSignedIn: boolean;
  data: UserData;
};

type Action = {
  signIn: () => void;
  logOut: () => void;
  setUserData: (value: UserData) => void;
};

const useAuthStore = create<State & Action>((set) => ({
  isSignedIn: false,
  data: userData1,
  signIn: () => set(() => ({ isSignedIn: true })),
  logOut: () => set(() => ({ isSignedIn: false })),
  setUserData: (value) => set(() => ({ data: value })),
}));

export default useAuthStore;
