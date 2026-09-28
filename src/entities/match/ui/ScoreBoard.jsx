import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

export function ScoreBoard({
  sets = { player1: 0, player2: 0 },
  currentSet = { player1: 0, player2: 0 },
  completedSets = [],
  player1Name = 'Игрок 1',
  player2Name = 'Игрок 2',
  status = 'Upcoming',
}) {
  const getStatusColor = () => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Finished':
        return 'default';
      default:
        return 'warning';
    }
  };

  return (
    <Card variant="outlined" sx={{ borderRadius: 3, boxShadow: 2 }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        {/* Шапка с именами и статусом */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1.5}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            {player1Name}
          </Typography>
          <Chip label={status} color={getStatusColor()} size="small" />
          <Typography variant="subtitle1" fontWeight="bold">
            {player2Name}
          </Typography>
        </Box>

        <Divider sx={{ my: 1.5 }} />

        {/* Общий счёт по сетам */}
        <Box textAlign="center" mb={2}>
          <Typography
            variant="caption"
            color="text.secondary"
            textTransform="uppercase"
            letterSpacing={1}
          >
            Счёт по сетам
          </Typography>
          <Typography variant="h4" fontWeight="800" color="text.primary">
            {sets.player1} : {sets.player2}
          </Typography>
        </Box>

        {/* История предыдущих сетов */}
        {completedSets.length > 0 && (
          <Box mb={2}>
            <Typography
              variant="caption"
              color="text.secondary"
              textTransform="uppercase"
              letterSpacing={1}
              display="block"
              textAlign="center"
              mb={0.5}
            >
              Завершённые сеты
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              flexWrap="wrap"
              gap={1}
            >
              {completedSets.map((set, index) => (
                <Paper
                  key={index}
                  variant="outlined"
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    bgcolor: 'grey.50',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight="medium"
                  >
                    Сет {index + 1}:
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {set.player1}:{set.player2}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </Box>
        )}

        {/* Счёт текущего сета */}
        <Box
          sx={{
            bgcolor: 'action.hover',
            borderRadius: 2,
            p: 1.5,
            textAlign: 'center',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            textTransform="uppercase"
            letterSpacing={1}
          >
            Текущий сет
          </Typography>
          <Typography variant="h2" fontWeight="bold" color="primary.main">
            {currentSet.player1} : {currentSet.player2}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
