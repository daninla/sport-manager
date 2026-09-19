import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

function StatsList({ idx, stat }) {
  return (
    <div>
      <Grid item xs={6} sm={3} key={idx}>
        <Card
          sx={{
            bgcolor: '#040b22',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            p: 1.5,
          }}
        >
          <CardContent sx={{ p: '12px !important' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 1,
              }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: '8px',
                  bgcolor: `${stat.color}15`,
                }}
              >
                {stat.icon}
              </Box>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#fff' }}>
              {stat.value}
            </Typography>
            <Typography variant="caption" sx={{ color: '#8892b0' }}>
              {stat.title}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default StatsList;
