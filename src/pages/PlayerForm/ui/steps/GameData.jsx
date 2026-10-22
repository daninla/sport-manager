import { Stack, TextField } from '@mui/material';

function GameData({ values, handleChange, handleBlur, errors, touched, t }) {
  return (
    <Stack gap={2}>
      <TextField
        label={t('club')}
        name="club"
        value={values?.club ?? ''}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.club && Boolean(errors.club)}
        helperText={touched.club && errors.club}
      />
      <Stack direction="row" gap={2} sx={{ '&>*': { width: '100%' } }}>
        <TextField
          label={t('ukrRating')}
          name="ukr_rating"
          type="number"
          slotProps={{ htmlInput: { step: 0.1, min: 0, max: 100 } }}
          value={values?.ukr_rating ?? 0}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.ukr_rating && Boolean(errors.ukr_rating)}
          helperText={touched.ukr_rating && errors.ukr_rating}
        />
        <TextField
          label={t('rankCategory')}
          name="rank_category"
          value={values?.rank_category ?? ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.rank_category && Boolean(errors.rank_category)}
          helperText={touched.rank_category && errors.rank_category}
        />
      </Stack>

      <TextField
        label={t('notes')}
        name="notes"
        value={values?.notes ?? ''}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.notes && Boolean(errors.notes)}
        helperText={touched.notes && errors.notes}
      />
    </Stack>
  );
}

export default GameData;
