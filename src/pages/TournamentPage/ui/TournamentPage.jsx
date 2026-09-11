import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { useGetTournamentByIdQuery } from '@/entities/tournament';

import BaseButton from '@/shared/ui/BaseButton/BaseButton.jsx';
import MatchesTable from '@/widgets/TableMatches';

function TournamentPage() {
  const { t } = useTranslation('tournamentPage');
  const { id } = useParams();
  const { data: tournament, isLoading, error } = useGetTournamentByIdQuery(id);
  if (isLoading) {
    return (
      <Typography variant="h4" sx={{ p: 4 }}>
        {t('loading')}
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="h4" sx={{ p: 4, color: 'error.main' }}>
        {t('error')}
      </Typography>
    );
  }

  if (!tournament) {
    return (
      <Typography variant="h4" sx={{ p: 4 }}>
        {t('notFound')}
      </Typography>
    );
  }
  const matches = tournament.matches || [];
  const playedMatches = matches.filter((match) => match.score !== '-');
  const upcomingMatches = matches.filter((match) => match.score === '-');
  const status = tournament.status;

  return (
    <Box sx={{ p: 4 }}>
      <BaseButton text={t('back')} address="/tournaments" />
      <Typography variant="h4">{tournament.name}</Typography>

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

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">
          {t('matches', { count: matches.length })}
        </Typography>
        <Typography variant="h6">
          {t('status')} {status}
        </Typography>

        {status === 'Ongoing' ? (
          <>
            <Typography variant="h6" sx={{ mt: 3 }}>
              {t('playedMatches')}
            </Typography>

            <MatchesTable matches={playedMatches} />

            <Typography variant="h6" sx={{ mt: 4 }}>
              {t('upcomingMatches')}
            </Typography>

            <MatchesTable matches={upcomingMatches} />
          </>
        ) : (
          <MatchesTable matches={matches} />
        )}
      </Box>
    </Box>
  );
}

export default TournamentPage;
