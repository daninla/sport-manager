import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';

function TournamentInfo({ tournament, t }) {
  const { i18n } = useTranslation();
  const startDate = tournament.startsAt ? new Date(tournament.startsAt) : null;
  const formattedStartsAt =
    startDate && !Number.isNaN(startDate.getTime())
      ? new Intl.DateTimeFormat(
          i18n.language.startsWith('ua') ? 'uk-UA' : 'en-GB',
          {
            dateStyle: 'medium',
            timeStyle: 'short',
            timeZone: 'Europe/Kyiv',
          },
        ).format(startDate)
      : '—';

  return (
    <div>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">{t('details')}</Typography>
        <Typography sx={{ mt: 1 }}>
          <span style={{ fontWeight: 'bold' }}>{t('startsAt')} </span>
          {formattedStartsAt}
        </Typography>
        <Typography>
          <span style={{ fontWeight: 'bold' }}>{t('location')}</span>
          {tournament.location}
        </Typography>
        <Typography>
          <span style={{ fontWeight: 'bold' }}>{t('ageCategory')}</span>
          {tournament.ageCategory}
        </Typography>
        {tournament.isRated && (
          <>
            <Typography>
              <span style={{ fontWeight: 'bold' }}>{t('ratingLimit')}</span>
              {tournament.ratingLimit}
            </Typography>
          </>
        )}
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
          {`Best of ${tournament.bestOf}`}
        </Typography>
        <Typography>
          <span style={{ fontWeight: 'bold' }}>{t('pointsPerGame')}</span>
          {tournament.pointsPerGame}
        </Typography>
        <Typography>
          <span style={{ fontWeight: 'bold' }}>{t('gender')}</span>
          {tournament.gender}
        </Typography>
        {tournament.isRated && (
          <>
            <Typography>
              <span style={{ fontWeight: 'bold' }}>{t('ratingCoefficient')}</span>
              {tournament.ratingCoefficient}
            </Typography>
          </>
        )}
        <Typography>
          <span style={{ fontWeight: 'bold' }}>{t('participants')}</span>
          {tournament.currentParticipants}
        </Typography>
      </Box>
    </div>
  );
}

export default TournamentInfo;
