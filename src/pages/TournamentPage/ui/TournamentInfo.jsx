import { Box, Typography } from '@mui/material';

function TournamentInfo({ tournament, t }) {
  return (
    <div>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">{t('details')}</Typography>
        <Typography sx={{ mt: 1 }}>
          <span style={{ fontWeight: 'bold' }}>{t('location')}</span>
          {tournament.location}
        </Typography>
        <Typography>
          <span style={{ fontWeight: 'bold' }}>{t('ageCategory')}</span>
          {tournament.ageCategory}
        </Typography>
        <Typography>
          <span style={{ fontWeight: 'bold' }}>{t('competitionType')}</span>
          {tournament.competitionType}
        </Typography>
        <Typography>
          <span style={{ fontWeight: 'bold' }}>{t('format')}</span>
          {tournament.bracketFormat}
        </Typography>
        <Typography>
          <span style={{ fontWeight: 'bold' }}>{t('matchFormat')}</span>
          {tournament.matchFormat}
        </Typography>
        <Typography>
          <span style={{ fontWeight: 'bold' }}>{t('pointsPerGame')}</span>
          {tournament.pointsPerGame}
        </Typography>
        <Typography>
          <span style={{ fontWeight: 'bold' }}>{t('participants')}</span>
          {tournament.currentParticipants}/{tournament.maxParticipants}
        </Typography>
      </Box>
    </div>
  );
}

export default TournamentInfo;
