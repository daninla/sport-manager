import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { createPlayerLookup } from '../../../entities/player/playerUtils.js';
import { groupAndSortTournamentRounds, isRoundLocked} from '../../../entities/tournament/playoff/bracketPlayoff.js';
import { RoundColumn } from './RoundColumn.jsx';

export function PlayoffBracket({
  matches = [],
  players = [],
  tournamentId,
  onEditMatch
}) {
  const playerLookup = useMemo(() => createPlayerLookup(players), [players]);
  const sortedRounds = useMemo(
    () => groupAndSortTournamentRounds(matches, tournamentId),
    [matches, tournamentId]
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
        borderRadius: 2
      }}
    >
      {sortedRounds.map(([roundName, roundMatches], roundIndex) => (
        <RoundColumn
          key={roundName}
          roundName={roundName}
          matches={roundMatches}
          roundIndex={roundIndex}
          totalRounds={totalRounds}
          playerLookup={playerLookup}
          onEditMatch={onEditMatch}
          isLocked={isRoundLocked(roundIndex, sortedRounds)}
        />
      ))}
    </Box>
  );
}

export default PlayoffBracket;