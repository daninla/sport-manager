import {
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

export const GroupCard = ({ title, players = [] }) => {
  return (
    <Card variant="outlined" sx={{ minWidth: 260, borderRadius: 2 }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: 600, mb: 1 }}
        >
          {title}
        </Typography>

        <Divider />

        <List dense disablePadding sx={{ mt: 1 }}>
          {players.length > 0 ? (
            players.map((player, index) => (
              <ListItem key={player.id} disableGutters sx={{ py: 0.5 }}>
                <ListItemText
                  primary={
                    <Box component="span" sx={{ display: 'flex', gap: 1 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ minWidth: 20 }}
                      >
                        {index + 1}.
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {player.fullName}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
              Нет участников
            </Typography>
          )}
        </List>
      </CardContent>
    </Card>
  );
};
