import { ROUND_ORDER, normalizeId } from './bracketPlayoff.js';
import { getPlayerDisplayName } from '../../../entities/player/playerUtils.js';

/**
 * Calculates target match index and player slot in the successor round.
 *
 * @param {number} currentMatchIndex - Sequential index inside the current round.
 * @returns {{ nextMatchIndex: number, targetSlot: 'player1' | 'player2' }}
 */
export function getNextMatchSlot(currentMatchIndex) {
  const safeIndex = Number(currentMatchIndex) || 1;
  const nextMatchIndex = Math.ceil(safeIndex / 2);
  const targetSlot = safeIndex % 2 === 1 ? 'player1' : 'player2';

  return { nextMatchIndex, targetSlot };
}

/**
 * Updates a match outcome and advances the winner into the subsequent round.
 *
 * @param {Array<Object>} playoffMatches - Existing playoff matches.
 * @param {string} matchId - Match identifier to complete.
 * @param {{ player1: number, player2: number }} score - Final match score.
 * @param {Map<string|number, Object>} playerLookup - Player lookup cache.
 * @returns {Array<Object>} Immutable new matches array.
 */
export function resolveMatchAndAdvance(playoffMatches = [], matchId, score, playerLookup = new Map()) {
  const currentMatch = playoffMatches.find((m) => String(m.id) === String(matchId));
  if (!currentMatch) {
    return playoffMatches;
  }

  const p1Score = Number(score?.player1) || 0;
  const p2Score = Number(score?.player2) || 0;

  if (p1Score === p2Score) {
    throw new Error('Single-elimination playoff matches cannot end in a draw.');
  }

  const isPlayer1Winner = p1Score > p2Score;
  const winnerId = isPlayer1Winner ? currentMatch.player1Id : currentMatch.player2Id;
  const winnerFallback = isPlayer1Winner ? currentMatch.player1 : currentMatch.player2;
  const winnerName = getPlayerDisplayName(winnerId, winnerFallback, playerLookup);

  const currentRoundIndex = ROUND_ORDER.indexOf(currentMatch.round);
  const nextRoundName =
    currentRoundIndex !== -1 && currentRoundIndex < ROUND_ORDER.length - 1
      ? ROUND_ORDER[currentRoundIndex + 1]
      : null;

  const { nextMatchIndex, targetSlot } = getNextMatchSlot(currentMatch.matchIndex);
  const currentTournamentId = normalizeId(currentMatch.tournamentId);

  return playoffMatches.map((match) => {
    // 1. Update the completed match
    if (String(match.id) === String(matchId)) {
      return {
        ...match,
        status: 'Finished',
        score: { player1: p1Score, player2: p2Score },
        winnerId,
        winner: winnerName
      };
    }

    // 2. Propagate winner to the successor match in the next stage
    const isSameTournament = normalizeId(match.tournamentId) === currentTournamentId;
    const isNextRound = match.round === nextRoundName;
    const isTargetMatch = Number(match.matchIndex) === nextMatchIndex;

    if (nextRoundName && isSameTournament && isNextRound && isTargetMatch) {
      const updatedMatch = { ...match };

      if (targetSlot === 'player1') {
        updatedMatch.player1Id = winnerId;
        updatedMatch.player1 = winnerName;
      } else {
        updatedMatch.player2Id = winnerId;
        updatedMatch.player2 = winnerName;
      }

      // If both participants are determined, set match status to ready
      if (updatedMatch.player1Id && updatedMatch.player2Id) {
        updatedMatch.status = 'Upcoming';
      }

      return updatedMatch;
    }

    return match;
  });
}