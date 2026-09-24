import { ScoreControls } from './ScoreControls';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import UndoIcon from '@mui/icons-material/Undo';
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import {
  FINISHED_STATUS,
  ONGOING_STATUS,
  UPCOMING_STATUS,
} from '../model/constans';
import { useLiveMatchController } from '../model/useLiveMatchController';
import { useMatchTimer } from '../model/useMatchTimer';

import { ScoreBoard } from '../../../entities/match/ui/ScoreBoard';

function LiveMonitor({ matchId }) {
  const { matchState, addPoint, undo, setStatus } =
    useLiveMatchController(matchId);

  const isActive = matchState?.status === ONGOING_STATUS;
  const isFinished = matchState?.status === FINISHED_STATUS;

  const timerString = useMatchTimer(
    matchState?.timeStart,
    matchState.status,
    matchState.duration,
  );

  const handleToggleStatus = () => {
    if (matchState.status === UPCOMING_STATUS) {
      setStatus(ONGOING_STATUS);
    } else if (matchState.status === ONGOING_STATUS) {
      setStatus(FINISHED_STATUS);
    }
  };

  return (
    <Container sx={{ py: 3, width: '500px' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
          Live Monitor
        </Typography>
        {
          <Typography sx={{ fontWeight: 'bold', color: 'error.main' }}>
            ⏱ {timerString}
          </Typography>
        }
      </Box>

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
              {matchState.status === UPCOMING_STATUS ? 'Начать' : 'Завершить'}
            </Button>
          )}
        </Stack>
      </Paper>
    </Container>
  );
}

export default LiveMonitor;
