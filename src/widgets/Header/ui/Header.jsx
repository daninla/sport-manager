import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router';
import {
  AccountCircle,
  Mail as MailIcon,
  MoreVert as MoreIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';

import SwitchLng from '../../../features/switch-lng/ui/SwitchLng';

function Header() {
  const navigate = useNavigate();
  const { t } = useTranslation('header');
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    const loadUser = () => {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        setUser(JSON.parse(currentUser));
      } else {
        setUser(null);
      }
    };
    loadUser();
  }, []);

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

          {user ? (
            <>
              {/* Desktop actions */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '10px' }}>
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

                <Button
                  sx={{
                    width: '40px',
                    height: '40px',
                    minWidth: 0,
                    padding: 0,
                    borderRadius: '50%',
                    overflow: 'hidden',
                  }}
                  onClick={() => navigate("/account")}
                >
                  <Box
                    component="img"
                    sx={{
                      width: '100%',
                      height: '100%',
                    }}
                    src={user.photo}
                    alt={user.fullName}
                  />
                </Button>

                <IconButton color="inherit" onClick={handleLogOut}>
                  <LogoutIcon />
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

              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <MailIcon sx={{ mr: 1 }} />
                  {t('messages')}
                </MenuItem>

                <MenuItem onClick={handleMenuClose}>
                  <NotificationsIcon sx={{ mr: 1 }} />
                  {t('notifications')}
                </MenuItem>

                <MenuItem onClick={handleMenuClose}>
                  <AccountCircle sx={{ mr: 1 }} />
                  {t('profile')}
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="contained"
              sx={{
                bgcolor: '#00e676',
                color: '#040b22',
                fontWeight: 'bold',
                borderRadius: '8px',
                '&:hover': { bgcolor: '#00c853' },
              }}
              onClick={() => navigate('/signin')}
            >
              {t('signIn')}
            </Button>
          )}
          <SwitchLng />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
