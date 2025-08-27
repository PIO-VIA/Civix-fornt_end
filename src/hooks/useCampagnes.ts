
import { useQuery } from '@tanstack/react-query';
import { CampagnesPublicService, CampagneDTO } from '@/lib';

export const useCampagnes = () => {
  return useQuery<CampagneDTO[], Error>({
    queryKey: ['campagnes'],
    queryFn: () => CampagnesPublicService.getAllCampagnes(),
  });
};
