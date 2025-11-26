import { candidateData } from '@/data/mockData';
import { CandidateData } from '@/types';
import { create } from 'zustand';

type State = {
  data: CandidateData[]
}

type Action = {
  setData: (value: State['data']) => void
  getData: (value: string) => CandidateData
  resetData: (value: State['data']) => void
}

const useCandidateStore = create<State & Action>((set, get, store) => ({
  data: candidateData,
  setData: (value) => set(() => ({data: value})),
  getData: (id) => get().data.filter(x => x.id === id)[0] as CandidateData,
  resetData: () => set(() => (store.getInitialState()))
}))

export default useCandidateStore; 