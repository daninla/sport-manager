import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import Footer from '../../widgets/Footer/Footer';
import { Header } from '../../widgets/Header';
import { Sidebar } from '../../widgets/Sidebar';

function MainLayout() {
  return (
    <Box
      className="site-layout"
      sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
    >
      <Header />
      <Box
        className="site-layout-body"
        sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}
      >
        <Box className="site-sidebar-shell" sx={{ width: 240, flexShrink: 0 }}>
          <Sidebar />
        </Box>
        <Box
          className="site-content"
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Outlet />
          </Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}

export default MainLayout;
