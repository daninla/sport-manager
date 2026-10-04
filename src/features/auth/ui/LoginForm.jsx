import { Link } from 'react-router';
import { Visibility, VisibilityOff } from '@mui/icons-material';
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

import { defaultValuesLogin } from '../model/defaultValues';
import useLoginForm from '../model/useLoginForm';
import { loginSchema } from '../model/validationSchemas';

function LoginForm() {
  const { t, showPassword, handleClickShowPassword, handleSignIn } =
    useLoginForm();
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
            disabled={!isValid}
          >
            {t('signInButton')}
          </Button>
          <Typography variant="p" align="center">
            {t('notAcc')}
            <Link
              to="/signup"
              style={{ color: 'inherit', textAlign: 'center' }}
            >
              {t('signUp')}
            </Link>
          </Typography>
        </Stack>
      </Form>
    );
  };
  return (
    <Formik
      initialValues={defaultValuesLogin}
      onSubmit={handleSignIn}
      validationSchema={loginSchema}
      enableReinitialize
    >
      {renderForm}
    </Formik>
  );
}

export default LoginForm;
