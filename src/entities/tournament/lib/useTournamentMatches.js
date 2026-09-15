export function useTournamentMatches(tournament) {
  const matches = tournament?.matches || [];
  const playedMatches = matches.filter((match) => match.status === 'Completed');
  const upcomingMatches = matches.filter(
    (match) => match.status !== 'Completed',
  );

  return { matches, playedMatches, upcomingMatches };
}
