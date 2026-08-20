import { NavLink } from 'react-router';
import { Button } from '@mui/material';

import styles from '../styles/addPlayerBtn.module.css';

function AddPlayerBtn() {
  return (
    <NavLink to="/players/add" className={styles.link}>
      <Button
        variant="contained"
        sx={{
          textTransform: 'none',
          fontSize: '1.2em',
          '&:hover': { color: '#c27f2e' },
        }}
      >
        Add player
      </Button>
    </NavLink>
  );
}

export default AddPlayerBtn;
