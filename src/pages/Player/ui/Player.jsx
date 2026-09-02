import { useParams } from 'react-router';
import { EditPlayerBtn } from '@/features/edit-player';
import { Box } from '@mui/material';

import { useGetPlayerByIdQuery } from '@/entities/player';

function Player() {
  const { id } = useParams();
  const { data: player, isLoading, isError } = useGetPlayerByIdQuery(id);

  if (isLoading) return 'Loading...';
  if (isError) return 'Fetch error';

  return (
    <Box sx={{ margin: '1em' }}>
      <EditPlayerBtn id={id} />
      <p>Player {id}</p>
    </Box>
  );
}

export default Player;
