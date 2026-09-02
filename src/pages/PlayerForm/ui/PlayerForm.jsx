import { useParams } from 'react-router';

import { useGetPlayerByIdQuery } from '@/entities/player';

function PlayerForm() {
  const { id } = useParams();
  let { data: player, isLoading, isError } = useGetPlayerByIdQuery(id);

  if (isLoading) return 'Loading...';
  if (isError) {
    player = {};
  }
  
  return <>PlayerForm {!id && 'adding'}</>;
}

export default PlayerForm;
