import { AddPlayerBtn } from '@/features/add-player';
import { Autocomplete, TextField } from '@mui/material';

import { useGetPlayersQuery } from '../../../entities/player';

function PlayersPage() {
  const { data: players, isLoading, isError } = useGetPlayersQuery();

  if (isLoading) return 'Loading...';
  if (isError) return <div>Ошибка загрузки</div>;

  return (
    <>
      <AddPlayerBtn />
      <Autocomplete
        freeSolo
        options={players.map(({ name }) => name)}
        sx={{
          maxWidth: '50%',
          margin:'1em 2em'
        }}
        renderInput={(params) => <TextField {...params} label="Search" />}
      />
      {/* <PlayersTable /> */}
    </>
  );
}
export default PlayersPage;
