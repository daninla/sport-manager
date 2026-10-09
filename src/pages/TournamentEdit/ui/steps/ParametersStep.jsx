import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';

function ParametersStep({
  t,
  competitionTypes,
  tournamentFormats,
  bestOf,
  isRating,
  values,
  handleChange,
  handleBlur,
}) {
  return (
    <>
      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
        <FormControl fullWidth>
          <InputLabel id="competition-type-label">
            {t('competitionType')}
          </InputLabel>
          <Select
            id="competition-type"
            labelId="competition-type-label"
            label={t('competitionType')}
            name="tournamentType"
            value={values.tournamentType}
            onChange={handleChange}
          >
            {competitionTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="format-label">{t('format')}</InputLabel>
          <Select
            id="format"
            labelId="format-label"
            label={t('format')}
            name="format"
            value={values.format}
            onChange={handleChange}
          >
            {tournamentFormats.map((format) => (
              <MenuItem key={format.value} value={format.value}>
                {format.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
        <FormControl fullWidth>
          <InputLabel id="bestOf-label">{t('bestOfLabel')}</InputLabel>
          <Select
            id="bestOf"
            labelId="bestOf-label"
            label={t('bestOfLabel')}
            name="bestOf"
            value={values.bestOf}
            onChange={handleChange}
          >
            {bestOf.map((format) => (
              <MenuItem key={format.value} value={format.value}>
                {format.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          type="number"
          label={t('maxParticipants')}
          variant="outlined"
          name="maxParticipants"
          value={values.maxParticipants}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Stack>

      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
        <FormControl sx={{ width: `${values.isRated ? '100%' : '234px'}` }}>
          <InputLabel id="is-rated-label">{t('typeTournament')}</InputLabel>
          <Select
            id="is-rated"
            labelId="is-rated-label"
            label={t('typeTournament')}
            name="isRated"
            value={values.isRated}
            onChange={handleChange}
          >
            {isRating.map((format) => (
              <MenuItem key={format.value} value={format.value}>
                {format.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {values.isRated && (
          <TextField
            fullWidth
            type="number"
            label={t('ratingCoefficient')}
            variant="outlined"
            name="ratingCoefficient"
            value={values.ratingCoefficient}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        )}
      </Stack>
    </>
  );
}

export default ParametersStep;
