import { CandidateData } from '@/types';
import { create } from 'zustand';

type State = {
  data: CandidateData[];
};

type Action = {
  setData: (value: CandidateData[]) => void;
  setCandidate: (value: CandidateData) => void;
  getCandidate: (id: string) => CandidateData;
  addCandidate: (value: CandidateData) => void;
  resetData: (value: CandidateData[]) => void;
};

const useCandidateStore = create<State & Action>((set, get, store) => ({
  data: [],
  setData: (value) => set(() => ({ data: value })),
  getCandidate: (id) => {
    const candidate = get().data.find((x) => x.id === id);
    if (!candidate) {
      throw new Error(`Candidate with id ${id} not found`);
    }
    return candidate;
  },
  addCandidate: (value) =>
    set((state) => ({
      data: [...state.data, value],
    })),
  setCandidate: (value) =>
    set((state) => ({
      data: state.data.map((candidate) => (candidate.id === value.id ? value : candidate)),
    })),
  resetData: () => set(() => store.getInitialState()),
}));

export default useCandidateStore;
