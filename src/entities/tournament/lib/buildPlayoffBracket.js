const getRoundName = (matchCount) => {
  if (matchCount <= 2) return 'Final';
  if (matchCount <= 4) return 'Semifinals';
  if (matchCount <= 8) return 'Quarterfinals';
  if (matchCount <= 16) return 'Round of 16';
  if (matchCount <= 32) return 'Round of 32';
  if (matchCount <= 64) return 'Round of 64';
  return `Round of ${matchCount}`;
};

export const isPowerOfTwo = (value) => {
  const num = Number(value);
  return Number.isInteger(num) && num >= 2 && (num & (num - 1)) === 0;
};

export const getNearestBracketSize = (value) => {
  const count = Number(value);

  if (!Number.isFinite(count) || count <= 0) return 0;
  if (count <= 2) return 2;

  let lower = 2;
  let upper = 2;

  while (upper < count) {
    lower = upper;
    upper *= 2;
  }

  return count - lower <= upper - count ? lower : upper;
};

const normalizePlayerRef = (player) => {
  if (!player && player !== 0) {
    return { id: null, name: null };
  }

  if (typeof player === 'object') {
    const id = player.id !== undefined ? Number(player.id) : null;
    const name = player.fullName || player.name || (id !== null ? `Player ${id}` : null);
    return { id, name: String(name || '').trim() || null };
  }

  if (typeof player === 'string') {
    return {
      id: null,
      name: player.trim() || null,
    };
  }

  if (typeof player === 'number') {
    return { id: Number(player), name: `Player ${player}` };
  }

  return { id: null, name: null };
};

export const buildPlayoffBracket = (players = []) => {
  const normalizedPlayers = players
    .map((player) => normalizePlayerRef(player))
    .filter((player) => player.name);

  if (!normalizedPlayers.length) {
    return [];
  }

  const bracketSize = getNearestBracketSize(normalizedPlayers.length);
  const paddedPlayers = [...normalizedPlayers];

  while (paddedPlayers.length < bracketSize) {
    paddedPlayers.push({ id: null, name: 'TBD' });
  }

  if (paddedPlayers.length < 2) {
    return [];
  }

  const rounds = [];
  let currentRoundPlayers = [...paddedPlayers];
  let roundIndex = 0;

  while (currentRoundPlayers.length > 1) {
    roundIndex += 1;
    const matches = [];

    for (let i = 0; i < currentRoundPlayers.length; i += 2) {
      const player1Ref = currentRoundPlayers[i];
      const player2Ref = currentRoundPlayers[i + 1];

      matches.push({
        id: `r${roundIndex}-m${Math.floor(i / 2) + 1}`,
        player1: player1Ref.name,
        player2: player2Ref.name,
        player1Id: player1Ref.id,
        player2Id: player2Ref.id,
        score: null,
        status: 'pending',
        active: false,
        winner: null,
        winnerId: null,
      });
    }

    rounds.push({
      id: `round-${roundIndex}`,
      round: getRoundName(currentRoundPlayers.length),
      matches,
    });

    currentRoundPlayers = matches.map((match) => ({
      id: null,
      name: `Winner ${match.id}`,
    }));
  }

  return rounds;
};

export const flattenPlayoffBracket = (bracket = []) => {
  return bracket.flatMap((round, roundIndex) =>
    round.matches.map((match, matchIndex) => ({
      id: match.id || `pf-${roundIndex + 1}-${matchIndex + 1}`,
      tournamentId: null,
      round: round.round,
      matchIndex: matchIndex + 1,
      player1: match.player1 ?? 'TBD',
      player2: match.player2 ?? 'TBD',
      player1Id: match.player1Id ?? null,
      player2Id: match.player2Id ?? null,
      winner: match.winner ?? null,
      winnerId: match.winnerId ?? null,
      status: match.status ?? 'pending',
      score: match.score ? match.score : { player1: 0, player2: 0 },
      currentSet: { player1: 0, player2: 0 },
      historySets: [],
    }))
  );
};