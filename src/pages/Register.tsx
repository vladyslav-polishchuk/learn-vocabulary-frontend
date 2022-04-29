import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Button,
  Link,
  Typography,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import AuthControl from '../components/AuthControl';
import { useDispatch } from 'react-redux';
import { setUser, setError } from '../store/vocabularySlice';
import { register } from '../api';

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().required('Password is required'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async ({ email, password }) => {
      try {
        const user = await register(email, password);
        dispatch(setUser(user));
        navigate('/books');
      } catch (e: any) {
        dispatch(setError(e.message));
      }
    },
  });
  const { errors, touched, handleSubmit, getFieldProps } = formik;
  const showPasswordButton = (
    <InputAdornment position="end">
      <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <AuthControl
      title="Get started absolutely free"
      subtitle="Free forever. No credit card needed"
    >
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              {...getFieldProps('password')}
              InputProps={{ endAdornment: showPasswordButton }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Confirm Password"
              {...getFieldProps('confirmPassword')}
              InputProps={{ endAdornment: showPasswordButton }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />

            <Typography
              variant="body2"
              align="center"
              sx={{ color: 'text.secondary', mt: 3 }}
            >
              By registering, I agree to Minimal&nbsp;
              <Link underline="always" color="textPrimary">
                Terms of Service
              </Link>
              &nbsp;and&nbsp;
              <Link underline="always" color="textPrimary">
                Privacy Policy
              </Link>
              .
            </Typography>

            <Button fullWidth size="large" type="submit" variant="contained">
              Register
            </Button>
          </Stack>
        </Form>
      </FormikProvider>

      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Already have an account?&nbsp;
        <Link
          underline="hover"
          variant="subtitle2"
          to="/login"
          component={RouterLink}
        >
          Login
        </Link>
      </Typography>
    </AuthControl>
  );
}
