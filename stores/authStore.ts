import { create } from 'zustand'

type State = {
  isSignedIn: boolean
}

type Action = {
  signIn: (value: State['isSignedIn']) => void
  logOut: (value: State['isSignedIn']) => void
}

const useAuthStore = create<State & Action>((set) => ({
  isSignedIn: false,
  signIn: () => set(() => ({isSignedIn: true})),
  logOut: () => set(() => ({isSignedIn: false}))
}))

export default useAuthStore;