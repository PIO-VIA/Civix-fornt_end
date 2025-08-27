
import { useQuery } from '@tanstack/react-query';
import { ElectionsService, ElectionDTO } from '@/lib';

export const useElections = () => {
  return useQuery<ElectionDTO[], Error>({
    queryKey: ['elections'],
    queryFn: () => ElectionsService.listerToutesElections(),
  });
};
