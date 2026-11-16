import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';

import { RegisterForm } from '@/features/auth';

function Register() {
  const { t } = useTranslation('auth');
  return (
    <Box
      sx={{
        maxWidth: '450px',
        width: '100%',
      }}
    >
      <Typography variant="h4" align="center" sx={{ mb: '30px' }}>
        {t('signUpTitle')}
      </Typography>
      <RegisterForm />
    </Box>
  );
}

export default Register;
