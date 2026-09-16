import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';

import { useLazyGetUserByEmailQuery } from '../../../entities/user/api/userApi';

const initialValues = {
  email: '',
  password: '',
};

function Login() {
  const { t } = useTranslation('auth');
  const [getUserByEmail] = useLazyGetUserByEmailQuery();
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    const loginPromise = getUserByEmail(email)
      .unwrap()
      .then((users) => {
        const user = users[0];

        if (!user) {
          throw new Error('User with this email was not found');
        }

        if (user.password !== password) {
          throw new Error('Invalid password');
        }

        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate('/');

        return user;
      });

    toast.promise(loginPromise, {
      loading: 'Login...',
      success: 'Welcome to our website',
      error: (err) => `Failed to login: ${err.message || 'Unknown error'}`,
    });
  };

  const renderForm = ({ values, handleChange, handleBlur }) => {
    return (
      <Form>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label={t('email')}
            variant="outlined"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            fullWidth
            label={t('password')}
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
            {t('loginButton')}
          </Button>
          <Link to="/reg" style={{ color: 'inherit', textAlign: 'center' }}>
            {t('forgot')}
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
            maxWidth: '450px',
            width: '100%',
          }}
        >
          <Typography variant="h4" align="center" sx={{ mb: '30px' }}>
            {t('loginTitle')}
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={handleLogin}
            enableReinitialize
          >
            {renderForm}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
