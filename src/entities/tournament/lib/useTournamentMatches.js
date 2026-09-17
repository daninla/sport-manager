export function useTournamentMatches(matches = []) {
  const playedMatches = matches.filter((match) => match.status !== 'Upcoming');
  const upcomingMatches = matches.filter(
    (match) => match.status === 'Upcoming',
  );

  return { matches, playedMatches, upcomingMatches };
}
