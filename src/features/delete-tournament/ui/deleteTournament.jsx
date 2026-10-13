import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';

import { useDeleteTournamentMutation } from '@/entities/tournament';

export const DeleteTournamentButton = ({ tournamentId, onSuccess }) => {
  const { t } = useTranslation('tournaments');
  const [deleteTournament, { isLoading }] = useDeleteTournamentMutation();

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await deleteTournament(tournamentId).unwrap();
      if (onSuccess) onSuccess();
    } catch (err) {
      throw new Error('Failed to delete tournament: ' + err.message);
    }
  };

  return (
    <MenuItem
      onClick={handleDelete}
      disabled={isLoading}
      sx={{ color: '#f87171' }}
    >
      <ListItemIcon sx={{ color: '#f87171', minWidth: '28px !important' }}>
        <DeleteIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={isLoading ? t('deleting') : t('delete')} />
    </MenuItem>
  );
};
