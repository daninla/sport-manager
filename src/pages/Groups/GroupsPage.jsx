import { useParams } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';

import { useGetTournamentPlayersQuery } from '@/entities/tournament/api/tournamentApi';

import { GroupCard } from '@/entities/group/ui/GroupCard';

const GroupsPage = () => {
  // 1. Достаем ID турнира из URL (/tournaments/:id/groups)
  const { id: tournamentId } = useParams();

  // 2. Запрашиваем участников этого турнира
  const {
    data: tournamentPlayers = [],
    isLoading,
    isError,
  } = useGetTournamentPlayersQuery(tournamentId);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography color="error">
          Ошибка при загрузке участников турнира #{tournamentId}
        </Typography>
      </Container>
    );
  }

  // 3. Тестовая временная группа для проверки UI карточки (первые 3 игрока)
  const testGroupPlayers = tournamentPlayers.slice(0, 3);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
        Группы турнира #{tournamentId}
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Всего участников в турнире: {tournamentPlayers.length}
      </Typography>

      <Grid container spacing={3}>
        {/* Карточка 1: Проверка рендера карточки группы с игроками */}
        <Grid item xs={12} sm={6} md={4}>
          <GroupCard title="Группа A (Тест)" players={testGroupPlayers} />
        </Grid>

        {/* Карточка 2: Проверка рендера пустой карточки */}
        <Grid item xs={12} sm={6} md={4}>
          <GroupCard title="Группа B (Пустая)" players={[]} />
        </Grid>

        {/* Список всех участников турнира для контроля */}
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 3, mt: 2, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Список всех доступных игроков турнира:
            </Typography>

            {tournamentPlayers.length > 0 ? (
              <Box component="ol" sx={{ pl: 2, margin: 0 }}>
                {tournamentPlayers.map((player) => (
                  <Box component="li" key={player.id} sx={{ py: 0.5 }}>
                    <Typography variant="body2">
                      <strong>ID: {player.id}</strong> — {player.fullName}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography color="text.secondary">
                В этом турнире пока нет зарегистрированных участников (массив
                playerIds пуст).
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default GroupsPage;
