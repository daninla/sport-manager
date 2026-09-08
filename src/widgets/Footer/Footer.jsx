import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import TelegramIcon from '@mui/icons-material/Telegram';
import {
  Box,
  Container,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#06101e',
        color: '#8892b0',
        mt: 10,
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        pt: 4,
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={2}
        >
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 0.5 }}
            >
              <SportsTennisIcon sx={{ color: '#00e676', fontSize: 24 }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: '#fff',
                  letterSpacing: '0.5px',
                  fontSize: '1.1rem',
                }}
              >
                SPORT MANAGER
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              sx={{ color: '#8892b0', fontSize: '0.85rem' }}
            >
              Platform for organizing, managing, and running sports tournaments.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            {[
              { icon: <TelegramIcon fontSize="small" />, href: '#' },
              { icon: <GitHubIcon fontSize="small" />, href: '#' },
              { icon: <InstagramIcon fontSize="small" />, href: '#' },
            ].map((social, index) => (
              <IconButton
                key={index}
                href={social.href}
                size="small"
                sx={{
                  color: '#8892b0',
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.2s',
                  '&:hover': {
                    color: '#fff',
                    bgcolor: '#00e676',
                  },
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Stack>
        </Stack>

        <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.08)' }} />
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Typography
            variant="caption"
            sx={{ color: '#64748b', fontSize: '0.75rem' }}
          >
            © {new Date().getFullYear()} Tournament Platform. All rights
            reserved.
          </Typography>

          <Stack direction="row" spacing={2.5}>
            <Link
              href="#"
              underline="none"
              sx={{
                color: '#64748b',
                fontSize: '0.75rem',
                '&:hover': { color: '#8892b0' },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              underline="none"
              sx={{
                color: '#64748b',
                fontSize: '0.75rem',
                '&:hover': { color: '#8892b0' },
              }}
            >
              Terms of Service
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
