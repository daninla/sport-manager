import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import TournamentInfo from './TournamentInfo';
import { Box, Typography } from '@mui/material';

import { useGetMatchesByTournamentQuery } from '@/entities/match';
import {
  TournamentStatusFallback,
  useGetTournamentByIdQuery,
  useTournamentMatches,
} from '@/entities/tournament';

import BaseButton from '@/shared/ui/BaseButton/BaseButton.jsx';
import MatchesTable from './TableMatches/TableMatches';

function TournamentPage() {
  const { t } = useTranslation('tournamentPage');
  const { id } = useParams();

  const { data: tournament, isLoading, error } = useGetTournamentByIdQuery(id);

  const { data: rawMatches = [] } = useGetMatchesByTournamentQuery(id, {
    skip: !id,
  });

  const { matches } = useTournamentMatches(rawMatches);

  if (isLoading) return <TournamentStatusFallback type="loading" t={t} />;
  if (error) return <TournamentStatusFallback type="error" t={t} />;
  if (!tournament) return <TournamentStatusFallback type="notFound" t={t} />;

  const status = tournament.status;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, minWidth: 0 }}>
      <BaseButton text={t('back')} address="/tournaments" />
      <Typography variant="h4">{tournament.name}</Typography>

      <TournamentInfo tournament={tournament} t={t} />

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">
          {t('matches', { count: matches.length })}
        </Typography>
        <Typography variant="h6"> {status}</Typography>

        <MatchesTable matches={matches} />
      </Box>
    </Box>
  );
}

export default TournamentPage;
