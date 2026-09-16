import { Link } from 'react-router';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';

const initialValues = {
  email: '',
  password: '',
};

function Login() {
  const renderForm = ({ values, handleChange, handleBlur }) => {
    return (
      <Form>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ py: 1.5, fontWeight: 'bold', fontSize: '18px' }}
          >
            Login
          </Button>
          <Link to="/reg" style={{ color: 'inherit', textAlign: 'center' }}>
            Forgot your password?
          </Link>
        </Stack>
      </Form>
    );
  };
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
        <Box
          sx={{
            maxWidth: '440px',
            width: '100%',
          }}
        >
          <Typography variant="h4" align="center" sx={{ mb: '30px' }}>
            Login to your account
          </Typography>
          <Formik initialValues={initialValues} enableReinitialize>
            {renderForm}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
