import { Stack, TextField, Typography } from '@mui/material';
import { useField } from 'formik';

function PlayerDataField({ textVariant, labelText, inputId }) {
  const [field] = useField(inputId);

  return (
    <Stack direction="row" gap={1} sx={{ alignItems: 'center' }}>
      {labelText && (
        <label htmlFor={inputId}>
          <Typography variant={textVariant}>{labelText}:</Typography>
        </label>
      )}
      <TextField
        variant="standard"
        id={inputId}
        {...field}
        sx={{
          minWidth: '20 em',
          '& .MuiInputBase-input': {
            fontSize: '1.3em',
          },
        }}
      />
    </Stack>
  );
}

export default PlayerDataField;
