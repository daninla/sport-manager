import { useNavigate } from 'react-router-dom';
import {
  TournamentFilters,
  useTournamentFilters,
} from '@/features/filter-tournaments';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography } from '@mui/material';

import { useGetTournamentsQuery } from '@/entities/tournament';

import { TournamentCard } from '@/widgets/TournamentCard';

function TournamentsPage() {
  const navigate = useNavigate();
  const {
    data: tournamentsList = [],
    isLoading,
    error,
  } = useGetTournamentsQuery();

  const { selectedFilters, setSelectedFilters, filteredTournaments } =
    useTournamentFilters(tournamentsList);

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
    <Box sx={{ position: 'relative', p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        There are {filteredTournaments.length} tournaments matching your filter
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
        <TournamentFilters
          selectedFilters={selectedFilters}
          onChange={setSelectedFilters}
        />

        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
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
              display: 'flex',
              flexWrap: 'wrap',
              gap: '30px',
              justifyContent: 'flex-start',
            }}
          >
            {filteredTournaments.map((tournament) => (
              <TournamentCard
                key={tournament.id}
                tournament={tournament}
                onOpen={handleOpenTournament}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TournamentsPage;
