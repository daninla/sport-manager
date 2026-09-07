import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import Footer from '../../widgets/Footer/Footer';
import { Header } from '../../widgets/Header';
import { Sidebar } from '../../widgets/Sidebar';

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
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}

export default MainLayout;
