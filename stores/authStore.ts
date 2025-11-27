import { userData1 } from '@/data/mockData';
import { UserData } from '@/types';
import { create } from 'zustand';

type State = {
  isSignedIn: boolean;
  userData: UserData;
};

type Action = {
  signIn: (value: State['isSignedIn']) => void;
  logOut: (value: State['isSignedIn']) => void;
};

const useAuthStore = create<State & Action>((set) => ({
  isSignedIn: true,
  userData: userData1,
  signIn: () => set(() => ({ isSignedIn: true })),
  logOut: () => set(() => ({ isSignedIn: false })),
}));

export default useAuthStore;
