
import { useQuery } from '@tanstack/react-query';
import { LecteurService, HistoriqueElecteurDTO } from '@/lib';

// La méthode générée attend un token, mais nous nous fions au cookie httpOnly.
// Nous "trichons" avec TypeScript pour l'appeler sans argument.
const fetchHistorique = LecteurService.obtenirHistorique as () => Promise<HistoriqueElecteurDTO>;

export const useHistoriqueVotes = () => {
  return useQuery<HistoriqueElecteurDTO, Error>({
    queryKey: ['historiqueVotes'],
    queryFn: () => fetchHistorique(),
  });
};
