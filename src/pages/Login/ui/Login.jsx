import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ErrorMessage, Form, Formik } from 'formik';
import * as yup from 'yup';

import { useLazyGetUserByEmailQuery } from '../../../entities/user/api/userApi';

const initialValues = {
  email: '',
  password: '',
};

const loginSchema = yup.object({
  email: yup.string().email('invalidEmail').required('requiredEmail'),
  password: yup.string().required('requiredPassword'),
});

function Login() {
  const { t } = useTranslation('auth');
  const [getUserByEmail] = useLazyGetUserByEmailQuery();
  const [showPassword, setShowPassword] = useState(false);
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

  const handleClickShowPassword = () => {
    setShowPassword((visible) => !visible);
  };

  const renderForm = ({
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
  }) => {
    return (
      <Form>
        <Stack spacing={3}>
          <Box>
            <TextField
              fullWidth
              label={t('email')}
              variant="outlined"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.email && errors.email)}
            />
            <ErrorMessage
              name="email"
              render={(message) => (
                <FormHelperText
                  error
                  sx={{ mt: 0.75, mx: 1, fontSize: '0.8rem', fontWeight: 500 }}
                >
                  {t(message)}
                </FormHelperText>
              )}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              label={t('password')}
              variant="outlined"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.password && errors.password)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="button"
                        aria-label={
                          showPassword ? 'Hide password' : 'Show password'
                        }
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <ErrorMessage
              name="password"
              render={(message) => (
                <FormHelperText
                  error
                  sx={{ mt: 0.75, mx: 1, fontSize: '0.8rem', fontWeight: 500 }}
                >
                  {t(message)}
                </FormHelperText>
              )}
            />
          </Box>
          <Link to="#" style={{ color: 'inherit' }}>
            {t('forgot')}
          </Link>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ py: 1.5, fontWeight: 'bold', fontSize: '18px' }}
          >
            {t('loginButton')}
          </Button>
          <Typography variant="p" align="center">
            {t('notAcc')}
            <Link to="/reg" style={{ color: 'inherit', textAlign: 'center' }}>
              {t('signUp')}
            </Link>
          </Typography>
        </Stack>
      </Form>
    );
  };
  return (
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
        validationSchema={loginSchema}
        enableReinitialize
      >
        {renderForm}
      </Formik>
    </Box>
  );
}

export default Login;
