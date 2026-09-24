import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Chip,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import { getPlayerDisplayName } from '../../../entities/player/playerUtils.js';

function getStatusChipColor(status) {
  switch (status?.toLowerCase()) {
    case 'finished':
      return 'success';
    case 'live':
      return 'error';
    case 'upcoming':
      return 'primary';
    default:
      return 'default';
  }
}

export function PlayoffMatchCard({ match, playerLookup, onEditMatch, isLocked = false }) {
  if (!match) return null;

  const player1Name = getPlayerDisplayName(match.player1Id, match.player1, playerLookup);
  const player2Name = getPlayerDisplayName(match.player2Id, match.player2, playerLookup);

  const isPlayer1Winner =
    match.winnerId !== null &&
    match.winnerId !== undefined &&
    String(match.winnerId) === String(match.player1Id);

  const isPlayer2Winner =
    match.winnerId !== null &&
    match.winnerId !== undefined &&
    String(match.winnerId) === String(match.player2Id);
  const hasBothPlayers = Boolean(match.player1Id || match.player1) && Boolean(match.player2Id || match.player2);

  const canEdit =hasBothPlayers && !isLocked;

  return (
    <Card
      variant="outlined"
      sx={{
        width: 240,
        height: 140, // Fixed height for exact line alignment
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        borderColor: match.status === 'Finished' ? 'grey.300' : 'primary.light',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexShrink: 0,
        bgcolor: '#ffffff',
        zIndex: 2,
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
        }
      }}
    >
      <CardContent sx={{ p: 1.25, '&:last-child': { pb: 1 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
          <Typography variant="caption" fontWeight="bold" color="text.secondary">
            MATCH #{match.matchIndex}
          </Typography>
          <Chip
            size="small"
            label={match.status || 'Pending'}
            color={getStatusChipColor(match.status)}
            sx={{ height: 18, fontSize: '0.65rem', textTransform: 'capitalize' }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 0.25,
            fontWeight: isPlayer1Winner ? 700 : 400
          }}
        >
          <Typography
            variant="body2"
            noWrap
            sx={{
              maxWidth: 160,
              fontSize: '0.8rem',
              color: isPlayer1Winner ? 'primary.main' : 'text.primary'
            }}
          >
            {player1Name}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 'inherit', fontSize: '0.8rem' }}>
            {match.score?.player1 ?? 0}
          </Typography>
        </Box>

        <Divider sx={{ my: 0.25 }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 0.25,
            fontWeight: isPlayer2Winner ? 700 : 400
          }}
        >
          <Typography
            variant="body2"
            noWrap
            sx={{
              maxWidth: 160,
              fontSize: '0.8rem',
              color: isPlayer2Winner ? 'primary.main' : 'text.primary'
            }}
          >
            {player2Name}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 'inherit', fontSize: '0.8rem' }}>
            {match.score?.player2 ?? 0}
          </Typography>
        </Box>

        {onEditMatch && (
          <Box sx={{ mt: 0.5 }}>
            <Button
              fullWidth
              size="small"
              variant="text"
              startIcon={<EditIcon sx={{ fontSize: 14 }} />}
              disabled={!canEdit}
              startIcon={isLocked ? <LockIcon sx={{ fontSize: 13 }} /> : <EditIcon sx={{ fontSize: 14 }} />}
              onClick={() => onEditMatch(match)}
              sx={{ fontSize: '0.7rem', py: 0 }}
            >
              {isLocked ? 'Locked' : match.status === 'Finished' ? 'Edit Score' : 'Enter Score'}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default PlayoffMatchCard;