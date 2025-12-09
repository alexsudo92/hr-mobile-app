import { getVacancies } from '@/lib/api';
import { VacancyData } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useVacancies = (token: string | null) => {
  return useInfiniteQuery<VacancyData[], Error>({
    queryKey: ['vacancies', token],
    queryFn: async ({ pageParam = 0 }) => {
      if (!token) {
        throw new Error('No token');
      }
      const data = await getVacancies(token, 5, pageParam as number);
      if (!data) {
        throw new Error('No vacancies');
      }
      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length * 5;
    },
    enabled: !!token,
    staleTime: 60 * 1000,
    retry: 1,
  });
};
