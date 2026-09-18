import { ScoreControls } from './ScoreControls';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import UndoIcon from '@mui/icons-material/Undo';
import { Button, Container, Paper, Stack, Typography } from '@mui/material';

import { useLiveMatchController } from '../model/useLiveMatchController';

import { ScoreBoard } from '../../../entities/match/ui/ScoreBoard';

function LiveMonitor({ matchId }) {
  const { matchState, isLoading, addPoint, undo, setStatus } =
    useLiveMatchController(matchId);

  if (isLoading) return <div>Загрузка матча...</div>;

  const isActive = matchState.status === 'Ongoing';
  const isFinished = matchState.status === 'Finished';

  const handleToggleStatus = () => {
    if (matchState.status === 'Upcoming') {
      setStatus('Ongoing');
    } else if (matchState.status === 'Ongoing') {
      setStatus('Finished');
    }
  };
  return (
    <Container sx={{ py: 3, width: '500px' }}>
      <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
        Live Monitore
      </Typography>
      <Paper
        elevation={0}
        sx={{ p: 2, borderRadius: 3, bgcolor: 'background.default' }}
      >
        {/* Табло счёта */}
        <ScoreBoard
          sets={matchState.sets}
          currentSet={matchState.currentSet}
          completedSets={matchState.historySets || []}
          status={matchState.status}
          player1Name={matchState.player1?.fullName}
          player2Name={matchState.player2?.fullName}
        />

        {/* Кнопки добавления очков (+1) */}
        <ScoreControls
          onAddPoint={addPoint}
          disabled={!isActive}
          player1Name={matchState.player1?.fullName}
          player2Name={matchState.player2?.fullName}
        />

        {/* Панель управления: Undo и Статус */}
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            startIcon={<UndoIcon />}
            onClick={undo}
            disabled={matchState.actionHistory?.length === 0}
            sx={{ borderRadius: 2 }}
          >
            Отмена
          </Button>

          {!isFinished && (
            <Button
              fullWidth
              variant="contained"
              color={isActive ? 'error' : 'success'}
              startIcon={isActive ? <StopIcon /> : <PlayArrowIcon />}
              onClick={handleToggleStatus}
              sx={{ borderRadius: 2 }}
            >
              {matchState.status === 'Upcoming' ? 'Начать' : 'Завершить'}
            </Button>
          )}
        </Stack>
      </Paper>
    </Container>
  );
}

export default LiveMonitor;
