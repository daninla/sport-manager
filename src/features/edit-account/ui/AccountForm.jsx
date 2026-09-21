import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useAccountForm from '../model/useAccountForm';
import { Formik, Form } from 'formik';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';

const disabledStyleInput = () => {
  return {
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#eeeded',
      color: '#3a3f46',
      '& fieldset': {
        borderColor: '#c9d1dc',
        borderWidth: '1.5px',
      },
      '&:hover fieldset': {
        borderColor: '#c9d1dc',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#58657a',
    },
  };
};

function AccountForm() {
  const { t } = useTranslation('account');
  const fileInputRef = useRef(null);
  const { initialValues, photoPreview, handleSubmit, handlePhotoChange } = useAccountForm();

  const renderForm = ({
    values,
    setFieldValue,
    handleChange,
    handleBlur,
    dirty,
  }) => {
    return (
      <Form>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
          <Box>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={(event) => handlePhotoChange(event, setFieldValue)}
            />
            <Box
              onClick={() => fileInputRef.current?.click()}
              sx={{
                width: 200,
                height: 260,
                borderRadius: '12px',
                overflow: 'hidden',
                border: '2px solid #081627',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f2f2f2',
                cursor: 'pointer',
                boxShadow: '0 10px 25px rgba(8, 22, 39, 0.08)',
              }}
            >
              {photoPreview || values.photo ? (
                <Box
                  component="img"
                  src={photoPreview || `/images/${values.photo}`}
                  alt="User photo"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <Typography variant="caption" sx={{ textAlign: 'center' }}>
                  {t('uploadPhoto')}
                </Typography>
              )}
            </Box>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Stack spacing={2.5}>
              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  label={t('fullName')}
                  variant="outlined"
                  name="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextField
                  fullWidth
                  label={t('email')}
                  variant="outlined"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  label={t('age')}
                  variant="outlined"
                  type="number"
                  name="age"
                  value={values.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormControl fullWidth>
                  <InputLabel>{t('sex')}</InputLabel>
                  <Select
                    value={values.sex}
                    label="Sex"
                    name="sex"
                    onChange={handleChange}
                  >
                    <MenuItem value="none">{t('sexNone')}</MenuItem>
                    <MenuItem value="male">{t('sexMale')}</MenuItem>
                    <MenuItem value="female">{t('sexFemale')}</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              <TextField
                fullWidth
                label={t('city')}
                variant="outlined"
                name="city"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  label={t('club')}
                  variant="outlined"
                  name="club"
                  value={values.club}
                  slotProps={{
                    htmlInput: { readOnly: true },
                  }}
                  sx={disabledStyleInput}
                />
                <TextField
                  fullWidth
                  label={t('status')}
                  variant="outlined"
                  name="status"
                  value={values.status}
                  slotProps={{
                    htmlInput: { readOnly: true },
                  }}
                  sx={disabledStyleInput}
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  label={t('ukraineRate')}
                  variant="outlined"
                  type="number"
                  name="ukrRate"
                  value={values.ukrRate}
                  slotProps={{
                    htmlInput: { readOnly: true },
                  }}
                  sx={disabledStyleInput}
                />
                <TextField
                  fullWidth
                  label="World rate"
                  variant="outlined"
                  type="number"
                  name="worldRate"
                  value={values.worldRate}
                  slotProps={{
                    htmlInput: { readOnly: true },
                  }}
                  sx={disabledStyleInput}
                />
              </Stack>

              <TextField
                fullWidth
                label={t('notes')}
                variant="outlined"
                name="notes"
                value={values.notes}
                onChange={handleChange}
                onBlur={handleBlur}
                multiline
                minRows={3}
              />
            </Stack>
          </Box>
        </Box>
        <Stack direction="row" spacing={3} sx={{ mt: 3, marginInline: 'auto' }}>
          <Button variant="outlined" type="button" color="secondary">
            {t('forgotPass')}
          </Button>
          <Button
            variant="contained"
            type="submit"
            color="secondary"
            disabled={!dirty}
          >
            {t('acceptChange')}
          </Button>
        </Stack>
      </Form>
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {renderForm}
    </Formik>
  );
}

export default AccountForm;
