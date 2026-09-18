const getRoundName = (matchCount) => {
  if (matchCount <= 2) return 'Final';
  if (matchCount <= 4) return 'Semifinals';
  if (matchCount <= 8) return 'Quarterfinals';
  if (matchCount <= 16) return 'Round of 16';
  if (matchCount <= 32) return 'Round of 32';
  if (matchCount <= 64) return 'Round of 64';
  return `Round of ${matchCount}`;
};

export const buildPlayoffBracket = (players = []) => {
  if (!players.length) return [];

  const normalizedPlayers = players.map((player) => {
    if (typeof player === 'number' || typeof player === 'string') {
      return `Player ${player}`;
    }
    return player;
  });

  const nextPowerOfTwo = 2 ** Math.ceil(Math.log2(normalizedPlayers.length));
  const paddedPlayers = [...normalizedPlayers];

  while (paddedPlayers.length < nextPowerOfTwo) {
    paddedPlayers.push('BYE');
  }

  const rounds = [];
  let currentRoundPlayers = [...paddedPlayers];

  while (currentRoundPlayers.length > 1) {
    const matches = [];

    for (let i = 0; i < currentRoundPlayers.length; i += 2) {
      const player1 = currentRoundPlayers[i];
      const player2 = currentRoundPlayers[i + 1];

      matches.push({
        id: `r${rounds.length + 1}-m${Math.floor(i / 2) + 1}`,
        player1,
        player2,
        score: null,
        status: player1 === 'BYE' || player2 === 'BYE' ? 'bye' : 'pending',
        active: false,
        winner: null,
      });
    }

    rounds.push({
      round: getRoundName(currentRoundPlayers.length),
      matches,
    });

    currentRoundPlayers = matches.map((match) => {
      if (match.status === 'bye') {
        return match.player1 === 'BYE' ? match.player2 : match.player1;
      }

      return `Winner ${match.id}`;
    });
  }

  return rounds;
};