import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useGetTournamentByIdQuery } from '@/entities/tournament';
import { PlayoffBracket } from '@/widgets/PlayoffBracket';

function TournamentPlayoffPage() {
  const { id } = useParams();
  const { data: tournament, isLoading, error } = useGetTournamentByIdQuery(id);

  if (isLoading) {
    return <Typography sx={{ p: 4 }}>Loading playoff...</Typography>;
  }

  if (error || !tournament) {
    return (
      <Typography sx={{ p: 4, color: 'error.main' }}>
        Tournament not found
      </Typography>
    );
  }

  const playoff = tournament.playoff || [];
  const isSingleElimination = tournament.bracketFormat === 'Single Elimination';

  if (!isSingleElimination || playoff.length === 0) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Playoff bracket
        </Typography>
        <Typography sx={{ color: '#cbd5e1' }}>
          This tournament format does not have a playoff bracket yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top, #172554 0%, #0f172a 42%, #020817 100%)',
        color: '#f8fafc',
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: 0.5 }}>
          {tournament.name}
        </Typography>
        <Typography sx={{ mt: 1, color: '#cbd5e1' }}>
          Playoff bracket · {tournament.bracketFormat}
        </Typography>
      </Box>

      <PlayoffBracket playoff={playoff} />
    </Box>
  );
}

export default TournamentPlayoffPage;
