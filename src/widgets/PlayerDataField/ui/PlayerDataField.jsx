import { Stack, TextField, Typography } from '@mui/material';
import { useField } from 'formik';

function PlayerDataField({ labelText, inputId, inputType }) {
  const [field] = useField(inputId);

  return (
    <Stack direction="row" gap={1} sx={{ alignItems: 'center' }}>
      {labelText && (
        <label htmlFor={inputId}>
          <Typography variant="h5" sx={{ textWrap: 'nowrap' }}>
            {labelText}:
          </Typography>
        </label>
      )}
      <TextField
        type={inputType}
        variant="standard"
        id={inputId}
        {...field}
        fullWidth
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
