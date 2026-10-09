import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';

import { useGetGroupsByTournamentIdQuery } from '@/entities/group/api/groupsApi';
import { useGetTournamentPlayersQuery } from '@/entities/tournament/api/tournamentApi';
import { GroupCreationForm } from '@/features/draw';

import { GroupCard } from '@/entities/group/ui/GroupCard';

const GroupsPage = () => {
  const { id: tournamentId } = useParams();
  const [editingGroup, setEditingGroup] = useState(null);
  const {
    data: tournamentPlayers = [],
    isLoading,
    isError,
  } = useGetTournamentPlayersQuery(tournamentId);
  const {
    data: groups = [],
    isLoading: isGroupsLoading,
    isError: isGroupsError,
  } = useGetGroupsByTournamentIdQuery(tournamentId);
  
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

  return (
    <Container
      maxWidth="lg"
      onClick={(event) => {
        if (
          editingGroup &&
          !event.target.closest?.('[data-group-card], [data-group-editor]')
        ) {
          setEditingGroup(null);
        }
      }}
      sx={{ py: 4, width: { xs: '100%', md: '85%' }, ml: 0, mr: 'auto' }}
    >
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
        Группы турнира
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 4, display: 'flex', gap: 0.5 }}
      >
        Всего игроков в турнире #{tournamentId}:
        <Box component="span" sx={{ fontWeight: 600, color: 'primary.main' }}>
          {tournamentPlayers.length}
        </Box>
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          {isGroupsLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress />
            </Box>
          ) : isGroupsError ? (
            <Alert severity="error">Не удалось загрузить группы турнира.</Alert>
          ) : groups.length ? (
            <Grid container spacing={2}>
              {groups.map((group) => {
                // Карточке передаём объекты игроков, а в группе хранятся только их ID.
                const groupPlayerIds = new Set(
                  (group.playerIds || []).map(String),
                );
                const groupPlayers = tournamentPlayers.filter((player) =>
                  groupPlayerIds.has(String(player.id)),
                );
                return (
                  <Grid
                    key={group.id}
                    size={{ xs: 12, sm: 6, lg: 4 }}
                    data-group-card
                  >
                    <GroupCard
                      title={group.name}
                      players={groupPlayers}
                      onDoubleClick={() => setEditingGroup(group)}
                      disabled={Boolean(editingGroup)}
                      isEditing={String(editingGroup?.id) === String(group.id)}
                    />
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Typography color="text.secondary">
                Групп пока нет. Создайте первую с помощью формы.
              </Typography>
            </Paper>
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <GroupCreationForm
            key={editingGroup ? `edit-${editingGroup.id}` : 'create'}
            tournamentId={tournamentId}
            tournamentPlayers={tournamentPlayers}
            groups={groups}
            editingGroup={editingGroup}
            onCancelEdit={() => setEditingGroup(null)}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default GroupsPage;
