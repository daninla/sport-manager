import { useTranslation } from 'react-i18next';
import { ClubFormAdd } from '@/features/add-club';
import { Typography } from '@mui/material';

function ClubAddPage() {
  const { t } = useTranslation('clubs');
  return (
    <>
      <Typography
        variant="h4"
        sx={{ mb: '10px', textAlign: { sm: 'center', xl: 'start' } }}
      >
        {t('addClub')}
      </Typography>
      <ClubFormAdd t={t} />
    </>
  );
}

export default ClubAddPage;
