import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Typography } from '@mui/material';

function FeatureList({ idx, feature }) {
  return (
    <div>
      <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <CheckCircleOutlineIcon sx={{ color: '#00e676', fontSize: 20 }} />
        <Typography sx={{ color: '#e2e8f0', fontSize: '0.95rem' }}>
          {feature}
        </Typography>
      </Box>
    </div>
  );
}

export default FeatureList;
