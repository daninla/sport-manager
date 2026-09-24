import { NavLink } from 'react-router';
import GroupIcon from '@mui/icons-material/Group';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';

function ClubCard({
  id,
  logo,
  title,
  address,
  description,
  members: { length: memebrsLength },
}) {
  return (
    <NavLink
      to={`/club/${id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Card
        sx={{
          height: '100%',
          width: '100%',
          borderRadius: 4,
          overflow: 'hidden',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          boxShadow: '0 16px 38px rgba(15, 23, 42, 0.08)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 22px 44px rgba(15, 23, 42, 0.12)',
          },
        }}
      >
        <CardMedia
          component="img"
          image={logo}
          alt={title}
          sx={{
            aspectRatio: '1 / 1',
            objectFit: 'cover',
            backgroundColor: '#e8edf7',
          }}
        />

        <CardContent
          sx={{
            p: 2.5,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.2,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: '#101828', lineHeight: 1.3 }}
          >
            {title}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: 'center', color: '#475467' }}
          >
            <LocationOnIcon sx={{ fontSize: 18, color: '#2563eb' }} />
            <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
              {address}
            </Typography>
          </Stack>

          <Typography
            variant="body2"
            sx={{
              color: '#475467',
              lineHeight: 1.6,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: 52,
            }}
          >
            {description}
          </Typography>

          <Box
            sx={{
              mt: 'auto',
              pt: 1.5,
              borderTop: '1px solid rgba(15, 23, 42, 0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: '#667085', fontWeight: 600 }}
            >
              Participants
            </Typography>
            <Stack
              direction="row"
              spacing={0.6}
              sx={{ alignItems: 'center', color: '#1d4ed8' }}
            >
              <GroupIcon sx={{ fontSize: 18 }} />
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: '#1d4ed8' }}
              >
                {memebrsLength}
              </Typography>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </NavLink>
  );
}

export default ClubCard;
