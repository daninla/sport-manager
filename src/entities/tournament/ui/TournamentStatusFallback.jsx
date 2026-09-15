import { Typography } from '@mui/material';

function TournamentStatusFallback({ type, t }) {
  const config = {
    loading: { color: undefined, text: t('loading') },
    error: { color: 'error.main', text: t('error') },
    notFound: { color: undefined, text: t('notFound') },
  };

  const { color, text } = config[type];

  return (
    <Typography variant="h4" sx={{ p: 4, color }}>
      {text}
    </Typography>
  );
}

export default TournamentStatusFallback;
