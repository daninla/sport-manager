import AddIcon from '@mui/icons-material/Add';
import { Button, Stack } from '@mui/material';

export function ScoreControls({
  onAddPoint,
  disabled = false,
  player1Name = 'Игрок 1',
  player2Name = 'Игрок 2',
}) {
  return (
    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
      <Button
        fullWidth
        variant="contained"
        size="large"
        disabled={disabled}
        startIcon={<AddIcon />}
        onClick={() => onAddPoint('player1')}
        sx={{ py: 1.5, fontSize: '1.1rem', borderRadius: 2 }}
      >
        {player1Name}
      </Button>

      <Button
        fullWidth
        variant="contained"
        size="large"
        disabled={disabled}
        startIcon={<AddIcon />}
        onClick={() => onAddPoint('player2')}
        sx={{ py: 1.5, fontSize: '1.1rem', borderRadius: 2 }}
      >
        {player2Name}
      </Button>
    </Stack>
  );
}
