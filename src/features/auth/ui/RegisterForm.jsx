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

import { defaultValuesRegister } from '../model/defaultValues';
import useRegisterForm from '../model/useRegisterForm';
import { registerSchema } from '../model/validationSchemas';

function RegisterForm() {
  const {
    t,
    showPassword,
    handleClickShowPassword,
    showConfirmPassword,
    handleClickShowConfirmPassword,
    handleSignUp,
  } = useRegisterForm();

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
                          showConfirmPassword
                            ? 'Hide password'
                            : 'Show password'
                        }
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
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
    <Formik
      initialValues={defaultValuesRegister}
      onSubmit={handleSignUp}
      validationSchema={registerSchema}
      enableReinitialize
    >
      {renderForm}
    </Formik>
  );
}

export default RegisterForm;
