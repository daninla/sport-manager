import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Typography,
} from '@mui/material';

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

export function PlayoffMatchCard({ match, onEditMatch }) {
  if (!match) return null;

  const player1Name = match.player1?.fullName || 'Ожидает участника';
  const player2Name = match.player2?.fullName || 'Ожидает участника';
  const hasBothPlayers = Boolean(match.player1 && match.player2);
  const canEdit = hasBothPlayers && match.canEdit !== false;
  const isPlayer1Winner =
    match.winnerId !== null &&
    match.winnerId !== undefined &&
    String(match.winnerId) === String(match.player1?.id);
  const isPlayer2Winner =
    match.winnerId !== null &&
    match.winnerId !== undefined &&
    String(match.winnerId) === String(match.player2?.id);

  return (
    <Card
      variant="outlined"
      sx={{
        width: 240,
        height: 140,
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
          boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        },
      }}
    >
      <CardContent sx={{ p: 1.25, '&:last-child': { pb: 1 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 0.75,
          }}
        >
          <Typography
            variant="caption"
            fontWeight="bold"
            color="text.secondary"
          >
            MATCH #{match.matchIndex}
          </Typography>
          <Chip
            label={match.status || 'Pending'}
            color={getStatusChipColor(match.status)}
            sx={{
              height: 18,
              fontSize: '0.65rem',
              textTransform: 'capitalize',
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 0.25,
            fontWeight: isPlayer1Winner ? 700 : 400,
          }}
        >
          <Typography
            variant="body2"
            noWrap
            sx={{
              maxWidth: 160,
              fontSize: '0.8rem',
              color: isPlayer1Winner ? 'primary.main' : 'text.primary',
            }}
          >
            {player1Name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: 'inherit', fontSize: '0.8rem' }}
          >
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
            fontWeight: isPlayer2Winner ? 700 : 400,
          }}
        >
          <Typography
            variant="body2"
            noWrap
            sx={{
              maxWidth: 160,
              fontSize: '0.8rem',
              color: isPlayer2Winner ? 'primary.main' : 'text.primary',
            }}
          >
            {player2Name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: 'inherit', fontSize: '0.8rem' }}
          >
            {match.score?.player2 ?? 0}
          </Typography>
        </Box>

        {onEditMatch && (
          <Box sx={{ mt: 0.5 }}>
            <Button
              fullWidth
              size="small"
              variant="text"
              startIcon={
                canEdit ? (
                  <EditIcon sx={{ fontSize: 14 }} />
                ) : (
                  <LockIcon sx={{ fontSize: 13 }} />
                )
              }
              disabled={!canEdit}
              onClick={() => onEditMatch(match)}
              sx={{ fontSize: '0.7rem', py: 0 }}
            >
              {match.status === 'Finished' ? 'Edit Score' : 'Enter Score'}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default PlayoffMatchCard;
