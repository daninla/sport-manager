import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

function PersonalData({
  values,
  handleChange,
  handleBlur,
  setFieldValue,
  errors,
  touched,
  setFieldTouched,
  t,
}) {
  return (
    <Stack gap={2}>
      <TextField
        label={t('email')}
        type="email"
        value={values?.user_email}
        onChange={handleChange}
        onBlur={handleBlur}
        name="user_email"
        error={touched.user_email && Boolean(errors.user_email)}
        helperText={touched.user_email && errors.user_email}
      />
      <TextField
        label={t('city')}
        value={values?.city}
        onChange={handleChange}
        onBlur={handleBlur}
        name="city"
        error={touched.city && Boolean(errors.city)}
        helperText={touched.city && errors.city}
      />
      <Stack direction="row" gap={2} sx={{ '& > *': { width: '100%' } }}>
        <FormControl error={touched.sex && Boolean(errors.sex)}>
          <InputLabel>{t('sex')}</InputLabel>
          <Select
            label={t('sex')}
            value={values?.sex}
            onChange={handleChange}
            onBlur={handleBlur}
            name="sex"
          >
            <MenuItem value={'male'}>{t('male')}</MenuItem>
            <MenuItem value={'female'}>{t('female')}</MenuItem>
          </Select>
          {touched.sex && errors.sex && (
            <FormHelperText>{errors.sex}</FormHelperText>
          )}
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={t('birthDate')}
            format="DD.MM.YYYY"
            value={values?.birth_date ? dayjs(values.birth_date) : null}
            onChange={(newValue) => {
              setFieldValue(
                'birth_date',
                newValue?.isValid() ? newValue.format('YYYY-MM-DD') : null,
              );
              setFieldTouched('birth_date', true, true);
            }}
            slotProps={{
              textField: {
                onBlur: () => setFieldTouched('birth_date', true),
                error: touched.birth_date && Boolean(errors.birth_date),
                helperText: touched.birth_date && errors.birth_date,
                name: 'birth_date',
              },
            }}
          />
        </LocalizationProvider>
      </Stack>
    </Stack>
  );
}

export default PersonalData;
