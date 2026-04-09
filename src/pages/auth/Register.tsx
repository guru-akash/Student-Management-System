/**
 * Register Page - The initial entry point for new administrators.
 * Features:
 * - Robust input validation:
 *    - Name: Minimum length check.
 *    - Email: Regex-based format verification.
 *    - Password: Minimum length + complexity requirements (Uppercase + Number).
 *    - Confirm Password: Equality check.
 * - Dispatches `registerUser` to the local Redux state.
 * - Redirects to `/login` upon successful registration.
 */
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { registerUser } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const dispatch = useAppDispatch();
  const { loading, error: authError } = useAppSelector((s) => s.auth);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  /**
   * Validates all form fields before submission.
   * Ensures data integrity and enforces security policies (password strength).
   */
  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
    let isValid = true;

    // Name Validation
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (form.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]{2,}$/;
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    // Password Strength Validation
    if (!form.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    } else if (!/(?=.*[A-Z])(?=.*\d)/.test(form.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter and one number';
      isValid = false;
    }

    // Password Match Validation
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
      isValid = false;
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Note: In this frontend-only app, password is not stored for security reasons,
      // but registration allows the user to 'log in' with the same email in the login page.
      dispatch(registerUser({ name: form.name, email: form.email })); 
      navigate('/login');
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
          Register Admin
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            margin="normal"
            error={!!errors.name}
            helperText={errors.name}
          />
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
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            margin="normal"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          
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
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
          </Button>
          
          <Button
            fullWidth
            variant="text"
            onClick={() => navigate('/login')}
            sx={{ mt: 1, textTransform: 'none' }}
          >
            Already have an account? Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;