import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';

const parseInitialScore = (scoreStr) => {
  if (!scoreStr || scoreStr === '-') return { p1: 0, p2: 0 };
  const parts = scoreStr.split('-');
  return {
    p1: parseInt(parts[0], 10) || 0,
    p2: parseInt(parts[1], 10) || 0,
  };
};

function LiveMonitor({ match, onClose }) {
  const initialScore = parseInitialScore(match?.score);

  const [scoreP1, setScoreP1] = useState(initialScore.p1);
  const [scoreP2, setScoreP2] = useState(initialScore.p2);
  const [isActive, setIsActive] = useState(Boolean(match?.active));

  if (!match) return null;

  const handleScoreChange = (player, delta) => {
    if (player === 1) {
      setScoreP1((prev) => Math.max(0, prev + delta));
    } else {
      setScoreP2((prev) => Math.max(0, prev + delta));
    }
  };

  return (
    <Box
      sx={{
        width: 500,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        Live Monitor
      </Typography>

      <Box
        sx={{
          p: 2,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          backgroundColor: '#fafafa',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          sx={{ mb: 2 }}
        >
          Status: {isActive ? 'Active Match' : 'Finished / Pending'}
        </Typography>

        {/* Управление счетом */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            my: 2,
          }}
        >
          {/* Игрок 1 */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
              {match.player1}
            </Typography>
            <Stack direction="row" spacing={1} justifyContent="center">
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleScoreChange(1, -1)}
              >
                -1
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={() => handleScoreChange(1, 1)}
              >
                +1
              </Button>
            </Stack>
          </Box>

          {/* Табло счета */}
          <Typography
            variant="h4"
            sx={{ mx: 2, color: '#fda65f', fontWeight: 'bold' }}
          >
            {scoreP1} - {scoreP2}
          </Typography>

          {/* Игрок 2 */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
              {match.player2}
            </Typography>
            <Stack direction="row" spacing={1} justifyContent="center">
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleScoreChange(2, -1)}
              >
                -1
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={() => handleScoreChange(2, 1)}
              >
                +1
              </Button>
            </Stack>
          </Box>
        </Box>

        {/* Переключатель активности */}
        <FormControl fullWidth size="small" sx={{ mt: 3 }}>
          <InputLabel>Active State</InputLabel>
          <Select
            value={isActive}
            label="Active State"
            onChange={(e) => setIsActive(e.target.value)}
          >
            <MenuItem value={true}>Active (In Progress)</MenuItem>
            <MenuItem value={false}>Inactive (Pending / Finished)</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Кнопки действий */}
      <Box sx={{ mt: 'auto', display: 'flex', gap: 2 }}>
        {onClose && (
          <Button
            variant="outlined"
            color="primary"
            onClick={onClose}
            fullWidth
          >
            Close
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default LiveMonitor;
