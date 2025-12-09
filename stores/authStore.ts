import { UserData } from '@/types';
import { create } from 'zustand';

type State = {
  isSignedIn: boolean;
  data: UserData | null;
};

type Action = {
  signIn: () => void;
  signOut: () => void;
  setUserData: (value: UserData) => void;
};

const useAuthStore = create<State & Action>((set) => ({
  isSignedIn: false,
  data: null,
  signIn: () => set(() => ({ isSignedIn: true })),
  signOut: () => set(() => ({ isSignedIn: false, data: null })),
  setUserData: (value) => set(() => ({ data: value })),
}));

export default useAuthStore;
