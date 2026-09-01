import { useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { useGetTournamentByIdQuery } from '@/entities/tournament/api/tournamentApi';

function TournamentPage() {
  const { id } = useParams();
  const { data: tournament, isLoading, error } = useGetTournamentByIdQuery(id);

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

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">{tournament.name}</Typography>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Details:</Typography>
        <Typography sx={{ mt: 1 }}>
          Format: {tournament.bracketFormat}
        </Typography>
        <Typography>Match Format: {tournament.matchFormat}</Typography>
        <Typography>
          Participants: {tournament.currentParticipants}/
          {tournament.maxParticipants}
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Matches ({matches.length}):</Typography>
        {matches.length > 0 ? (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell>#</TableCell>
                  <TableCell>Player 1</TableCell>
                  <TableCell align="center">Score</TableCell>
                  <TableCell>Player 2</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {matches.map((match, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{match.player1}</TableCell>
                    <TableCell align="center">{match.score}</TableCell>
                    <TableCell>{match.player2}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography sx={{ mt: 2, color: 'text.secondary' }}>
            No matches yet
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default TournamentPage;
