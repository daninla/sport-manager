import { Box } from '@mui/material';
import { ClockLoader } from 'react-spinners';

export function Spinner() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <ClockLoader size={130} color="#35ad55" />
    </Box>
  );
}
