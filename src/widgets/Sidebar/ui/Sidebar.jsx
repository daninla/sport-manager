import { NavLink, useMatch, useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { globalMenu } from '../config/globalMenu';
import { getTournamentMenu } from '../config/tournamentMenu';

function Sidebar() {
  const tournamentMatch = useMatch({ path: '/tournaments/:id/*', end: false });
  const { id } = useParams();
  const isTournamentContext = Boolean(tournamentMatch && id);

  const items = isTournamentContext ? getTournamentMenu(id) : globalMenu;

  return (
    <Box
      sx={{
        color: 'white',
        backgroundColor: 'secondary.main',
        height: '100%',
        width: '100%',
      }}
    >
      <Box
        sx={{ width: '100%', py: 5, display: 'flex', flexDirection: 'column' }}
      >
        {items.map((item) => (
          <Box
            key={item.path}
            component={NavLink}
            to={item.path}
            sx={{
              mb: 2,
              ml: 10,
              pt: 1,
              pb: 1,
              fontWeight: 'bold',
              fontSize: 18,
              borderBottom: '1px solid #1b5c2c',
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': { color: 'secondary.contrastText' },
              '&.active': { color: 'secondary.contrastText' },
            }}
          >
            {item.label}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Sidebar;
