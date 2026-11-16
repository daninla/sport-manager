/**
 * Canonical progression order for single-elimination tournament brackets.
 * Includes Round of 16 (1/8 final), Quarterfinals (1/4), Semifinals (1/2), and Final.
 */
export const ROUND_ORDER = [
  'Round of 16',
  'Quarterfinals',
  'Semifinals',
  'Final',
];

/**
 * Groups the tournament matches from the API into elimination rounds,
 * and sorts both columns and matches in bracket order.
 *
 * @param {Array<Object>} playoffMatches - Matches for one tournament.
 * @returns {Array<[string, Array<Object>]>} Sorted tuples of [roundName, sortedMatches].
 */
export function groupAndSortTournamentRounds(playoffMatches = []) {
  const groupedByRound = {};

  playoffMatches.forEach((match) => {
    const roundName = match.round || 'Round of 16';
    if (!groupedByRound[roundName]) {
      groupedByRound[roundName] = [];
    }
    groupedByRound[roundName].push(match);
  });

  Object.keys(groupedByRound).forEach((roundName) => {
    groupedByRound[roundName].sort((matchA, matchB) => {
      const indexA = Number(matchA.matchIndex) || 0;
      const indexB = Number(matchB.matchIndex) || 0;
      return indexA - indexB;
    });
  });

  const sortedRounds = Object.entries(groupedByRound).sort(
    ([roundA], [roundB]) => {
      const orderA = ROUND_ORDER.indexOf(roundA);
      const orderB = ROUND_ORDER.indexOf(roundB);

      const safeOrderA = orderA === -1 ? 999 : orderA;
      const safeOrderB = orderB === -1 ? 999 : orderB;

      return safeOrderA - safeOrderB;
    },
  );

  return sortedRounds;
}
