import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {
  Alert,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from '@mui/material';

import { createPlayerLookup } from '../../../entities/player/playerUtils.js';
import {
  useGetPlayoffMatchesByTournamentIdQuery,
  useGetTournamentsQuery,
  useUpdatePlayoffMatchMutation,
} from '../../../entities/tournament/index.js';
import { resolveMatchAndAdvance } from '../../../entities/tournament/playoff/advanceWinner.js';

import { MatchScoreDialog } from '../../../widgets/PlayoffBracket/ui/MatchScoreDialog.jsx';
import { PlayoffBracket } from '../../../widgets/PlayoffBracket/ui/PlayoffWidget.jsx';

export function PlayoffPage({ players = [] }) {
  const { id } = useParams();
  const selectedTournamentId = Number(id) || null;
  const [activeMatchForScore, setActiveMatchForScore] = useState(null);

  // RTK Query hooks
  const { data: tournaments = [], isLoading: isLoadingTournaments } =
    useGetTournamentsQuery();
  const {
    data: matches = [],
    isLoading: isLoadingMatches,
    isError: isMatchesError,
  } = useGetPlayoffMatchesByTournamentIdQuery(selectedTournamentId, {
    skip: !selectedTournamentId,
  });

  const [updatePlayoffMatch] = useUpdatePlayoffMatchMutation();

  // Pre-indexed player lookup map
  const playerLookup = useMemo(() => createPlayerLookup(players), [players]);

  // Handle score submission and automatic progression
  const handleSaveScore = async (matchId, score) => {
    try {
      // 1. Calculate updated state using tournament logic
      const updatedMatches = resolveMatchAndAdvance(
        matches,
        matchId,
        score,
        playerLookup,
      );

      // 2. Identify the modified current match
      const updatedCurrentMatch = updatedMatches.find(
        (m) => String(m.id) === String(matchId),
      );
      if (updatedCurrentMatch) {
        await updatePlayoffMatch(updatedCurrentMatch).unwrap();
      }

      // 3. Identify and persist the advanced successor match in the next round
      const successorMatch = updatedMatches.find((m) => {
        const original = matches.find(
          (orig) => String(orig.id) === String(m.id),
        );
        //It picks another match that just received a new player.
        return (
          String(m.id) !== String(matchId) &&
          (m.player1Id !== original?.player1Id ||
            m.player2Id !== original?.player2Id)
        );
      });

      if (successorMatch) {
        await updatePlayoffMatch(successorMatch).unwrap();
      }
    } catch (err) {
      console.error('Failed to update playoff match score:', err);
    }
  };

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
          players={players}
          tournamentId={selectedTournamentId}
          onEditMatch={(match) => setActiveMatchForScore(match)}
        />
      )}

      {/* Score Dialog */}
      <MatchScoreDialog
        open={Boolean(activeMatchForScore)}
        match={activeMatchForScore}
        playerLookup={playerLookup}
        onClose={() => setActiveMatchForScore(null)}
        onSave={handleSaveScore}
      />
    </Box>
  );
}

export default PlayoffPage;
