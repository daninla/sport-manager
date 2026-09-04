import { NavLink } from 'react-router';
import { Button } from '@mui/material';

import styles from './baseButton.module.css';

function BaseButton({ text, address }) {
  return (
    <div className={styles.link}>
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
    </div>
  );
}

export default BaseButton;
