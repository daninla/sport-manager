import { Skeleton } from '@mui/material';

import { useGetPlayerByIdQuery } from '../../../entities/player/api/playerApi';

function PlayerName({ playerId }) {
  const {
    data: player,
    isLoading,
    isError,
  } = useGetPlayerByIdQuery(playerId, {
    skip: playerId === null,
  });

  if (isLoading) return <Skeleton width={80} />;
  if (isError || !player) return <>Player {playerId}</>;

  return <>{player.fullName}</>;
}
export default PlayerName;
