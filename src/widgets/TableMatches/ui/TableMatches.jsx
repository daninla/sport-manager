import { useMemo, useState } from 'react';
import {
  Box,
  Drawer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import LiveMonitor from '../../../features/manage-live-match/ui/LiveMonitor';
import MatchStatusBage from '../../../shared/ui/MatchStatusBage/MatchStatusBage';
import { useGetPlayersQuery } from '../../../entities/match/api/matchApi';

function MatchesTable({ matches }) {
  const [selectedMatch, setSelectedMatch] = useState(null);

  // Matches now only carry player1Id/player2Id, so we fetch the
  // players collection once and resolve names by id.
  const { data: players } = useGetPlayersQuery();

  const playersById = useMemo(() => {
    if (!players) return {};
    return Object.fromEntries(players.map((player) => [player.id, player]));
  }, [players]);

  const getPlayerName = (playerId) =>
    playersById[playerId]?.name ?? `Player ${playerId}`;

  const handleRowClick = (match) => {
    setSelectedMatch(match);
  };

  const handleClose = () => {
    setSelectedMatch(null);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 2, width: '50%' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'secondary.contrastText' }}>
              <TableCell>#</TableCell>
              <TableCell>Player 1</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Player 2</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {matches?.map((match, index) => (
              <TableRow
                key={match.id}
                hover
                onClick={() => handleRowClick(match)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell sx={{ display: 'flex', gap: 2 }}>
                  {index + 1}
                  <Box sx={{ width: '90px' }}>
                    <MatchStatusBage status={match.status} />
                  </Box>
                </TableCell>
                <TableCell>{getPlayerName(match.player1Id)}</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                  {match.score.player1} - {match.score.player2}
                </TableCell>
                <TableCell>{getPlayerName(match.player2Id)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Drawer anchor="right" open={Boolean(selectedMatch)} onClose={handleClose}>
        {selectedMatch && (
          <LiveMonitor matchId={selectedMatch.id} onClose={handleClose} />
        )}
      </Drawer>
    </>
  );
}

export default MatchesTable;