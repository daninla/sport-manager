import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import GroupIcon from '@mui/icons-material/Group';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';

import { useDeleteClubMutation } from '@/entities/club';

function ClubCard({ id, logo, title, address, description, amountMembers }) {
  const { t } = useTranslation('clubs');
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteClub, { isLoading: isDeleting }] = useDeleteClubMutation();
  const isMenuOpen = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    event.preventDefault();
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
    navigate(`/club/edit/${id}`);
  };

  const handleDeleteClick = async (event) => {
    event.stopPropagation();
    handleCloseMenu();

    try {
      await deleteClub(id).unwrap();
    } catch (error) {
      throw new Error('Failed to delete club: ' + error.message);
    }
  };

  return (
    <NavLink
      to={`/club/${id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Card
        sx={{
          position: 'relative',
          height: '100%',
          width: '100%',
          borderRadius: 4,
          overflow: 'hidden',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          boxShadow: '0 16px 38px rgba(15, 23, 42, 0.08)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 22px 44px rgba(15, 23, 42, 0.12)',
          },
        }}
      >
        <IconButton
          onClick={handleOpenMenu}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 2,
            color: '#fff',
            backgroundColor: 'rgba(15, 23, 42, 0.42)',
            backdropFilter: 'blur(8px)',
            '&:hover': {
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
            },
          }}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleCloseMenu}
          onClick={(event) => event.stopPropagation()}
          PaperProps={{
            elevation: 8,
            sx: {
              bgcolor: '#0a192f',
              color: '#fff',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              minWidth: '150px',
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

          <MenuItem
            onClick={handleDeleteClick}
            disabled={isDeleting}
            sx={{ color: '#f87171' }}
          >
            <ListItemIcon
              sx={{ color: '#f87171', minWidth: '28px !important' }}
            >
              <DeleteOutlineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={isDeleting ? 'Deleting...' : 'Delete'} />
          </MenuItem>
        </Menu>

        <CardMedia
          component="img"
          image={`/images/club/${logo}`}
          alt={title}
          sx={{
            aspectRatio: '1 / 1',
            objectFit: 'cover',
            backgroundColor: '#e8edf7',
          }}
        />

        <CardContent
          sx={{
            p: 2.5,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.2,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: '#101828', lineHeight: 1.3 }}
          >
            {title}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: 'center', color: '#475467' }}
          >
            <LocationOnIcon sx={{ fontSize: 18, color: '#2563eb' }} />
            <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
              {address}
            </Typography>
          </Stack>

          <Typography
            variant="body2"
            sx={{
              color: '#475467',
              lineHeight: 1.6,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: 52,
            }}
          >
            {description}
          </Typography>

          <Box
            sx={{
              mt: 'auto',
              pt: 1.5,
              borderTop: '1px solid rgba(15, 23, 42, 0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: '#667085', fontWeight: 600 }}
            >
              {t('members')}
            </Typography>
            <Stack
              direction="row"
              spacing={0.6}
              sx={{ alignItems: 'center', color: '#1d4ed8' }}
            >
              <GroupIcon sx={{ fontSize: 18 }} />
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: '#1d4ed8' }}
              >
                {amountMembers}
              </Typography>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </NavLink>
  );
}

export default ClubCard;
