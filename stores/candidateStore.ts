import { CandidateData, CandidateStatus, Interaction } from '@/types';
import { create } from 'zustand';

type State = {
  data: CandidateData[];
};

type Action = {
  setData: (value: CandidateData[]) => void;
  getCandidate: (id: string) => CandidateData;
  addCandidate: (value: CandidateData) => void;
  updateCandidate: (value: CandidateData) => void;
  setStatus: (id: string, value: CandidateStatus) => void;
  addInteraction: (id: string, value: Interaction) => void;
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
  addInteraction: (id, value) => {
    set((state) => {
      const index = state.data.findIndex((c) => c.id === id);

      if (index === -1) {
        throw new Error(`Candidate with id ${id} not found`);
      }

      const updated = {
        ...state.data[index],
        interactions: [...state.data[index].interactions, value],
      };

      const newData = [...state.data];
      newData[index] = updated;

      return { data: newData };
    });
  },
  setStatus: (id, value) => {
    set((state) => {
      const index = state.data.findIndex((c) => c.id === id);

      if (index === -1) {
        throw new Error(`Candidate with id ${id} not found`);
      }

      const updated = {
        ...state.data[index],
        status: value,
      };

      const newData = [...state.data];
      newData[index] = updated;

      return { data: newData };
    });
  },
  updateCandidate: (value) =>
    set((state) => ({
      data: state.data.map((candidate) => (candidate.id === value.id ? value : candidate)),
    })),
  resetData: () => set(() => store.getInitialState()),
}));

export default useCandidateStore;
