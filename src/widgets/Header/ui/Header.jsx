import { useState } from 'react';
import { NavLink } from 'react-router';
import {
  AccountCircle,
  Mail as MailIcon,
  MoreVert as MoreIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import {
  AppBar,
  Badge,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: (theme) =>
          `linear-gradient(90deg, ${theme.palette.primary.main} 20%, ${theme.palette.secondary.main} 90%)`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ px: { xs: 2, sm: 3 }, gap: 2 }}>
          {/* Logo */}
          <Box
            component={NavLink}
            to="/"
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              gap: 1,
              fontWeight: 'bold',
              textDecoration: 'none',
            }}
          >
            <Typography
              sx={{
                fontWeight: 'bold',
                color: 'white',
                fontSize: 20,
                textDecoration: 'none',
                '&:hover': { color: 'secondary.contrastText' },
              }}
            >
              SPORT MANAGER
            </Typography>
            <SportsTennisIcon sx={{ color: '#00e676', fontSize: 24 }} />
          </Box>
          {/* Search */}

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop actions */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>

            <IconButton color="inherit">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>

          {/* Mobile menu */}
          <IconButton
            color="inherit"
            sx={{ display: { xs: 'flex', md: 'none' } }}
            onClick={handleMenuOpen}
          >
            <MoreIcon />
          </IconButton>

          <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>
              <MailIcon sx={{ mr: 1 }} />
              Messages
            </MenuItem>

            <MenuItem onClick={handleMenuClose}>
              <NotificationsIcon sx={{ mr: 1 }} />
              Notifications
            </MenuItem>

            <MenuItem onClick={handleMenuClose}>
              <AccountCircle sx={{ mr: 1 }} />
              Profile
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
