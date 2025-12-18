import { VacancyData } from '@/types';
import { create } from 'zustand';

type State = {
  data: VacancyData[];
};

type Action = {
  setData: (value: VacancyData[]) => void;
  setVacancy: (value: VacancyData) => void;
  getVacancy: (id: string) => VacancyData;
  updateVacancy: (value: VacancyData) => void;
  addVacancy: (value: VacancyData) => void;
  resetData: () => void;
};

const useVacancyStore = create<State & Action>((set, get, store) => ({
  data: [],
  setData: (value) => set(() => ({ data: value })),
  getVacancy: (id) => {
    const vacancy = get().data.find((x) => x.id === id);
    if (!vacancy) {
      throw new Error(`Vacancy with id ${id} not found`);
    }
    return vacancy;
  },
  addVacancy: (value) =>
    set((state) => ({
      data: [...state.data, value],
    })),
  setVacancy: (value) =>
    set((state) => ({
      data: state.data.map((vacancy) => (vacancy.id === value.id ? value : vacancy)),
    })),
  updateVacancy: (value) =>
    set((state) => ({
      data: state.data.map((vacancy) => (vacancy.id === value.id ? value : vacancy)),
    })),
  resetData: () => set(() => store.getInitialState()),
}));

export default useVacancyStore;
