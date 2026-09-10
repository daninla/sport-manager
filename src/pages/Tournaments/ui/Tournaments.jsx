import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useGetTournamentsQuery } from '@/entities/tournament';
import { TournamentFilters, useTournamentFilters } from '@/features/filter-tournaments';
import { TournamentCard } from '@/widgets/TournamentCard';

function TournamentsPage() {
  const navigate = useNavigate();
  const { data: tournamentsList = [], isLoading, error } = useGetTournamentsQuery();
  const { selectedFilters, setSelectedFilters, filteredTournaments } = useTournamentFilters(tournamentsList);

  if (isLoading) return <Typography variant="h3">Loading tournaments...</Typography>;
  if (error) return <Typography variant="h3" color="error.main">Error loading tournaments</Typography>;

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

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
            {filteredTournaments.map((tournament) => (
              <TournamentCard
                key={tournament.id}
                tournament={tournament}
                onOpen={(id) => navigate(`/tournaments/${id}`)}
                onEdit={(id) => navigate(`/tournaments/${id}/edit`)}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TournamentsPage;