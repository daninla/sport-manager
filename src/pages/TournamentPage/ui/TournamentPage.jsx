import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { useGetTournamentByIdQuery } from '@/entities/tournament/api/tournamentApi';

import BaseButton from '@/shared/BaseButton/ui/BaseButton';
import MatchesTable from '@/widgets/TableMatches/ui/TableMatches';

function TournamentPage() {
  const { id } = useParams();
  const { data: tournament, isLoading, error } = useGetTournamentByIdQuery(id);
  let status = '';
  const tournamentStart = new Date(
    `${tournament.date}T${tournament.timeStart}`,
  );

  const tournamentEnd = new Date(`${tournament.date}T${tournament.timeEnd}`);

  const currentDate = new Date();

  if (currentDate < tournamentStart) {
    status = 'Upcoming';
  } else if (currentDate <= tournamentEnd) {
    status = 'Ongoing';
  } else {
    status = 'Completed';
  }

  if (isLoading) {
    return (
      <Typography variant="h4" sx={{ p: 4 }}>
        Loading tournament...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="h4" sx={{ p: 4, color: 'error.main' }}>
        Error loading tournament
      </Typography>
    );
  }

  if (!tournament) {
    return (
      <Typography variant="h4" sx={{ p: 4 }}>
        Tournament not found
      </Typography>
    );
  }

  const matches = tournament.matches || [];

  const playedMatches = matches.filter((match) => match.score !== '-');
  const upcomingMatches = matches.filter((match) => match.score === '-');

  return (
    <Box sx={{ p: 4 }}>
      <BaseButton text="Back to Tournaments" address="/tournaments" />
      <Typography variant="h4">{tournament.name}</Typography>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Details:</Typography>
        <Typography sx={{ mt: 1 }}>
          <span style={{ fontWeight: 'bold' }}>Format:</span>
          {tournament.bracketFormat}
        </Typography>
        <Typography>
          <span style={{ fontWeight: 'bold' }}>Match Format:</span>
          {tournament.matchFormat}
        </Typography>
        <Typography>
          <span style={{ fontWeight: 'bold' }}>Participants:</span>
          {tournament.currentParticipants}/{tournament.maxParticipants}
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Matches ({matches.length}):</Typography>
        <Typography variant="h6">Status: {status}</Typography>

        {status === 'Ongoing' ? (
          <>
            <Typography variant="h6" sx={{ mt: 3 }}>
              Played and ongoing matches
            </Typography>

            <MatchesTable matches={playedMatches} />

            <Typography variant="h6" sx={{ mt: 4 }}>
              Upcoming matches
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
