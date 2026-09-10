import { useState } from 'react';
import tennisIcon from '../../Header/iconAssets/icons/ping-pong.png';
import { DeleteTournamentButton } from '@/features/delete-tournament';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PeopleIcon from '@mui/icons-material/People';
import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';

import { useGetTournamentByIdQuery } from '@/entities/tournament';

export function TournamentCard({ tournament, onOpen, onEdit }) {
  const tournamentId = String(tournament?.id || '');

  const { data } = useGetTournamentByIdQuery(tournamentId, {
    skip: !tournamentId,
  });

  const matches = data?.matches || [];

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (event) => {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }
    setAnchorEl(null);
  };

  const handleEditClick = (event) => {
    event.stopPropagation();
    handleCloseMenu();
    if (onEdit) onEdit(tournamentId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ongoing':
        return '#ef4444';
      case 'Upcoming':
        return '#3b82f6';
      case 'Completed':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  return (
    <Box
      onClick={() => onOpen && onOpen(tournamentId)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        backgroundColor: '#040b22',
        borderRadius: '12px',
        p: '20px',
        width: '300px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            px: '10px',
            py: '2px',
            backgroundColor: getStatusColor(tournament.status),
            borderRadius: '6px',
          }}
        >
          {tournament.status === 'Ongoing' && (
            <Box
              sx={{
                height: '6px',
                width: '6px',
                borderRadius: '50%',
                backgroundColor: 'white',
              }}
            />
          )}
          <Typography
            sx={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}
          >
            {tournament.status === 'Ongoing'
              ? 'LIVE'
              : tournament.status?.toUpperCase()}
          </Typography>
        </Box>

        <IconButton
          onClick={handleOpenMenu}
          size="small"
          sx={{
            color: '#8892b0',
            '&:hover': {
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleCloseMenu}
          onClick={(e) => e.stopPropagation()}
          PaperProps={{
            elevation: 8,
            sx: {
              bgcolor: '#0a192f',
              color: '#fff',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              minWidth: '140px',
              '& .MuiMenuItem-root': {
                fontSize: '14px',
                py: '8px',
                px: '12px',
                borderRadius: '4px',
                mx: '4px',
                my: '2px',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.08)',
                },
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleEditClick}>
            <ListItemIcon
              sx={{ color: '#60a5fa', minWidth: '28px !important' }}
            >
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </MenuItem>

          <DeleteTournamentButton
            tournamentId={tournamentId}
            onSuccess={handleCloseMenu}
          />
        </Menu>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Box
          component="img"
          src={tennisIcon}
          sx={{ width: '20px', height: '20px' }}
        />
        <Typography
          variant="h6"
          sx={{ color: 'white', fontWeight: 600, fontSize: '1rem' }}
        >
          "{tournament.name}"
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Typography sx={{ color: '#8892b0', fontSize: '0.85rem' }}>
          {tournament.bracketFormat}
        </Typography>
        <Box
          sx={{
            height: '4px',
            width: '4px',
            borderRadius: '50%',
            backgroundColor: '#8892b0',
          }}
        />
        <Typography sx={{ color: '#8892b0', fontSize: '0.85rem' }}>
          {tournament.matchFormat}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {matches.slice(-2).map((match, index) => (
          <Box
            key={match.id || `${tournamentId}-match-${index}`}
            sx={{
              p: 1,
              bgcolor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: index === 0 ? '6px 6px 0 0' : '0 0 6px 6px',
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: '#64748b', display: 'block', mb: 0.5 }}
            >
              Match {index}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                color: 'white',
                fontSize: '0.85rem',
              }}
            >
              <span>{match.player1}</span>
              <span style={{ color: '#64748b' }}>vs</span>
              <span>{match.player2}</span>
            </Box>
            <Typography
              align="center"
              sx={{
                color: '#00e676',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                mt: 0.5,
              }}
            >
              {match.score}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', mb: 1 }}>
          <PeopleIcon sx={{ color: '#8892b0', fontSize: 18 }} />
          <Typography sx={{ color: '#8892b0', fontSize: '0.85rem' }}>
            {tournament.currentParticipants} / {tournament.maxParticipants}
          </Typography>
        </Box>

        <LinearProgress
          value={
            (tournament.currentParticipants / tournament.maxParticipants) * 100
          }
          variant="determinate"
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            '& .MuiLinearProgress-bar': {
              borderRadius: 3,
              backgroundColor: '#00e676',
            },
          }}
        />
      </Box>

      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 1,
          bgcolor: '#00e676',
          color: '#040b22',
          fontWeight: 'bold',
          textTransform: 'none',
          '&:hover': { bgcolor: '#00c853' },
        }}
        onClick={(event) => {
          event.stopPropagation();
          onOpen && onOpen(tournamentId);
        }}
      >
        More Details
      </Button>
    </Box>
  );
}

export default TournamentCard;
