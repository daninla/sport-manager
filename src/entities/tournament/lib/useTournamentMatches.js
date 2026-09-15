export function useTournamentMatches(tournament) {
  const matches = tournament?.matches || [];
  const playedMatches = matches.filter((match) => match.score !== '-');
  const upcomingMatches = matches.filter((match) => match.score === '-');

  return { matches, playedMatches, upcomingMatches };
}
