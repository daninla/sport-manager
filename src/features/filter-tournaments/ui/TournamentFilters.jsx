import { useTranslation } from 'react-i18next';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';

import { FORMATS, STATUSES } from '../model/constants';

export const TournamentFilters = ({ selectedFilters = [], onChange }) => {
  const { t } = useTranslation('tournamentFilters');

  const handleToggle = (value) => {
    const nextFilters = selectedFilters.includes(value)
      ? selectedFilters.filter((item) => item !== value)
      : [...selectedFilters, value];

    onChange(nextFilters);
  };

  return (
    <Box
      sx={{
        p: 2,
        border: '1px solid #ccc',
        borderRadius: 2,
        width: { xs: '100%', md: 250 },
        maxWidth: '100%',
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold">
        {t('status')}
      </Typography>
      {STATUSES.map((status) => (
        <FormControlLabel
          key={status}
          control={
            <Checkbox
              checked={selectedFilters.includes(status)}
              onChange={() => handleToggle(status)}
            />
          }
          label={t(`statuses.${status}`)}
        />
      ))}

      <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>
        {t('format')}
      </Typography>
      {FORMATS.map((format) => (
        <FormControlLabel
          key={format}
          control={
            <Checkbox
              checked={selectedFilters.includes(format)}
              onChange={() => handleToggle(format)}
            />
          }
          label={t(`formats.${format}`)}
        />
      ))}
    </Box>
  );
};
