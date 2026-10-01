import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button } from '@mui/material';

function ClubLayout() {
  const { t } = useTranslation('clubs');
  const navigate = useNavigate();
  return (
    <Box sx={{ p: '1em 2em' }}>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          textTransform: 'none',
          fontSize: '1.2em',
          mb: '30px',
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
