/**
 * Canonical progression order for single-elimination tournament brackets.
 * Includes Round of 16 (1/8 final), Quarterfinals (1/4), Semifinals (1/2), and Final.
 */
export const ROUND_ORDER = [
  'Round of 16',
  'Quarterfinals',
  'Semifinals',
  'Final'
];

/**
 * Normalizes an identifier to a uniform string representation.
 * Prevents strict equality failures when comparing numbers to strings (e.g. 5 === "5").
 *
 * @param {string|number|null|undefined} id - Raw identifier from database or state.
 * @returns {string|null} Normalized trimmed string ID, or null if empty.
 */
export function normalizeId(id) {
  if (id === null || id === undefined || id === '') {
    return null;
  }
  return String(id).trim();
}

/**
 * Filters tournament matches, groups them by elimination round,
 * and sorts both columns and matches in bracket order.
 *
 * @param {Array<Object>} playoffMatches - Flat array of playoff matches from db.json.
 * @param {string|number|null} targetTournamentId - ID of the selected tournament.
 * @returns {Array<[string, Array<Object>]>} Sorted tuples of [roundName, sortedMatches].
 */
export function groupAndSortTournamentRounds(playoffMatches = [], targetTournamentId) {
  const normalizedTargetId = normalizeId(targetTournamentId);

  // 1. Keep only matches belonging to the selected tournament
  const tournamentMatches = playoffMatches.filter((match) => {
    const matchTournamentId = normalizeId(match.tournamentId);
    return matchTournamentId === normalizedTargetId;
  });

  // 2. Group matches into round buckets
  const groupedByRound = {};

  tournamentMatches.forEach((match) => {
    const roundName = match.round || 'Round of 16';
    if (!groupedByRound[roundName]) {
      groupedByRound[roundName] = [];
    }
    groupedByRound[roundName].push(match);
  });

  // 3. Sort matches inside each round by ascending matchIndex (1, 2, 3, 4...)
  Object.keys(groupedByRound).forEach((roundName) => {
    groupedByRound[roundName].sort((matchA, matchB) => {
      const indexA = Number(matchA.matchIndex) || 0;
      const indexB = Number(matchB.matchIndex) || 0;
      return indexA - indexB;
    });
  });

  // 4. Sort columns from left to right based on ROUND_ORDER
  const sortedRounds = Object.entries(groupedByRound).sort(([roundA], [roundB]) => {
    const orderA = ROUND_ORDER.indexOf(roundA);
    const orderB = ROUND_ORDER.indexOf(roundB);

    // Place any unrecognized rounds at the very end
    const safeOrderA = orderA === -1 ? 999 : orderA;
    const safeOrderB = orderB === -1 ? 999 : orderB;

    return safeOrderA - safeOrderB;
  });

  return sortedRounds;
}


/**
 * Checks if a specific round index is locked.
 * A round is considered locked if it is not the first round AND
 * at least one match in the preceding round is not finished.
 *
 * @param {number} roundIndex - The current round's 0-based index.
 * @param {Array<[string, Array<Object>]>} sortedRounds - The sorted entries of [roundName, matches].
 * @returns {boolean} True if the round cannot be edited yet.
 */
export function isRoundLocked(roundIndex, sortedRounds = []) {
  if (roundIndex <= 0) return false;

  const previousRoundEntry = sortedRounds[roundIndex - 1];
  if (!previousRoundEntry) return false;

  const [, previousMatches] = previousRoundEntry;
  if (!previousMatches || previousMatches.length === 0) return false;

  // Locked if ANY match in the previous stage is NOT finished
  return previousMatches.some(
    (match) => match.status?.toLowerCase() !== 'finished'
  );
}