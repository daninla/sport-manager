import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TournamentFilters } from '@/features/filter-tournaments';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography } from '@mui/material';

import { useGetTournamentsQuery } from '@/entities/tournament';

import { TournamentCard } from '../../../widgets/TournamentCard';

function TournamentsPage() {
  const [filter, setFilter] = useState([]);
  const navigate = useNavigate();
  const {
    data: tournamentsList = [],
    isLoading,
    error,
  } = useGetTournamentsQuery();

  const handleOpenTournament = (tournamentId) => {
    navigate(`/tournaments/${tournamentId}`);
  };

  const handleFilter = (f) => {
    setFilter(f);
  };

  const filteredTournaments = tournamentsList.filter((tournament) => {
    if (filter.length === 0) {
      return true;
    }
    return filter.some((f) => {
      switch (f) {
        case 'single-elimination':
          return tournament.bracketFormat === 'single-elimination';
        case 'Swiss System':
          return tournament.bracketFormat === 'Swiss System';
        case 'Round Robin':
          return tournament.bracketFormat === 'Round Robin';
        case 'Mixed System':
          return tournament.bracketFormat === 'Mixed System';
        default:
          return false;
      }
    });
  });

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
    <div style={{ position: 'relative' }}>
      <Typography
        variant="h4"
        sx={{
          mt: '10px',
          ml: '10px',
        }}
      >
        There are {tournamentsList.length} tournaments going on now
      </Typography>
      <TournamentFilters handleFilterChange={handleFilter} />
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
        {filteredTournaments.map((tournament) => (
          <TournamentCard
            key={tournament.id}
            tournament={tournament}
            onOpen={handleOpenTournament}
          />
        ))}
      </Box>
    </div>
  );
}

export default TournamentsPage;
