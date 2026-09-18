import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import HeroSection from './HeroSection';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Box, Grid, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import NewsCards from '../../../widgets/NewsCards/ui/NewsCards';
import StatsList from '../../../widgets/StatsList/ui/StatsList';

export function DashboardPage() {
  const id = uuidv4();
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
        <HeroSection t={t} navigate={navigate} features={FEATURES} />

        {/* Карточки статистики */}
        <Box>
          <Grid container spacing={2} sx={{ mt: 4 }}>
            {STATS.map((stat, idx) => (
              <StatsList key={idx} idx={idx} stat={stat} />
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
            <NewsCards key={id} item={item} />
          ))}
        </Box>
      </Grid>
    </Box>
  );
}

export default DashboardPage;
