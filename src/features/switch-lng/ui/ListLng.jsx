import { useTranslation } from 'react-i18next';
import { Menu, MenuItem } from '@mui/material';

const lng = ['ua', 'en'];

function ListLng({ anchorEl, isOpen, onClose }) {
  const { i18n } = useTranslation();

  const handleSelect = (l) => {
    i18n.changeLanguage(l);
    onClose();
  };

  return (
    <Menu anchorEl={anchorEl} open={isOpen} onClose={onClose}>
      {lng
        .filter((l) => l !== i18n.language)
        .map((l) => (
          <MenuItem key={l} onClick={() => handleSelect(l)}>
            {l}
          </MenuItem>
        ))}
    </Menu>
  );
}

export default ListLng;
