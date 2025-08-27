
import { useQuery } from '@tanstack/react-query';
import { CandidatsPublicService, CandidatDTO } from '@/lib';

export const useCandidats = () => {
  return useQuery<CandidatDTO[], Error>({
    queryKey: ['candidats'],
    queryFn: () => CandidatsPublicService.getAllCandidats(),
  });
};
