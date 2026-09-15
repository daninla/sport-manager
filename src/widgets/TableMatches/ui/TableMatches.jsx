import { useState } from 'react';
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

import LiveMonitor from '@/features/update-match-score/ui/LiveMonitor.jsx';
import MatchStatusBage from '../../../shared/ui/MatchStatusBage/MatchStatusBage';

function MatchesTable({ matches }) {
  const [selectedMatch, setSelectedMatch] = useState(null);

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
            <TableRow sx={{ backgroundColor: '#fda65f' }}>
              <TableCell>#</TableCell>
              <TableCell>Player 1</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Player 2</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {matches?.map((match, index) => (
              <TableRow
                key={index}
                hover
                onClick={() => handleRowClick(match)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell sx={{ display: 'flex', gap: 2 }}>
                  {index + 1}
                  <Box sx={{ width: '90px' }}>
                    {<MatchStatusBage status={match.status} />}
                  </Box>
                </TableCell>
                <TableCell>{match.player1.name}</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                  {match.score.player1} - {match.score.player2}
                </TableCell>
                <TableCell>{match.player2.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Drawer
        anchor="right"
        open={Boolean(selectedMatch)}
        onClose={handleClose}
      >
        <LiveMonitor match={selectedMatch} onClose={handleClose} />
      </Drawer>
    </>
  );
}

export default MatchesTable;
