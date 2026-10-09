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

export const GroupCard = ({
  title,
  players = [],
  onDoubleClick,
  disabled = false,
  isEditing = false,
}) => {
  return (
    <Card
      variant="outlined"
      onDoubleClick={disabled ? undefined : onDoubleClick}
      aria-disabled={disabled}
      sx={{
        minWidth: 230,
        borderRadius: 2,
        border: isEditing ? '2px solid' : '1px solid #a7a4a4',
        borderColor: isEditing ? 'primary.main' : undefined,
        opacity: disabled && !isEditing ? 0.55 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        cursor: disabled ? 'default' : 'pointer',
      }}
    >
      <CardContent sx={{ '&:last-child': { pb: 2 } }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 600,
            mb: 1,
            borderBottom: '1px solid #a7a4a4',
            pb: 1,
            backgroundColor: '#5e81c2',
            textAlign: 'center',
          }}
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
