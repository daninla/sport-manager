import { AddPlayerBtn } from '@/features/add-player';
import { Autocomplete, Box, TextField } from '@mui/material';

import { useGetPlayersQuery } from '@/entities/player';

import { PlayersTable } from '@/widgets/PlayersTable';

function Players() {
  const { data: players, isLoading, isError } = useGetPlayersQuery();

  if (isLoading) return 'Loading...';
  if (isError) return <div>Ошибка загрузки</div>;

  return (
    <Box sx={{ padding: '0 2em' }}>
      <AddPlayerBtn />
      <Autocomplete
        freeSolo
        options={players.map(({ fullName }) => fullName)}
        sx={{
          maxWidth: '50%',
          margin: '1em 0',
        }}
        renderInput={(params) => <TextField {...params} label="Search" />}
      />
      <PlayersTable />
    </Box>
  );
}
export default Players;
