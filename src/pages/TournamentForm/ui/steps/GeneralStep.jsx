import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function GeneralStep({
  t,
  dayjs,
  clubs,
  values,
  handleChange,
  handleBlur,
  setFieldValue,
}) {
  return (
    <>
      <TextField
        fullWidth
        label={t('name')}
        variant="outlined"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
          <DatePicker
            label={t('date')}
            format="DD.MM.YYYY"
            value={values.date ? dayjs(values.date) : null}
            onChange={(newValue) =>
              setFieldValue(
                'date',
                newValue?.isValid() ? newValue.format('YYYY-MM-DD') : '',
              )
            }
            slotProps={{ textField: { fullWidth: true } }}
          />
          <TimePicker
            label={t('timeStart')}
            format="HH:mm"
            value={
              values.timeStart ? dayjs(`2000-01-01T${values.timeStart}`) : null
            }
            onChange={(newValue) =>
              setFieldValue(
                'timeStart',
                newValue?.isValid() ? newValue.format('HH:mm') : '',
              )
            }
            slotProps={{ textField: { fullWidth: true } }}
          />
        </Stack>
      </LocalizationProvider>

      <FormControl fullWidth>
        <InputLabel>{t('club')}</InputLabel>
        <Select
          name="clubId"
          value={values.clubId}
          onChange={(event) => {
            const selectedClub = clubs.find(
              (club) => club.id === event.target.value,
            );

            setFieldValue('clubId', event.target.value);
            setFieldValue('location', selectedClub?.address ?? '');
          }}
        >
          <MenuItem value="" disabled>
            Select club
          </MenuItem>
          {clubs.map((club) => (
            <MenuItem key={club.id} value={club.id}>
              {club.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label={t('location')}
        variant="outlined"
        name="location"
        value={values.location}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </>
  );
}

export default GeneralStep;
