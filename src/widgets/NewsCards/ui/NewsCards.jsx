import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material';

function NewsCards({ item }) {
  return (
    <div>
      <Card
        key={item.id}
        sx={{
          bgcolor: '#040b22',
          width: '400px',
          overflow: 'hidden',
          height: '500px',
        }}
      >
        <Box sx={{ overflow: 'hidden', height: '300px' }}>
          <CardMedia
            component="img"
            image={item.image}
            alt={item.title}
            className="news-img"
            sx={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease-in-out',
            }}
          />
        </Box>

        <CardContent sx={{ p: 2.5 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1.5,
            }}
          >
            <Chip
              label={item.category}
              size="small"
              sx={{
                bgcolor: 'rgba(96, 165, 250, 0.1)',
                color: '#60a5fa',
                fontSize: '0.75rem',
                fontWeight: '600',
              }}
            />
            <Typography variant="caption" sx={{ color: '#64748b' }}>
              {item.date}
            </Typography>
          </Box>

          <Typography
            variant="h6"
            sx={{
              color: '#fff',
              fontSize: '1.05rem',
              mb: 1,
              fontWeight: 600,
              lineHeight: 1.3,
            }}
          >
            {item.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: '#8892b0', lineHeight: 1.5 }}
          >
            {item.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default NewsCards;
