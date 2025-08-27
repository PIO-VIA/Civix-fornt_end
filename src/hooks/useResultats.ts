
import { useQuery } from '@tanstack/react-query';
import { ElectionsService, ElectionDTO, ResultatsElectionDTO } from '@/lib';

export interface ElectionAvecResultats {
  election: ElectionDTO;
  resultats: ResultatsElectionDTO | null;
}

const fetchResultats = async (): Promise<ElectionAvecResultats[]> => {
  // 1. Récupérer toutes les élections
  const toutesElections = await ElectionsService.listerToutesElections();

  // 2. Filtrer pour ne garder que les élections terminées
  const electionsTerminees = toutesElections.filter(
    (e) => e.statut === 'TERMINEE'
  );

  // 3. Pour chaque élection terminée, récupérer ses résultats en parallèle
  const electionsAvecResultats = await Promise.all(
    electionsTerminees.map(async (election) => {
      try {
        const resultats = await ElectionsService.obtenirResultatsElection(
          election.externalIdElection!
        );
        return { election, resultats };
      } catch (error) {
        console.error(
          `Impossible de charger les résultats pour l'élection ${election.externalIdElection}`,
          error
        );
        return { election, resultats: null }; // Retourner l'élection même si les résultats échouent
      }
    })
  );

  return electionsAvecResultats;
};

export const useResultats = () => {
  return useQuery<ElectionAvecResultats[], Error>({
    queryKey: ['resultatsElections'],
    queryFn: fetchResultats,
  });
};
