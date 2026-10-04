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
  gamesFormats,
  isRating,
  values,
  handleChange,
  handleBlur,
}) {
  return (
    <>
      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
        <FormControl fullWidth>
          <InputLabel>{t('competitionType')}</InputLabel>
          <Select
            name="tournamentType"
            value={values.tournamentType}
            onChange={handleChange}
          >
            <MenuItem value="" disabled>
              Select type
            </MenuItem>
            {competitionTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>{t('format')}</InputLabel>
          <Select name="format" value={values.format} onChange={handleChange}>
            <MenuItem value="" disabled>
              Select format
            </MenuItem>
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
          <InputLabel>{t('gamesToWin')}</InputLabel>
          <Select
            name="gamesToWin"
            value={values.gamesToWin}
            onChange={handleChange}
          >
            <MenuItem value="" disabled>
              Select game to win
            </MenuItem>
            {gamesFormats.map((format) => (
              <MenuItem key={format.value} value={format.value}>
                {format.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          type="number"
          label={t('playersLimit')}
          variant="outlined"
          name="playersLimit"
          value={values.playersLimit}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Stack>

      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
        <FormControl sx={{ width: `${values.isRated ? '100%' : '234px'}` }}>
          <InputLabel>{t('typeTournament')}</InputLabel>
          <Select name="isRated" value={values.isRated} onChange={handleChange}>
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
