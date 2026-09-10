import { useState } from 'react';
import ButtonLng from './ButtonLng';
import ListLng from './ListLng';

function SwitchLng() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <ButtonLng onClick={handleOpen} isOpen={isOpen} />
      <ListLng anchorEl={anchorEl} isOpen={isOpen} onClose={handleClose} />
    </div>
  );
}

export default SwitchLng;