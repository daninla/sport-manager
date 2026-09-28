import { Box, Stack, TextField, Typography } from '@mui/material';

function ClubFields({
  t,
  fileInputRef,
  photoPreview,
  values,
  setFieldValue,
  handleChange,
  handleBlur,
  handlePhotoChange,
}) {
  return (
    <Stack
      direction={{ lg: 'column', xl: 'row' }}
      spacing={{ lg: 2, xl: 10 }}
      sx={{ textAlign: { sm: 'center', xl: 'start' } }}
    >
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
            width: 300,
            height: 300,
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
          {photoPreview || values.logo ? (
            <Box
              component="img"
              src={photoPreview || `/images/club/${values.logo}`}
              alt="Club logo"
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

      <Stack spacing={2} sx={{ fontSize: '1.2rem', width: '100%' }}>
        <Stack spacing={2} direction="row">
          <TextField
            fullWidth
            label={t('title')}
            variant="outlined"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            fullWidth
            label={t('foundedYear')}
            variant="outlined"
            name="foundedYear"
            type="number"
            value={values.foundedYear}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Stack>

        <Stack spacing={2} direction="row">
          <TextField
            fullWidth
            label={t('email')}
            variant="outlined"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            fullWidth
            label={t('phone')}
            variant="outlined"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Stack>

        <TextField
          fullWidth
          label={t('address')}
          variant="outlined"
          name="address"
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <TextField
          fullWidth
          label={t('description')}
          variant="outlined"
          name="description"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          multiline
          minRows={2}
        />
      </Stack>
    </Stack>
  );
}

export default ClubFields;
