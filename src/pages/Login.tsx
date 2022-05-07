import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Stack,
  Link,
  Typography,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Button,
} from '@mui/material';
import * as yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { useFormik, Form, FormikProvider } from 'formik';
import { useTranslation } from 'react-i18next';
import AuthControl from '../components/AuthControl';
import { useDispatch } from 'react-redux';
import { login } from '../api';
import { setUser, setError } from '../store/vocabularySlice';
import Page from '../components/presentational/Page';

export default function LoginPage() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: yup.string().required('Password is required'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema,
    onSubmit: async ({ email, password }) => {
      try {
        const user = await login(email, password);
        dispatch(setUser(user));

        i18n.changeLanguage(user.language);
        localStorage.setItem('i18nextLng', user.language);

        navigate('/books');
      } catch (e: any) {
        dispatch(setError(e.message));
      }
    },
  });
  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  return (
    <Page title="Login">
      <AuthControl
        title={<Trans i18nKey="login-title" />}
        subtitle={<Trans i18nKey="login-subtitle" />}
      >
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                autoComplete="username"
                type="email"
                label={<Trans i18nKey="email" />}
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />

              <TextField
                fullWidth
                autoComplete="current-password"
                type={showPassword ? 'text' : 'password'}
                label={<Trans i18nKey="password" />}
                {...getFieldProps('password')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((show) => !show)}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    {...getFieldProps('remember')}
                    checked={values.remember}
                  />
                }
                label={<Trans i18nKey="remember-me" />}
              />

              <Link
                component={RouterLink}
                variant="subtitle2"
                to="/not-implemented"
                underline="hover"
              >
                <Trans i18nKey="forget-password" />
              </Link>
            </Stack>

            <Button fullWidth size="large" type="submit" variant="contained">
              <Trans i18nKey="login" />
            </Button>
          </Form>
        </FormikProvider>

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          <Trans i18nKey="no-account" />{' '}
          <Link
            variant="subtitle2"
            component={RouterLink}
            to="/register"
            underline="hover"
          >
            <Trans i18nKey="get-started" />
          </Link>
        </Typography>
      </AuthControl>
    </Page>
  );
}
