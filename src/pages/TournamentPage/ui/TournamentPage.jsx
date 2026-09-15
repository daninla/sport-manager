import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import TournamentInfo from './TournamentInfo';
import { Box, Typography } from '@mui/material';

import {
  TournamentStatusFallback,
  useGetTournamentByIdQuery,
  useTournamentMatches,
} from '@/entities/tournament';

import BaseButton from '@/shared/ui/BaseButton/BaseButton.jsx';
import MatchesTable from '@/widgets/TableMatches';

function TournamentPage() {
  const { t } = useTranslation('tournamentPage');
  const { id } = useParams();
  const { data: tournament, isLoading, error } = useGetTournamentByIdQuery(id);
  const { matches, playedMatches, upcomingMatches } =
    useTournamentMatches(tournament);
  const status = tournament.status;

  if (isLoading) return <TournamentStatusFallback type="loading" t={t} />;
  if (error) return <TournamentStatusFallback type="error" t={t} />;
  if (!tournament) return <TournamentStatusFallback type="notFound" t={t} />;

  return (
    <Box sx={{ p: 4 }}>
      <BaseButton text={t('back')} address="/tournaments" />
      <Typography variant="h4">{tournament.name}</Typography>

      <TournamentInfo tournament={tournament} t={t} />

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
