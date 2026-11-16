import { useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Alert,
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { useDeleteGroupMutation } from '@/entities/group';

export const GroupCard = ({
  id,
  tournamentId,
  title,
  players = [],
  onDoubleClick,
  disabled = false,
  isEditing = false,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteError, setDeleteError] = useState(false);
  const [deleteGroup, { isLoading: isDeleting }] = useDeleteGroupMutation();

  const handleOpenMenu = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (event) => {
    event?.stopPropagation();
    setAnchorEl(null);
  };

  const handleDelete = async (event) => {
    event.stopPropagation();
    try {
      await deleteGroup({ id, tournamentId }).unwrap();
      setDeleteError(false);
      setAnchorEl(null);
    } catch {
      setDeleteError(true);
    }
  };

  return (
    <Card
      variant="outlined"
      onDoubleClick={disabled ? undefined : onDoubleClick}
      aria-disabled={disabled}
      data-group-card
      sx={{
        minWidth: 230,
        borderRadius: 2,
        border: isEditing ? '2px solid' : '1px solid #a7a4a4',
        borderColor: isEditing ? 'primary.main' : undefined,
        opacity: disabled && !isEditing ? 0.55 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        cursor: disabled ? 'default' : 'pointer',
      }}
    >
      <CardContent sx={{ '&:last-child': { pb: 2 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1,
            borderBottom: '1px solid #a7a4a4',
            backgroundColor: '#5e81c2',
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ flex: 1, fontWeight: 600, py: 1, textAlign: 'center' }}
          >
            {title}
          </Typography>
          <IconButton
            aria-label={`Меню группы ${title}`}
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl)}
            onClick={handleOpenMenu}
            size="small"
            sx={{ color: 'inherit' }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            onClick={(event) => event.stopPropagation()}
          >
            <MenuItem onClick={handleDelete} disabled={isDeleting}>
              <ListItemIcon
                sx={{ color: '#f87171', minWidth: '28px !important' }}
              >
                <DeleteOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={isDeleting ? 'Удаление...' : 'Удалить'} />
            </MenuItem>
          </Menu>
        </Box>

        <Divider />

        {deleteError && (
          <Alert severity="error" sx={{ mb: 1 }}>
            Не удалось удалить группу. Попробуйте еще раз.
          </Alert>
        )}

        <List dense disablePadding sx={{ mt: 1 }}>
          {players.length > 0 ? (
            players.map((player, index) => (
              <ListItem key={player.id} disableGutters sx={{ py: 0.5 }}>
                <ListItemText
                  primary={
                    <Box component="span" sx={{ display: 'flex', gap: 1 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ minWidth: 20 }}
                      >
                        {index + 1}.
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {player.firstName} {player.lastName}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
              Нет участников
            </Typography>
          )}
        </List>
      </CardContent>
    </Card>
  );
};
