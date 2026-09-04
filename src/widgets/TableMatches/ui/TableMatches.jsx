import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

function MatchesTable({ matches }) {
  return (
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
          {matches.map((match, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{match.player1}</TableCell>

              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                {match.score}
              </TableCell>

              <TableCell>{match.player2}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default MatchesTable;
