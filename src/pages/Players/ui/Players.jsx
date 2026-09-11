import { useState } from 'react';
import { AddPlayerBtn } from '@/features/add-player';
import { Autocomplete, Box, TextField } from '@mui/material';

import { useGetPlayersQuery } from '@/entities/player';

import { PlayersTable } from '@/widgets/PlayersTable';

function Players() {
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);

  const { data: players, isLoading, isError } = useGetPlayersQuery();

  if (isLoading) return 'Loading...';
  if (isError) return 'Loading error!';

  return (
    <Box sx={{ padding: '1em 2em' }}>
      <AddPlayerBtn />
      <Autocomplete
        freeSolo
        openOnFocus={false}
        open={open && inputValue.trim().length > 0}
        onOpen={() => {
          if (inputValue.trim().length > 0) {
            setOpen(true);
          }
        }}
        onClose={() => setOpen(false)}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          setOpen(newInputValue.trim().length > 0);
        }}
        options={Array.from(new Set(players.map(({ fullName }) => fullName)))}
        sx={{
          maxWidth: '50%',
          margin: '1em 0',
        }}
        renderInput={(params) => <TextField {...params} label="Search" />}
      />
      <PlayersTable value={inputValue} players={players}/>
    </Box>
  );
}
export default Players;
