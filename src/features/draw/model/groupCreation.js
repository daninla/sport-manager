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
      capacity: Number(capacity),
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
