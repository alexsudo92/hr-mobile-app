import { JobData } from '@/types';
import { create } from 'zustand';
import { jobData } from '@/data/mockData';

type State = {
  data: JobData[];
};

type Action = {
  setData: (value: State['data']) => void;
  setJob: (id: string, value: JobData) => void;
  getJob: (id: string) => JobData;
  resetData: (value: State['data']) => void;
};

const useJobStore = create<State & Action>((set, get, store) => ({
  data: jobData,
  setData: (value) => set(() => ({ data: value })),
  getJob: (id) => {
    const job = get().data.find((x) => x.id === id);
    if (!job) {
      throw new Error(`Job with id ${id} not found`);
    }
    return job;
  },
  setJob: (id, value) =>
    set((state) => ({
      data: state.data.map((job) => (job.id === id ? value : job)),
    })),
  resetData: () => set(() => store.getInitialState()),
}));

export default useJobStore;
