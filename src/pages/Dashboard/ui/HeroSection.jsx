import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, Chip, Typography } from '@mui/material';

import FeatureList from '@/widgets/FeatureList/ui/FeatureList';

function HeroSection({ t, navigate, features }) {
  return (
    <Box
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #0a192f 0%, #040b22 100%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      }}
    >
      <Chip
        label={t('platform')}
        size="small"
        sx={{
          bgcolor: 'rgba(0, 230, 118, 0.1)',
          color: '#00e676',
          border: '1px solid rgba(0, 230, 118, 0.2)',
          mb: 2,
          fontWeight: 'bold',
        }}
      />
      <Typography variant="h3" sx={{ fontWeight: 700, color: '#fff', mb: 2 }}>
        {t('welcome')}
      </Typography>
      <Typography
        sx={{
          color: '#8892b0',
          fontSize: '1.05rem',
          lineHeight: 1.7,
          mb: 3,
        }}
      >
        {t('description')}
      </Typography>

      {/* Список преимуществ */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
        {features.map((feature, idx) => (
          <FeatureList key={idx} idx={idx} feature={feature} />
        ))}
      </Box>

      <Button
        variant="contained"
        endIcon={<ArrowForwardIcon />}
        onClick={() => navigate('/tournaments')}
        sx={{
          bgcolor: '#00e676',
          color: '#040b22',
          fontWeight: 'bold',
          px: 3.5,
          py: 1.4,
          borderRadius: '8px',
          '&:hover': { bgcolor: '#00c853' },
        }}
      >
        {t('explore')}
      </Button>
    </Box>
  );
}

export default HeroSection;
