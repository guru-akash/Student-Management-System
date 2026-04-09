/**
 * Login Page - Standard administrative entry point.
 * Features:
 * - Local form validation (email format, password length).
 * - Dispatches `loginUser` to the Redux store.
 * - Dynamic error handling and loading indicators.
 * - Redirects to `/home` upon successful authentication.
 */
import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginUser } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

interface FormState {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const Login: React.FC = () => {
  const [form, setForm] = useState<FormState>({ email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading, error: authError } = useAppSelector((s) => s.auth);
  const navigate = useNavigate();

  // Redirect to home if the user is already authenticated.
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear validation errors when user starts typing again.
    setErrors({ ...errors, [name]: '', general: '' });
  };

  /**
   * Performs basic client-side validation before attempting a login.
   * Checks for valid email structure and minimum password length.
   */
  const validateForm = () => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]{2,}$/;

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!form.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(loginUser({ email: form.email, password: form.password }));
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f5f5f5',
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 450,
          width: '100%',
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h5" mb={3} align="center" fontWeight={700} color="primary">
          Admin Login
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            margin="normal"
            error={!!errors.password}
            helperText={errors.password}
          />
          
          {/* Display auth errors from Redux state (e.g., 'Invalid credentials') */}
          {authError && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {authError}
            </Typography>
          )}
          
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ 
                mt: 3, 
                py: 1.5, 
                fontWeight: 'bold',
                borderRadius: 2,
                background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)'
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;