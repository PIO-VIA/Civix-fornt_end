
import { useQuery } from '@tanstack/react-query';
import { TableauBordElecteurDTO } from '@/lib';
import { AuthenticatedLecteurService } from '@/lib/auth/authenticatedServices';

export const useTableauBordElecteur = () => {
  return useQuery<TableauBordElecteurDTO, Error>({
    queryKey: ['tableauBordElecteur'],
    queryFn: () => AuthenticatedLecteurService.obtenirTableauDeBord(),
  });
};
