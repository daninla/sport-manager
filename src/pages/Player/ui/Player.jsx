import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { EditPlayerBtn } from '@/features/edit-player';
import { Box } from '@mui/material';

import { useGetPlayerByIdQuery } from '@/entities/player';

function Player() {
  const { t } = useTranslation('players');
  const { id } = useParams();
  const { data: player, isLoading, isError } = useGetPlayerByIdQuery(id);

  if (isLoading) return t('loading');
  if (isError) return t('fetchError');

  return (
    <Box sx={{ margin: '1em' }}>
      <EditPlayerBtn id={id} />
      <p>{t('playerTitle', { id })}</p>
    </Box>
  );
}

export default Player;
