import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Alert,
  Stack
} from '@mui/material';
import { getPlayerDisplayName } from '../../../entities/player/playerUtils.js';

/**
 * Modal dialog for inputting and validating playoff match scores.
 *
 * @param {Object} props
 * @param {boolean} props.open - Visibility state of the modal dialog.
 * @param {Object|null} props.match - Selected playoff match to resolve.
 * @param {Map} props.playerLookup - Pre-indexed players cache.
 * @param {Function} props.onClose - Modal close handler.
 * @param {Function} props.onSave - Save callback invoked with (matchId, { player1, player2 }).
 */
export function MatchScoreDialog({
  open,
  match,
  playerLookup,
  onClose,
  onSave
}) {
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  // Sync state whenever a new match is opened
  useEffect(() => {
    if (match) {
      setScore1(match.score?.player1 ?? 0);
      setScore2(match.score?.player2 ?? 0);
      setErrorMessage('');
    }
  }, [match]);

  if (!match) return null;

  const player1Name = getPlayerDisplayName(match.player1Id, match.player1, playerLookup);
  const player2Name = getPlayerDisplayName(match.player2Id, match.player2, playerLookup);

  const num1 = Number(score1);
  const num2 = Number(score2);
  const isP1Leading = num1 > num2;
  const isP2Leading = num2 > num1;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (num1 < 0 || num2 < 0) {
      setErrorMessage('Scores cannot be negative numbers.');
      return;
    }

    if (num1 === num2) {
      setErrorMessage('Playoff matches cannot end in a draw. Please select a winner.');
      return;
    }

    setErrorMessage('');
    onSave(match.id, { player1: num1, player2: num2 });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
          <Typography variant="h6" component="div" fontWeight={700}>
            Match #{match.matchIndex} Result
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {match.round}
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <Stack spacing={2.5} sx={{ mt: 1 }}>
            {/* Player 1 Input */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 1.5,
                borderRadius: 2,
                border: '1px solid',
                borderColor: isP1Leading ? 'primary.main' : 'divider',
                bgcolor: isP1Leading ? 'action.selected' : 'background.paper'
              }}
            >
              <Typography
                variant="body2"
                fontWeight={isP1Leading ? 700 : 500}
                sx={{ maxWidth: 200 }}
                noWrap
              >
                {player1Name}
              </Typography>
              <TextField
                type="number"
                size="small"
                inputProps={{ min: 0, style: { textAlign: 'center', fontWeight: 'bold' } }}
                sx={{ width: 75 }}
                value={score1}
                onChange={(e) => setScore1(e.target.value)}
              />
            </Box>

            {/* Player 2 Input */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 1.5,
                borderRadius: 2,
                border: '1px solid',
                borderColor: isP2Leading ? 'primary.main' : 'divider',
                bgcolor: isP2Leading ? 'action.selected' : 'background.paper'
              }}
            >
              <Typography
                variant="body2"
                fontWeight={isP2Leading ? 700 : 500}
                sx={{ maxWidth: 200 }}
                noWrap
              >
                {player2Name}
              </Typography>
              <TextField
                type="number"
                size="small"
                inputProps={{ min: 0, style: { textAlign: 'center', fontWeight: 'bold' } }}
                sx={{ width: 75 }}
                value={score2}
                onChange={(e) => setScore2(e.target.value)}
              />
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Confirm & Advance
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default MatchScoreDialog;