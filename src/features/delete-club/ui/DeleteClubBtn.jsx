import toast from 'react-hot-toast';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';

import { useDeleteClubMutation } from '@/entities/club/api/clubApi';
import {
  useLazyGetUsersByClubQuery,
  useUpdateUserMutation,
} from '@/entities/user/api/userApi';

function DeleteClubBtn({ t, id, title, handleCloseMenu }) {
  const [deleteClub, { isLoading: isDeleting }] = useDeleteClubMutation();
  const [updateUser] = useUpdateUserMutation();
  const [getUsersByClub] = useLazyGetUsersByClubQuery();

  const handleDeleteClick = async (event) => {
    event.stopPropagation();

    const players = await getUsersByClub(title).unwrap();

    if (players.length > 0) {
      await Promise.all(
        players.map((player) =>
          updateUser({ ...player, club: 'None' }).unwrap(),
        ),
      );
    }

    handleCloseMenu();

    const deletePromise = async () => {
      const deletedClub = await deleteClub(id).unwrap();
      return deletedClub;
    };

    return toast.promise(deletePromise, {
      loading: t('deleteLoading'),
      success: t('deleteSuccess'),
      error: (err) => `${t('error')}: ${err?.data?.message || err?.message}`,
    });
  };
  return (
    <MenuItem
      onClick={handleDeleteClick}
      disabled={isDeleting}
      sx={{ color: '#f87171' }}
    >
      <ListItemIcon sx={{ color: '#f87171', minWidth: '28px !important' }}>
        <DeleteOutlineIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={t('deleteItem')} />
    </MenuItem>
  );
}

export default DeleteClubBtn;
