import PlayerName from './PlayerName';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import {
  FINISHED_STATUS,
  ONGOING_STATUS,
} from '@/features/manage-live-match/model/constans';
import { useLiveMatchController } from '@/features/manage-live-match/model/useLiveMatchController';
import { useMatchTimer } from '@/features/manage-live-match/model/useMatchTimer';

import MatchStatusBage from '@/shared/ui/MatchStatusBage/MatchStatusBage';

function MatchTableRow({ match, index }) {
  const { matchState, addPoint, undo, setStatus } = useLiveMatchController(
    match.id,
  );

  const time = useMatchTimer(
    matchState.timeStart ?? match.timeStart,
    matchState.status || match.status,
    matchState.duration ?? match.duration,
  );
  const isActive = matchState.status === ONGOING_STATUS;
  const isFinished = matchState.status === FINISHED_STATUS;
  const sets = matchState.sets || match.score;
  const currentSet = matchState.currentSet;

  const changeStatus = () => {
    setStatus(isActive ? FINISHED_STATUS : ONGOING_STATUS);
  };

  return (
    <TableRow hover>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <span>{index + 1}</span>
          <MatchStatusBage status={matchState.status || match.status} />
          {!isFinished && (
            <Button
              size="small"
              onClick={changeStatus}
              sx={{ border: '1px black solid' }}
            >
              {isActive ? 'Finish' : 'Start'}
            </Button>
          )}
        </Box>
      </TableCell>
      <TableCell>2</TableCell>
      <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
        {(matchState.timeStart ?? match.timeStart)
          ? new Date(
              matchState.timeStart ?? match.timeStart,
            ).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })
          : '—'}
      </TableCell>
      <TableCell>
        <PlayerName playerId={match.player1Id} />
      </TableCell>
      <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <Button
            size="small"
            disabled={!isActive}
            onClick={() => addPoint('player1')}
            sx={{ background: '#1d646d', color: 'white' }}
          >
            +1
          </Button>
          <Box sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
            {sets.player1} - {sets.player2}
            <Box component="span" sx={{ ml: 1, fontSize: '0.85rem' }}>
              ({currentSet.player1}:{currentSet.player2})
            </Box>
          </Box>
          <Button
            size="small"
            disabled={!isActive}
            onClick={() => addPoint('player2')}
            sx={{ background: '#1d646d', color: 'white' }}
          >
            +1
          </Button>
          <Button
            size="small"
            disabled={!matchState.actionHistory?.length}
            onClick={undo}
            sx={{ background: '#faa865' }}
          >
            Undo
          </Button>
        </Box>
      </TableCell>
      <TableCell>
        <PlayerName playerId={match.player2Id} />
      </TableCell>
      <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
        {time}
      </TableCell>
    </TableRow>
  );
}

function MatchesTable({ matches }) {
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          mt: 2,
          width: 'fit-content',
          maxWidth: '100%',
          overflowX: 'auto',
        }}
      >
        <Table sx={{ width: 'auto', minWidth: 620, tableLayout: 'auto' }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'secondary.contrastText' }}>
              <TableCell>Match</TableCell>
              <TableCell>Tour</TableCell>
              <TableCell>Start</TableCell>
              <TableCell sx={{ minWidth: 150 }}>Player 1</TableCell>
              <TableCell align="center">Score</TableCell>
              <TableCell sx={{ minWidth: 180 }}>Player 2</TableCell>
              <TableCell align="right">Duration</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {matches?.map((match, index) => (
              <MatchTableRow key={match.id} match={match} index={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default MatchesTable;
