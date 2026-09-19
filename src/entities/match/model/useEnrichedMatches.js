import {
  useGetMatchesByTournamentQuery,
  useGetPlayersQuery,
} from '../api/matchApi';

export function useEnrichedMatches(tournamentId) {
  const { data: matchesData, isLoading: isMatchesLoading } =
    useGetMatchesByTournamentQuery(tournamentId, { skip: !tournamentId });

  const { data: players, isLoading: isPlayersLoading } = useGetPlayersQuery();

  const isLoading = isMatchesLoading || isPlayersLoading;

  const enrichedMatches = (matchesData || []).map((match) => {
    const player1 = players?.find(
      (p) => String(p.id) === String(match.player1Id),
    );
    const player2 = players?.find(
      (p) => String(p.id) === String(match.player2Id),
    );

    return {
      ...match,
      player1,
      player2,
    };
  });

  return { matches: enrichedMatches, isLoading };
}
