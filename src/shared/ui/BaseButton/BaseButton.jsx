import { NavLink } from 'react-router';
import { Button } from '@mui/material';

function BaseButton({ text, address }) {
  return (
    <NavLink to={address}>
      <Button
        variant="contained"
        sx={{
          textTransform: 'none',
          fontSize: '1.2em',
          '&:hover': { color: 'secondary.contrastText' },
        }}
      >
        {text}
      </Button>
    </NavLink>
  );
}

export default BaseButton;
