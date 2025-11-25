import { JobData } from '@/types'
import { create } from 'zustand'
import { jobData } from '@/data/mockData';

type State = {
  data: JobData[]
}

type Action = {
  setData: (value: State['data']) => void
  getData: (value: string) => JobData
  resetData: (value: State['data']) => void
}

const useJobStore = create<State & Action>((set, get, store) => ({
  data: jobData,
  setData: (value) => set(() => ({data: value})),
  getData: (id) => get().data.filter(x => x.id === id)[0] as JobData,
  resetData: () => set(() => (store.getInitialState()))
}))

export default useJobStore; 