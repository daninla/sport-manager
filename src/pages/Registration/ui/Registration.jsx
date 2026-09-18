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

import {
  useCreateUserMutation,
  useLazyGetUserByEmailQuery,
} from '../../../entities/user/api/userApi';

const initialValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const loginSchema = yup.object({
  fullName: yup.string().required('reqiredFullName'),
  email: yup.string().email('invalidEmail').required('requiredEmail'),
  password: yup.string().required('requiredPassword'),
  confirmPassword: yup.string().required('requiredConfirmPassword').oneOf([yup.ref('password')], 'matchPass'),
});

function Registration() {
  const { t } = useTranslation('auth');
  const [createUser] = useCreateUserMutation();
  const [getUserByEmail] = useLazyGetUserByEmailQuery();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = ({ fullName, email, password }) => {
    const signUpPromise = (async () => {
      const users = await getUserByEmail(email).unwrap();
      if (users.length > 0) {
        throw new Error(t('busyEmail'));
      }

      const newUser = await createUser({
        fullName,
        photo:
          'https://img.magnific.com/premium-photo/create-silhouette-person-with-question-mark-center-their-chest-face-silhou_939033-147153.jpg?semt=ais_hybrid&w=740&q=80',
        age: 0,
        sex: '',
        email,
        password,
        city: '',
        status: '',
        ukrRate: 0,
        worldRate: 0,
        club: '',
        notes: '',
        role: 'player',
      }).unwrap();

      localStorage.setItem('currentUser', JSON.stringify(newUser));
      navigate('/account');

      return newUser;
    })();

    return toast.promise(signUpPromise, {
      loading: t('loading'),
      success: t('success'),
      error: (err) =>
        `${t('signUpError')}: ${err.message || t('unknownError')}`,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword((visible) => !visible);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((visible) => !visible);
  };

  const renderForm = ({
    values,
    isValid,
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
              label={t('fullName')}
              variant="outlined"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.fullName && errors.fullName)}
            />
            <ErrorMessage
              name="fullName"
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
          <Box>
            <TextField
              fullWidth
              label={t('confirmPassword')}
              variant="outlined"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="button"
                        aria-label={
                          showConfirmPassword ? 'Hide password' : 'Show password'
                        }
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <ErrorMessage
              name="confirmPassword"
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
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ py: 1.5, fontWeight: 'bold', fontSize: '18px' }}
            disabled={!isValid}
          >
            {t('signUpButton')}
          </Button>
          <Typography variant="p" align="center">
            {t('haveAcc')}
            <Link
              to="/signin"
              style={{ color: 'inherit', textAlign: 'center' }}
            >
              {t('signIn')}
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
        {t('signUpTitle')}
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSignUp}
        validationSchema={loginSchema}
        enableReinitialize
      >
        {renderForm}
      </Formik>
    </Box>
  );
}

export default Registration;
