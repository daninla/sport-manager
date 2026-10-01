const submitGroup = async ({
  tournamentId,
  name,
  capacity,
  playerIds,
  createGroup,
}) => {
  if (!name.trim() || playerIds.length !== Number(capacity)) return false;

  try {
    await createGroup({
      tournamentId: String(tournamentId),
      name: name.trim(),
      playerIds,
    }).unwrap();
    return true;
  } catch {
    return false;
  }
};

export const addPlayersToGroupManually = ({
  tournamentId,
  name,
  capacity,
  selectedPlayers,
  createGroup,
}) =>
  submitGroup({
    tournamentId,
    name,
    capacity,
    playerIds: selectedPlayers.map((player) => player.id),
    createGroup,
  });

export const addPlayersToGroupRandomly = ({
  tournamentId,
  name,
  capacity,
  availablePlayers,
  createGroup,
}) => {
  if (availablePlayers.length < Number(capacity)) return Promise.resolve(false);

  const shuffledPlayers = [...availablePlayers];
  for (let index = shuffledPlayers.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledPlayers[index], shuffledPlayers[randomIndex]] = [
      shuffledPlayers[randomIndex],
      shuffledPlayers[index],
    ];
  }

  return submitGroup({
    tournamentId,
    name,
    capacity,
    playerIds: shuffledPlayers
      .slice(0, Number(capacity))
      .map((player) => player.id),
    createGroup,
  });
};
