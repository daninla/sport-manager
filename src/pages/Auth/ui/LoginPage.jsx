import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';

import { LoginForm } from '@/features/auth';

function Login() {
  const { t } = useTranslation('auth');
  return (
    <Box
      sx={{
        maxWidth: '450px',
        width: '100%',
      }}
    >
      <Typography variant="h4" align="center" sx={{ mb: '30px' }}>
        {t('signInTitle')}
      </Typography>
      <LoginForm />
    </Box>
  );
}

export default Login;
