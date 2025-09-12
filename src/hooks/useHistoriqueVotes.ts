
import { useQuery } from '@tanstack/react-query';
import { HistoriqueElecteurDTO } from '@/lib';
import { AuthenticatedLecteurService } from '@/lib/auth/authenticatedServices';

export const useHistoriqueVotes = () => {
  return useQuery<HistoriqueElecteurDTO, Error>({
    queryKey: ['historiqueVotes'],
    queryFn: () => AuthenticatedLecteurService.obtenirHistoriqueActivite(),
  });
};
