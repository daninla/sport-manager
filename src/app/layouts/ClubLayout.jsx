import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';

function ClubLayout() {
  const { t } = useTranslation('clubs');
  const navigate = useNavigate();
  return (
    <Box sx={{ p: '1em 2em' }}>
      <Button
        variant="contained"
        sx={{
          textTransform: 'none',
          fontSize: '1.2em',
          mb: '30px',
          '&:hover': { color: 'secondary.contrastText' },
        }}
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/clubs')}
      >
        {t('toClubs')}
      </Button>
      <Outlet />
    </Box>
  );
}

export default ClubLayout;
