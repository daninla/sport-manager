import { useMemo } from 'react';
import { RoundColumn } from './RoundColumn.jsx';
import { Box, Typography } from '@mui/material';

import { groupAndSortTournamentRounds } from '../../../entities/tournament/playoff/bracketPlayoff.js';

export function PlayoffBracket({ matches = [], onEditMatch }) {
  const sortedRounds = useMemo(
    () => groupAndSortTournamentRounds(matches),
    [matches],
  );

  if (!sortedRounds.length) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          No playoff matches found for this tournament.
        </Typography>
      </Box>
    );
  }

  const totalRounds = sortedRounds.length;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        overflowX: 'auto',
        p: 3,
        bgcolor: '#f8fafc',
        borderRadius: 2,
      }}
    >
      {sortedRounds.map(([roundName, roundMatches], roundIndex) => (
        <RoundColumn
          key={roundName}
          roundName={roundName}
          matches={roundMatches}
          roundIndex={roundIndex}
          totalRounds={totalRounds}
          onEditMatch={onEditMatch}
        />
      ))}
    </Box>
  );
}

export default PlayoffBracket;
