import { useMemo } from 'react';

export * from './api/tournamentApi';
export * from './playoff/bracketPlayoff';

export {
  useGetTournamentByIdQuery,
  useGetTournamentsQuery,
  useDeleteTournamentMutation,
  useCreateTournamentMutation,
  useUpdateTournamentMutation,
  useUpdatePlayoffMatchMutation,
} from './api/tournamentApi';
export { default as TournamentStatusFallback } from './ui/TournamentStatusFallback';

export const sortTournamentsByDate = (tournaments = []) =>
  [...(Array.isArray(tournaments) ? tournaments : [])].sort((a, b) => {
    const aTime = new Date(a?.date || 0).getTime();
    const bTime = new Date(b?.date || 0).getTime();
    return aTime - bTime;
  });

export const useTournamentMatches = (matches = []) => {
  const normalizedMatches = Array.isArray(matches) ? matches : [];

  return useMemo(() => {
    const allMatches = [...normalizedMatches].sort((a, b) => {
      const aTime = new Date(a?.date || 0).getTime();
      const bTime = new Date(b?.date || 0).getTime();
      return aTime - bTime;
    });

    return {
      matches: allMatches,
      playedMatches: allMatches.filter((match) => match?.status !== 'Upcoming'),
      upcomingMatches: allMatches.filter((match) => match?.status === 'Upcoming'),
    };
  }, [normalizedMatches]);
};
