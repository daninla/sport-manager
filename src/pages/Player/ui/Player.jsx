import { useParams } from 'react-router';

import { useGetPlayerByIdQuery } from '@/entities/player';

function Player() {
  const { id } = useParams();
  const { data: player, isLoading, isError } = useGetPlayerByIdQuery(id);

  if (isLoading) return 'Loading...';
  if (isError) return 'Fetch error';

  return <>Player {id}</>;
}

export default Player;
