import { NavLink } from 'react-router';
import { Button } from '@mui/material';

import styles from './baseButton.module.css';

function BaseButton({ text, address, type, color }) {
  let hoverColor;
  switch (color) {
    case 'error':
      hoverColor = 'rgb(150, 0, 0)';
      break;
    default:
      hoverColor = 'secondary.contrastText';
  }

  return (
    <div className={styles.link}>
      <NavLink to={address}>
        <Button
          type={type}
          variant="contained"
          sx={{
            textTransform: 'none',
            fontSize: '1.2em',
            '&:hover': { color: hoverColor },
          }}
          color={color}
        >
          {text}
        </Button>
      </NavLink>
    </div>
  );
}

export default BaseButton;
