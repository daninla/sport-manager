function PlayerName({ player }) {
  if (!player) return <>—</>;

  return <>{player.fullName}</>;
}
export default PlayerName;
