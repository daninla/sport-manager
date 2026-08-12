import { NavLink, useMatch, useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { globalMenu } from '../config/globalMenu';
import { getTournamentMenu } from '../config/tournamentMenu';

function Sidebar() {
  const isTournamentContext = useMatch('/tournaments/:tournamentId/*');
  const { id } = useParams();

  const items = isTournamentContext ? getTournamentMenu(id) : globalMenu;

  return (
    <Box
      sx={{
        color: 'white',
        backgroundColor: 'primary.main',
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
              borderBottom: '1px solid #be6767',
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': { color: '#c27f2e' },
              '&.active': { color: '#c27f2e' },
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
