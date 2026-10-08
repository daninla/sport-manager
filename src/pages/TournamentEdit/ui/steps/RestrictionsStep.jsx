import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material';

function RestrictionsStep({
  t,
  ageCategories,
  values,
  handleChange,
  handleBlur,
}) {
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="age-category-label">{t('ageCategory')}</InputLabel>
        <Select
          id="age-category"
          labelId="age-category-label"
          label={t('ageCategory')}
          name="ageCategory"
          value={values.ageCategory}
          onChange={handleChange}
        >
          {ageCategories.map((age) => (
            <MenuItem key={age.value} value={age.value}>
              {age.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {values.isRated && (
        <TextField
          fullWidth
          type="number"
          label={t('ratingLimit')}
          variant="outlined"
          name="ratingLimit"
          value={values.ratingLimit}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      )}

      <FormControl>
        <FormLabel>{t('gender')}</FormLabel>
        <RadioGroup
          name="gender"
          value={values.gender}
          onChange={handleChange}
          row
        >
          <FormControlLabel value="all" control={<Radio />} label={t('all')} />
          <FormControlLabel value="men" control={<Radio />} label={t('men')} />
          <FormControlLabel
            value="women"
            control={<Radio />}
            label={t('women')}
          />
        </RadioGroup>
      </FormControl>
    </>
  );
}

export default RestrictionsStep;
