import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AddPlayerBtn } from '@/features/add-player';
import { Autocomplete, Box, TextField } from '@mui/material';

import { useGetPlayersQuery } from '@/entities/player';

import { PlayersTable } from '@/widgets/PlayersTable';

function Players() {
  const { t } = useTranslation('players');
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);

  const { data: players, isLoading, isError } = useGetPlayersQuery();

  if (isLoading) return t('loading');
  if (isError) return <div>{t('error')}</div>;

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
        renderInput={(params) => <TextField {...params} label={t('search')} />}
      />
      <PlayersTable value={inputValue} />
    </Box>
  );
}
export default Players;
