import { Box } from "@mui/material";
import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          flex: '1 1 52%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          bgcolor: 'primary.main',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1676827613262-5fba25cee5fd?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFibGUlMjB0ZW5uaXN8ZW58MHx8MHx8fDA%3D"
          width="100%"
          height="100%"
          alt="Tennis table"
          style={{ objectFit: 'cover', opacity: 0.82 }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flex: '1 1 48%',
          height: '100%',
          p: { xs: 3, sm: 5, md: 7 },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default AuthLayout