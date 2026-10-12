import { useState } from 'react';
import { useParams } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {
  Alert,
  Box,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import {
  useGetPlayoffMatchesByTournamentIdQuery,
  useSubmitPlayoffMatchResultMutation,
} from '../../../entities/tournament/index.js';

import { MatchScoreDialog } from '../../../widgets/PlayoffBracket/ui/MatchScoreDialog.jsx';
import { PlayoffBracket } from '../../../widgets/PlayoffBracket/ui/PlayoffWidget.jsx';

export function PlayoffPage() {
  const { id } = useParams();
  const selectedTournamentId = Number(id) || null;
  const [activeMatchForScore, setActiveMatchForScore] = useState(null);

  const {
    data: matches = [],
    isLoading: isLoadingMatches,
    isError: isMatchesError,
  } = useGetPlayoffMatchesByTournamentIdQuery(selectedTournamentId, {
    skip: !selectedTournamentId,
  });

  const [submitMatchResult] = useSubmitPlayoffMatchResultMutation();

  const handleSaveScore = (matchId, score) =>
    submitMatchResult({
      id: matchId,
      tournamentId: selectedTournamentId,
      score,
    }).unwrap();

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: '#f1f5f9',
        minHeight: '100vh',
        minWidth: 0,
      }}
    >
      {/* Page Header */}
      <Paper
        elevation={0}
        sx={{ p: 3, mb: 4, borderRadius: 3, border: '1px solid #e2e8f0' }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <EmojiEventsIcon color="primary" sx={{ fontSize: 36 }} />
            <Box>
              <Typography variant="h5" fontWeight={700}>
                Tournament Playoff Bracket
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Track matches, record scores, and advance winners automatically
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Paper>

      {/* Content Area */}
      {isLoadingMatches ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
          <CircularProgress />
        </Box>
      ) : isMatchesError ? (
        <Alert severity="error">
          Failed to load playoff matches for the selected tournament.
        </Alert>
      ) : (
        <PlayoffBracket
          matches={matches}
          onEditMatch={(match) => setActiveMatchForScore(match)}
        />
      )}

      {/* Score Dialog */}
      {activeMatchForScore && (
        <MatchScoreDialog
          open
          match={activeMatchForScore}
          onClose={() => setActiveMatchForScore(null)}
          onSave={handleSaveScore}
        />
      )}
    </Box>
  );
}

export default PlayoffPage;
