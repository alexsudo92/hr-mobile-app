import { getCandidates } from '@/lib/api';
import { CandidateData } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useCandidates = (token: string | null) => {
  return useInfiniteQuery<CandidateData[], Error>({
    queryKey: ['candidates', token],
    queryFn: async ({ pageParam = 0 }) => {
      if (!token) {
        throw new Error('No token');
      }
      const data = await getCandidates(token, 5, pageParam as number);
      if (!data) {
        throw new Error('No candidates');
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
