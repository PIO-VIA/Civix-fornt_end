
import { useQuery } from '@tanstack/react-query';
import { LecteurService, HistoriqueElecteurDTO } from '@/lib';

export const useHistoriqueVotes = () => {
  return useQuery<HistoriqueElecteurDTO, Error>({
    queryKey: ['historiqueVotes'],
    queryFn: () => LecteurService.obtenirHistorique(''),
  });
};
