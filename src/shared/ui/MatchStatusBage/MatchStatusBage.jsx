import { Box, Typography } from '@mui/material';

function MatchStatusBage({ status }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Ongoing':
        return '#ef4444';
      case 'Upcoming':
        return '#3b82f6';
      case 'Completed':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          px: '10px',
          py: '2px',
          backgroundColor: getStatusColor(status),
          borderRadius: '6px',
        }}
      >
        {status === 'Ongoing' && (
          <Box
            sx={{
              height: '6px',
              width: '6px',
              borderRadius: '50%',
              backgroundColor: 'white',
            }}
          />
        )}
        <Typography
          sx={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}
        >
          {status === 'Ongoing' ? 'LIVE' : status?.toUpperCase()}
        </Typography>
      </Box>
    </div>
  );
}

export default MatchStatusBage;
