
import { useQuery } from '@tanstack/react-query';
import { LecteurService, TableauBordElecteurDTO } from '@/lib';

export const useTableauBordElecteur = () => {
  return useQuery<TableauBordElecteurDTO, Error>({
    queryKey: ['tableauBordElecteur'],
    queryFn: () => LecteurService.obtenirTableauBord(''),
  });
};
