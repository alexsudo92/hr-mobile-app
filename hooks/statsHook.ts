import { getStats } from '@/lib/api';
import { Stats } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useStats = (token: string | null) => {
  return useQuery<Stats, Error>({
    queryKey: ['stats', token],
    queryFn: async () => {
      if (!token) {
        throw new Error('No token');
      }

      const data = await getStats(token!);
      if (!data) {
        throw new Error('No stats');
      }

      return data;
    },
    enabled: !!token,
    staleTime: 30_000,
    retry: 1,
  });
};
