/**
 * Creates an in-memory lookup map of players for O(1) retrieval.
 * Maps both string and numeric representations of ID to prevent type mismatches.
 *
 * @param {Array<Object>} players - List of player records from the database.
 * @returns {Map<string|number, Object>} Player lookup map.
 */
export function createPlayerLookup(players = []) {
  const map = new Map();

  players.forEach((player) => {
    if (!player || player.id === undefined || player.id === null) {
      return;
    }

    const numericId = Number(player.id);
    if (!Number.isNaN(numericId)) {
      map.set(numericId, player);
    }

    map.set(String(player.id), player);
  });

  return map;
}

/**
 * Resolves a human-readable name for a match participant.
 * Handles database lookups, text placeholders, and missing player slots.
 *
 * @param {string|number|null} playerId - Unique player ID.
 * @param {string|null} fallbackName - Existing placeholder name (e.g. "Winner r1-m1").
 * @param {Map<string|number, Object>} playerLookup - Player lookup cache.
 * @returns {string} Resolved display name.
 */
export function getPlayerDisplayName(playerId, fallbackName, playerLookup) {
  // Scenario 1: ID exists and matched in database
  if (playerId !== null && playerId !== undefined && playerLookup) {
    const foundPlayer = playerLookup.get(playerId);
    if (foundPlayer && foundPlayer.fullName) {
      return foundPlayer.fullName;
    }
  }

  // Scenario 2: ID exists but missing from the loaded player database
  if (playerId !== null && playerId !== undefined) {
    return fallbackName || `Player #${playerId}`;
  }

  // Scenario 3: ID is empty but placeholder text exists
  if (fallbackName && fallbackName.trim() !== '') {
    return fallbackName;
  }

  // Scenario 4: Slot is completely unassigned
  return 'TBD (Pending)';
}
