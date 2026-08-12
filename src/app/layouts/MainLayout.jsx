import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import Header from '../../widgets/Header/Header';
import Sidebar from '../../widgets/Sidebar/ui/Sidebar';

function MainLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        <Box sx={{ width: 240, flexShrink: 0 }}>
          <Sidebar />
        </Box>
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default MainLayout;
