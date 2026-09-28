import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { ClubFormEdit } from '../../../features/edit-club';
import { Box, Typography } from '@mui/material';

import { useGetClubByIdQuery } from '@/entities/club/api/clubApi';

function ClubForm() {
  const { id } = useParams();
  const { t } = useTranslation('clubs');
  const { data, isLoadingClub, errorClub } = useGetClubByIdQuery(id);

  if (isLoadingClub) return <Spinner />;
  if (errorClub || !data) {
    return <Box sx={{ p: 4 }}>{errorClub || 'No found this club'}</Box>;
  }

  return (
    <>
      <Typography
        variant="h4"
        sx={{ mb: '10px', textAlign: { sm: 'center', xl: 'start' } }}
      >
        {t('editClub')}
      </Typography>
      <ClubFormEdit id={id} t={t} club={data} />
    </>
  );
}

export default ClubForm;
