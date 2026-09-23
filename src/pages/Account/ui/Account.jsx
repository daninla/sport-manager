import { useTranslation } from 'react-i18next';
import { AccountForm } from '@/features/edit-account';
import { Box, Typography } from '@mui/material';

function Account() {
  const { t } = useTranslation('account');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Box
        sx={{
          border: '3px solid #081627',
          borderRadius: '10px',
          padding: '30px',
          minWidth: '100px',
          maxWidth: '800px',
          width: '100%',
        }}
      >
        <Typography variant="h4" align="center" sx={{ mb: '30px' }}>
          {t('yourAccount')}
        </Typography>
        <AccountForm />
      </Box>
    </Box>
  );
}

export default Account;
