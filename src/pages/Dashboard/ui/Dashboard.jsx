import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from '@mui/material';

export function DashboardPage() {
  const navigate = useNavigate();
  const { t } = useTranslation('dashboard');
  const STATS = [
    {
      title: t('stats.activeTournaments'),
      value: '12',
      icon: <EmojiEventsIcon sx={{ fontSize: 28, color: '#3b82f6' }} />,
      color: '#3b82f6',
    },
    {
      title: t('stats.totalPlayers'),
      value: '1,248',
      icon: <GroupsIcon sx={{ fontSize: 28, color: '#00e676' }} />,
      color: '#00e676',
    },
    {
      title: t('stats.matchesPlayed'),
      value: '3,840',
      icon: <SportsTennisIcon sx={{ fontSize: 28, color: '#f59e0b' }} />,
      color: '#f59e0b',
    },
    {
      title: t('stats.prizePool'),
      value: '$15,000',
      icon: <WorkspacePremiumIcon sx={{ fontSize: 28, color: '#ec4899' }} />,
      color: '#ec4899',
    },
  ];

  const TENNIS_NEWS = [
    {
      id: 1,
      title: t('news.1.title'),
      date: t('news.1.date'),
      category: t('news.1.category'),
      image:
        'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=800&q=80',
      description: t('news.1.description'),
    },
    {
      id: 2,
      title: t('news.2.title'),
      date: t('news.2.date'),
      category: t('news.2.category'),
      image:
        'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=800&q=80',
      description: t('news.2.description'),
    },
    {
      id: 3,
      title: t('news.3.title'),
      date: t('news.3.date'),
      category: t('news.3.category'),
      image:
        'https://5element.ua/i/news/2005/543658423_18422785360097271_5568642252603573490_n__large.jpg',
      description: t('news.3.description'),
    },
    {
      id: 4,
      title: t('news.4.title'),
      date: t('news.4.date'),
      category: t('news.4.category'),
      image:
        'https://www.socium-a.ru/public/article/images/1c68e0819a44923c9d763372b208ccb0630a6649.jpg',
      description: t('news.4.description'),
    },
  ];

  const FEATURES = [
    t('features.automaticBrackets'),
    t('features.liveScores'),
    t('features.playerStats'),
    t('features.filterSystem'),
  ];

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: '1440px',
        margin: '0 auto',
      }}
    >
      <Grid container>
        {/* Главный инфо-блок */}
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
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, color: '#fff', mb: 2 }}
          >
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
          <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}
          >
            {FEATURES.map((feature, idx) => (
              <Box
                key={idx}
                sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}
              >
                <CheckCircleOutlineIcon
                  sx={{ color: '#00e676', fontSize: 20 }}
                />
                <Typography sx={{ color: '#e2e8f0', fontSize: '0.95rem' }}>
                  {feature}
                </Typography>
              </Box>
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

        {/* Карточки статистики */}
        <Box>
          <Grid container spacing={2} sx={{ mt: 4 }}>
            {STATS.map((stat, idx) => (
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
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 700, color: '#fff' }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#8892b0' }}>
                      {stat.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>

      {/* ================= Новости ================= */}
      <Grid item xs={12} lg={5}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 2.5,
            mt: 10,
          }}
        >
          <NewReleasesIcon sx={{ color: '#60a5fa' }} />
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#1b1919' }}>
            {t('newsTitle')}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {TENNIS_NEWS.map((item) => (
            <Card
              key={item.id}
              sx={{
                bgcolor: '#040b22',
                width: '400px',
                overflow: 'hidden',
                height: '500px',
              }}
            >
              {/* Увеличенное изображение */}
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
          ))}
        </Box>
      </Grid>
    </Box>
  );
}

export default DashboardPage;
