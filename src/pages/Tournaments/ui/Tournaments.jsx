import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography } from '@mui/material';

import { useGetTournamentsQuery } from '@/entities/tournament/api/tournamentApi';

import { TournamentCard } from '../../../widgets/TournamentCard';

function TournamentsPage() {
  const navigate = useNavigate();
  const {
    data: tournamentsList = [],
    isLoading,
    error,
  } = useGetTournamentsQuery();

  const handleOpenTournament = (tournamentId) => {
    navigate(`/tournaments/${tournamentId}`);
  };

  if (isLoading) {
    return (
      <Typography variant="h3" sx={{ mt: '10px', ml: '10px' }}>
        Loading tournaments...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography
        variant="h3"
        sx={{ mt: '10px', ml: '10px', color: 'error.main' }}
      >
        Error loading tournaments
      </Typography>
    );
  }

  return (
    <>
      <Typography
        variant="h3"
        sx={{
          mt: '10px',
          ml: '10px',
        }}
      >
        There are {tournamentsList.length} tournaments going on now
      </Typography>

      <Box
        sx={{
          mt: '30px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => navigate('/tournaments/add')}
        >
          Add new Tournament
        </Button>
      </Box>

      <Box
        sx={{
          display: {
            xs: 'flex',
            md: 'grid',
          },
          flexDirection: {
            xs: 'column',
          },
          gridTemplateColumns: '300px 300px 300px',
          gridTemplateRows: '400px 400px',
          gap: '100px',
          mt: '50px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {tournamentsList.map((tournament) => (
          <TournamentCard
            key={tournament.id}
            tournament={tournament}
            onOpen={handleOpenTournament}
          />
        ))}
      </Box>
    </>
  );
}

export default TournamentsPage;
